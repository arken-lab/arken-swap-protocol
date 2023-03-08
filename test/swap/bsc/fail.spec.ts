import { expect } from 'chai'
import { Signer, utils } from 'ethers'

import { ArkenApprove, ArkenDexV3 } from '../../../typechain'
import { useArkenDEXV3, useERC20, useWallet } from '../../helpers/contracts'
import { testOnly } from '../../helpers/scope'
import { ADDRESS_ONE, ADDRESS_ZERO, RouterInterface } from '../../helpers/types'
import { CONSTRUCTOR_PARAMS, DEX, TOKENS, WALLETS } from './constants'

testOnly('bsc', 'swap', () =>
  describe('Swap failure', () => {
    describe('Expect too much return amount', async () => {
      let arkenDex: ArkenDexV3
      let arkenApprove: ArkenApprove
      let srcWallet: Signer
      beforeEach(async () => {
        srcWallet = await useWallet(WALLETS.WHALE2)
        const v3 = await useArkenDEXV3(CONSTRUCTOR_PARAMS)
        arkenDex = v3.arkenDex
        arkenApprove = v3.arkenApprove
        arkenDex = arkenDex.connect(srcWallet)
      })
      it('reverted with error: Return amount is not enough', async () => {
        const busd = await (
          await useERC20(TOKENS.BUSD.address)
        ).connect(srcWallet)
        const amountIn = utils.parseUnits('1', TOKENS.BUSD.decimals)
        const amountOutMin = utils.parseUnits('1', TOKENS.BNB.decimals)
        await busd.approve(arkenDex.address, amountIn)
        await expect(
          arkenDex.trade(
            {
              amountIn: amountIn,
              amountOutMin: amountOutMin,
              srcToken: TOKENS.BUSD.address,
              dstToken: TOKENS.BNB.address,
              to: WALLETS.WHALE2,
              isRouterSource: false,
              isSourceFee: false,
              routes: [
                {
                  fromToken: TOKENS.BUSD.address,
                  toToken: TOKENS.WBNB.address,
                  from: ADDRESS_ONE,
                  to: ADDRESS_ZERO,
                  lpAddress: '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16',
                  direction: 0,
                  fromTokenIndex: 0,
                  toTokenIndex: 0,
                  routerAddress: DEX.PANCAKE,
                  dexInterface: RouterInterface.UNISWAP_V2,
                  part: 100000000,
                  amountAfterFee: 9970,
                },
              ],
            },
            {
              gasLimit: 3000000,
            }
          )
        ).to.revertedWith('Return amount is not enough')
      })
    })
  })
)
