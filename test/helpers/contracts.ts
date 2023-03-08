import IUniswapV2ERC20Abi from '@uniswap/v2-core/build/IUniswapV2ERC20.json'
import IUniswapV2FactoryAbi from '@uniswap/v2-core/build/IUniswapV2Factory.json'
import IUniswapV2PairAbi from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import IUniswapV2RouterAbi from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { BigNumber, BigNumberish, Signer, utils } from 'ethers'
import { keccak256 } from 'ethers/lib/utils'
import { ethers, network, upgrades } from 'hardhat'

import {
  ArkenApprove,
  ArkenDexV3,
  ArkenToken,
  ArkenStopLimit,
  IERC20,
  IUniswapV2Factory,
  IUniswapV2Pair,
  ArkenPairFactory,
  ArkenRouter,
  ArkenSmithy,
  ArkenStaker,
  IUniswapV2Router02,
  WETH,
  TimelockController,
  ArkenDexV4,
  DummyDexV3,
  ArkenDexAmbassador,
} from '../../typechain'
import { setEtherBalance } from './hardhat'
import { ADDRESS_ZERO } from './types'

export const MAX_UINT256 = BigNumber.from(2).pow(256).sub(1)

const walletCache: { [addr: string]: Signer } = {}
export const useWallet = async (
  address: string,
  useCache: boolean = false
): Promise<Signer> => {
  if (useCache && walletCache[address]) return walletCache[address]
  const wallet = await ethers.provider.getSigner(address)
  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  })
  return wallet
}

const erc20Cache: { [addr: string]: IERC20 } = {}
export const useERC20 = async (
  address: string,
  useCache: boolean = false
): Promise<IERC20> => {
  if (useCache && erc20Cache[address]) return erc20Cache[address]
  const erc20 = (await ethers.getContractAt(
    IUniswapV2ERC20Abi.abi,
    address
  )) as unknown as IERC20
  return erc20
}

export const useUniswapV2Router = async (
  address: string
): Promise<IUniswapV2Router02> => {
  const router = (await ethers.getContractAt(
    IUniswapV2RouterAbi.abi,
    address
  )) as unknown as IUniswapV2Router02
  return router
}

export const useUniswapV2Pair = async (
  address: string
): Promise<IUniswapV2Pair> => {
  const pair = (await ethers.getContractAt(
    IUniswapV2PairAbi.abi,
    address
  )) as unknown as IUniswapV2Pair
  return pair
}

export const useUniswapV2Factory = async (
  address: string
): Promise<IUniswapV2Factory> => {
  const factory = (await ethers.getContractAt(
    IUniswapV2FactoryAbi.abi,
    address
  )) as unknown as IUniswapV2Factory
  return factory
}

export interface ArkenDexConstructorParams {
  _ownerAddress: string
  _feeWalletAddress: string
  _wrappedEther: string
  _wrappedEtherDfyn: string
  _dodoApproveAddress: string
  _uniswapV3Factory: string
  _woofiQuoteToken: string
}
export interface ArkenStopLimitConstructorParams {
  _ownerAddress: string
  _arkenApproveAddress: string
  _arkenFulfillerAdmin: string
  _arkenFulfiller: string
  _arkenPauser: string
  _wrappedEther: string
  _version: number
}

export const formatConstructorParams = (
  params: ArkenDexConstructorParams
): unknown[] | undefined => {
  return [
    params._ownerAddress,
    params._feeWalletAddress,
    params._wrappedEther,
    params._wrappedEtherDfyn,
    params._dodoApproveAddress,
    params._uniswapV3Factory,
    params._woofiQuoteToken,
  ]
}

