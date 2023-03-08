import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

export const signNFASignature = async (
  signer: SignerWithAddress,
  chainId: number,
  contract: string,
  option: any
) => {
  return signer._signTypedData(
    // Domain
    {
      name: 'ArkenAirdrop1',
      version: '1.0.0',
      chainId,
      verifyingContract: contract,
    },
    // Types
    {
      NFT: [
        { name: 'tokenId', type: 'uint256' },
        { name: 'claimableAmount', type: 'uint256' },
        { name: 'tradingvolume', type: 'uint256' },
        { name: 'tier', type: 'uint16' },
        { name: 'rank', type: 'uint32' },
        { name: 'account', type: 'address' },
        { name: 'originalOwner', type: 'address' },
      ],
    },
    option
  )
}
