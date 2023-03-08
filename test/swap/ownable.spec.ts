import { expect } from 'chai'
import { Signer, utils } from 'ethers'

import { ArkenDexV3 } from '../../typechain'
import {
  ArkenDexConstructorParams,
  useArkenDEXV3,
  useWallet,
} from '../helpers/contracts'
import { setEtherBalance } from '../helpers/hardhat'

export const testOwnable = (constructorParams: ArkenDexConstructorParams) =>
  describe('Ownership', () => {
    let dex: ArkenDexV3
    let owner: Signer
    let notOwner: Signer
    const notOwnerAddr = '0x0Eb2268e8371901a2CA59BC4f45d9a74e90d317B'
    beforeEach(async () => {
      owner = await useWallet(constructorParams._ownerAddress)
      notOwner = await useWallet(notOwnerAddr)
      await setEtherBalance(notOwnerAddr, utils.parseEther('1000000'))
      const { arkenDex, arkenApprove } = await useArkenDEXV3(constructorParams)
      dex = await arkenDex.connect(owner)
    })
    describe('Initialize owner', () => {
      it('has correct owner', async () => {
        expect(await dex.owner()).to.be.eq(constructorParams._ownerAddress)
      })
    })
    describe('Change owner', () => {
      it('has correct owner', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        const tx = await dex.transferOwnership(mock)
        await expect(tx).to.emit(dex, 'OwnershipTransferred')
        expect(await dex.owner()).to.be.eq(mock)
      })
    })
    describe('Update fee wallet', () => {
      it('failed if not owner', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        await expect(
          dex.connect(notOwner).updateFeeWallet(mock)
        ).to.revertedWith('Ownable: caller is not the owner')
      })
      it('has correct fee wallet', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        const tx = await dex.updateFeeWallet(mock)
        await expect(tx).to.emit(dex, 'FeeWalletUpdated')
        expect(await dex._FEE_WALLET_ADDR_()).to.be.eq(mock)
      })
    })
    describe('Update WETH', () => {
      it('failed if not owner', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        await expect(dex.connect(notOwner).updateWETH(mock)).to.revertedWith(
          'Ownable: caller is not the owner'
        )
      })
      it('failed if zero address', async () => {
        const mock = '0x0000000000000000000000000000000000000000'
        await expect(dex.updateWETH(mock)).to.revertedWith('WETH zero address')
      })
      it('has correct WETH', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        const tx = await dex.updateWETH(mock)
        await expect(tx).to.emit(dex, 'WETHUpdated')
        expect(await dex._WETH_()).to.be.eq(mock)
      })
    })
    describe('Update WETH (dfyn)', () => {
      it('failed if not owner', async () => {
        const notOwnerAddr = '0x0Eb2268e8371901a2CA59BC4f45d9a74e90d317B'
        const notOwner = await useWallet(notOwnerAddr)
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        await expect(
          dex.connect(notOwner).updateWETHDfyn(mock)
        ).to.revertedWith('Ownable: caller is not the owner')
      })
      it('failed if zero address', async () => {
        const mock = '0x0000000000000000000000000000000000000000'
        await expect(dex.updateWETHDfyn(mock)).to.revertedWith(
          'WETH dfyn zero address'
        )
      })
      it('has correct WETH (dfyn)', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        const tx = await dex.updateWETHDfyn(mock)
        await expect(tx).to.emit(dex, 'WETHDfynUpdated')
        expect(await dex._WETH_DFYN_()).to.be.eq(mock)
      })
    })
    describe('Update DODO approve address', () => {
      it('failed if not owner', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        await expect(
          dex.connect(notOwner).updateDODOApproveAddress(mock)
        ).to.revertedWith('Ownable: caller is not the owner')
      })
      it('failed if zero address', async () => {
        const mock = '0x0000000000000000000000000000000000000000'
        await expect(dex.updateDODOApproveAddress(mock)).to.revertedWith(
          'dodo approve zero address'
        )
      })
      it('has correct DODO approve address', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        const tx = await dex.updateDODOApproveAddress(mock)
        await expect(tx).to.emit(dex, 'DODOApproveUpdated')
        expect(await dex._DODO_APPROVE_ADDR_()).to.be.eq(mock)
      })
    })
    describe('Update arken approve', () => {
      it('failed if not owner', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        await expect(
          dex.connect(notOwner).updateArkenApprove(mock)
        ).to.revertedWith('Ownable: caller is not the owner')
      })
      it('failed if zero address', async () => {
        const mock = '0x0000000000000000000000000000000000000000'
        await expect(dex.updateArkenApprove(mock)).to.revertedWith(
          'arken approve zero address'
        )
      })
      it('has correct arken approve address', async () => {
        const mock = '0x0000023Cbc437683AeC074E3Cb75aD38ae2E87e1'
        const tx = await dex.updateArkenApprove(mock)
        await expect(tx).to.emit(dex, 'ArkenApproveUpdated')
        expect(await dex._ARKEN_APPROVE_()).to.be.eq(mock)
      })
    })
  })