export const useArkenDEXV3 = async (
  params: ArkenDexConstructorParams
): Promise<{ arkenDex: ArkenDexV3; arkenApprove: ArkenApprove }> => {
  const owner = await useWallet(params._ownerAddress)
  const arkenDex = (await (
    await ethers.getContractFactory('ArkenDexV3')
  ).deploy(
    params._ownerAddress,
    params._feeWalletAddress,
    params._wrappedEther,
    params._wrappedEtherDfyn,
    params._dodoApproveAddress,
    ADDRESS_ZERO,
    params._uniswapV3Factory,
    params._woofiQuoteToken
  )) as ArkenDexV3
  await arkenDex.deployed()
  const arkenApprove = await useArkenApprove(
    params._ownerAddress,
    arkenDex.address
  )
  await setEtherBalance(params._ownerAddress, utils.parseEther('1000000'))
  await arkenDex.connect(owner).updateArkenApprove(arkenApprove.address)
  return { arkenDex, arkenApprove }
}

export const useArkenDEXV4 = async (
  params: ArkenDexConstructorParams
): Promise<{ arkenDex: ArkenDexV4; arkenDexAmb: ArkenDexAmbassador }> => {
  //deploy ArkenDexTrader lib
  const arkenDexTraderLibFac = await ethers.getContractFactory(
    'contracts/swapV4/ArkenDexTrader.sol:ArkenDexTrader'
  )
  const arkenDexTraderLib = await arkenDexTraderLibFac.deploy()
  await arkenDexTraderLib.deployed()
  //deploy ambassador
  const arkenAmbFac = await ethers.getContractFactory('ArkenDexAmbassador')
  const arkenDexAmb = await arkenAmbFac.deploy()
  await arkenDexAmb.deployed()
  //deploy implementation
  const arkenDexFac = await ethers.getContractFactory('ArkenDexV4', {
    libraries: {
      ArkenDexTrader: arkenDexTraderLib.address,
    },
  })
  const arkenProxyFac = await ethers.getContractFactory('ArkenERC1967Proxy')
  const initData = arkenDexFac.interface.encodeFunctionData('initialize', [
    params._ownerAddress,
    params._feeWalletAddress,
    params._wrappedEther,
    params._wrappedEtherDfyn,
    params._dodoApproveAddress,
    params._uniswapV3Factory,
    params._woofiQuoteToken,
    arkenDexAmb.address,
  ])
  const arkenDexImpl = await arkenDexFac.deploy()
  await arkenDexImpl.deployed()
  const arkenDexProxy = await arkenProxyFac.deploy(
    arkenDexImpl.address,
    initData
  )
  await arkenDexProxy.deployed()
  const arkenDex = await ethers.getContractAt(
    'ArkenDexV4',
    arkenDexProxy.address
  )
  return {
    arkenDex,
    arkenDexAmb,
  }
}

export const useDummyDexV3 = async (
  params: ArkenDexConstructorParams
): Promise<{ arkenDex: DummyDexV3; arkenApprove: ArkenApprove }> => {
  const owner = await useWallet(params._ownerAddress)
  const arkenDex = await (
    await ethers.getContractFactory('DummyDexV3')
  ).deploy(
    params._ownerAddress,
    params._feeWalletAddress,
    params._wrappedEther,
    params._wrappedEtherDfyn,
    params._dodoApproveAddress,
    ADDRESS_ZERO,
    params._uniswapV3Factory,
    params._woofiQuoteToken
  )
  await arkenDex.deployed()
  const arkenApprove = await useArkenApprove(
    params._ownerAddress,
    arkenDex.address
  )
  await setEtherBalance(params._ownerAddress, utils.parseEther('1000000'))
  await arkenDex.connect(owner).updateArkenApprove(arkenApprove.address)
  return { arkenDex, arkenApprove }
}

