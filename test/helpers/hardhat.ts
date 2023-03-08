import { BigNumber, BigNumberish, utils } from 'ethers'
import { network, ethers } from 'hardhat'

export const getChainId = async (): Promise<any> => {
  return ethers.provider.send('eth_chainId', [])
}

export const setEtherBalance = async (addr: string, amount: BigNumber) => {
  await network.provider.send('hardhat_setBalance', [
    addr,
    utils.hexStripZeros(amount.toHexString()),
  ])
}

export const setTokenBalance = async (
  address: string,
  value: BigNumber,
  tokenAddress: string,
  tokenHolderAddress: string,
  maxSlot: number = 100
) => {
  let tokenSlot = await findERC20Slot(tokenAddress, tokenHolderAddress, maxSlot)
  let index
  if (tokenSlot.contractType == ContractType.SOLIDITY) {
    index = ethers.utils.solidityKeccak256(
      ['uint256', 'uint256'],
      [address, tokenSlot.slot]
    )
  } else if (tokenSlot.contractType == ContractType.VYPER) {
    index = ethers.utils.solidityKeccak256(
      ['uint256', 'uint256'],
      [tokenSlot.slot, address]
    )
  } else {
    throw new Error(`can't find slot in token address: ${tokenAddress}`)
  }
  let balance = toBytes32(value)
  index = utils.hexStripZeros(index)
  await setStorageAt(tokenAddress, index, balance)
}
// Ref: https://github.com/kendricktan/slot20
export const setStorageAt = async (
  address: string,
  index: string,
  value: string
) => {
  await ethers.provider.send('hardhat_setStorageAt', [address, index, value])
  await ethers.provider.send('evm_mine', []) // Just mines to the next block
}

export const nextBlock = async () => {
  await ethers.provider.send('evm_mine', [])
}

export const toBytes32 = (bn: BigNumber) => {
  return ethers.utils.hexlify(ethers.utils.zeroPad(bn.toHexString(), 32))
}

enum ContractType {
  SOLIDITY,
  VYPER,
  UNDEFINED,
}
interface Slot {
  contractType: ContractType
  decimal: number
  slot: number
}

export const findERC20Slot = async (
  tokenAddress: string,
  tokenHolderAddress: string,
  maxSlot: number = 100
): Promise<Slot> => {
  const token = await ethers.getContractAt('ERC20', tokenAddress)

  let tokenDecimals = 18
  try {
    tokenDecimals = await token.decimals()
  } catch (e) {
    // Its fine if we can't get token symbol
  }
  const holderBal = await token.balanceOf(tokenHolderAddress)
  if (holderBal.eq(ethers.constants.Zero)) {
    return {
      contractType: ContractType.UNDEFINED,
      decimal: tokenDecimals,
      slot: -1,
    }
  }

  // Solidity is key, slot
  // Vyper    is slot, key

  for (let i = 0; i <= maxSlot; i++) {
    {
      // Solidity
      const d = await ethers.provider.getStorageAt(
        tokenAddress,
        ethers.utils.solidityKeccak256(
          ['uint256', 'uint256'],
          [tokenHolderAddress, i] // key, slot (solidity)
        )
      )

      let n = ethers.constants.Zero

      try {
        n = ethers.BigNumber.from(d)
      } catch (e) {}

      if (n.eq(holderBal)) {
        return {
          contractType: ContractType.SOLIDITY,
          decimal: tokenDecimals,
          slot: i,
        }
      }
    }
    {
      // Vyper
      const d = await ethers.provider.getStorageAt(
        tokenAddress,
        ethers.utils.solidityKeccak256(
          ['uint256', 'uint256'],
          [i, tokenHolderAddress] // slot, key (vyper)
        )
      )

      let n = ethers.constants.Zero

      try {
        n = ethers.BigNumber.from(d)
      } catch (e) {}

      if (n.eq(holderBal)) {
        return {
          contractType: ContractType.VYPER,
          decimal: tokenDecimals,
          slot: i,
        }
      }
    }
  }

  return {
    contractType: ContractType.UNDEFINED,
    decimal: tokenDecimals,
    slot: -1,
  }
}

export const mineNBlocks = async (n: BigNumberish) => {
  const bigN = BigNumber.from(n)
  await network.provider.send('hardhat_mine', [bigN.toHexString()])
}

export const mineToBlock = async (blockNumber: BigNumberish) => {
  const bigBlockNumber = BigNumber.from(blockNumber)
  const latestBlock = await ethers.provider.getBlock('latest')
  if (bigBlockNumber.lte(latestBlock.number)) {
    throw new Error('latest block already exceeded target')
  }
  const bigN = bigBlockNumber.sub(latestBlock.number)
  return mineNBlocks(bigN)
}

export const resetHardhat = async () => {
  await network.provider.send('hardhat_reset')
}