export const useArkenStopLimit = async (
  paramsArkenStopLimit: ArkenStopLimitConstructorParams
): Promise<{ arkenStopLimit: ArkenStopLimit }> => {
  const owner = await useWallet(paramsArkenStopLimit._ownerAddress)

  const arkenStopLimit = await (
    await ethers.getContractFactory('ArkenStopLimit')
  ).deploy(
    paramsArkenStopLimit._ownerAddress,
    paramsArkenStopLimit._arkenFulfillerAdmin,
    paramsArkenStopLimit._arkenApproveAddress,
    paramsArkenStopLimit._arkenPauser,
    paramsArkenStopLimit._wrappedEther,
    paramsArkenStopLimit._version
  )
  await arkenStopLimit.deployed()

  const fulFillerRole = await arkenStopLimit.FULFILLER()
  const fulFillerAdminRole = await arkenStopLimit.FULFILLER_ADMIN()

  const fulfillerAdmin = await useWallet(
    paramsArkenStopLimit._arkenFulfillerAdmin
  )
  await arkenStopLimit
    .connect(fulfillerAdmin)
    .grantRole(fulFillerRole, paramsArkenStopLimit._arkenFulfiller)

  await setEtherBalance(
    paramsArkenStopLimit._ownerAddress,
    utils.parseEther('1000000')
  )
  return { arkenStopLimit }
}

export const useArkenApprove = async (
  ownerAddr: string,
  callableAddress: string
): Promise<ArkenApprove> => {
  // const arkenApprove = (await upgrades.deployProxy(
  //   await ethers.getContractFactory('ArkenApprove'),
  //   [ownerAddr, callableAddress],
  //   { unsafeAllow: ['delegatecall'] }
  // )) as any as ArkenApprove
  // await arkenApprove.deployed()
  const arkenApprove = await (
    await ethers.getContractFactory('ArkenApprove')
  ).deploy()
  await arkenApprove.deployed()
  await arkenApprove.initializeCallableAddress(callableAddress)
  return arkenApprove
}

export const useArkenToken = async (
  ownerAddr: string,
  tokenAmount: BigNumberish = '1000000000000000000000000000'
): Promise<ArkenToken> => {
  const arkenToken = await (
    await ethers.getContractFactory('ArkenToken')
  ).deploy(ownerAddr, tokenAmount)
  await arkenToken.deployed()
  return arkenToken
}

export const useArkenSmithy = async (
  owner: Signer,
  arkenToken: string
): Promise<ArkenSmithy> => {
  const arkenSmithy = await (await ethers.getContractFactory('ArkenSmithy'))
    .connect(owner)
    .deploy(arkenToken)

  await arkenSmithy.deployed()

  return arkenSmithy
}

export const useArkenStaker = async (
  owner: Signer,
  smithyAddress: string,
  arkenAddress: string,
  pid: BigNumberish
): Promise<ArkenStaker> => {
  const arkenStaker = await (await ethers.getContractFactory('ArkenStaker'))
    .connect(owner)
    .deploy(smithyAddress, arkenAddress, pid)

  await arkenStaker.deployed()

  return arkenStaker
}
export const useArkenFactory = async (
  ownerAddr: string
): Promise<ArkenPairFactory> => {
  const owner = await useWallet(ownerAddr)
  const arkenFactory = await (
    await ethers.getContractFactory('ArkenPairFactory')
  )
    .connect(owner)
    .deploy(ownerAddr)
  await arkenFactory.deployed()
  return arkenFactory
}

export interface ArkenRouterConstructorParams {
  _factory: string
  _WETH: string
  _staker: string
  _swap: string
  _swapApprove: string
}

export const useArkenRouter = async (
  params: ArkenRouterConstructorParams
): Promise<ArkenRouter> => {
  const arkenRouter = await (
    await ethers.getContractFactory('ArkenRouter')
  ).deploy(
    params._factory,
    params._WETH,
    params._staker,
    params._swap,
    params._swapApprove
  )
  await arkenRouter.deployed()
  return arkenRouter
}

export const useWETH = async (): Promise<WETH> => {
  const weth = await (await ethers.getContractFactory('WETH')).deploy()
  await weth.deployed()
  return weth
}

export const useTimelockController = async (): Promise<TimelockController> => {
  const timelock = await (
    await ethers.getContractFactory('TimelockController')
  ).deploy(
    1000,
    ['0x6Cd0f42D5AE1F479086bC03Ef3559d7fd0C09Ba6'],
    ['0x6Cd0f42D5AE1F479086bC03Ef3559d7fd0C09Ba6']
  )
  await timelock.deployed()
  return timelock
}
