import _ from 'lodash'

import { testOnly } from '../../helpers/scope'
import { ADDRESS_ONE, ADDRESS_ZERO, RouterInterface } from '../../helpers/types'
import { SwapTestParamsV3, testSwap } from '../testSwap.v3.spec'
import {
  CONSTRUCTOR_PARAMS,
  DEX,
  DODO,
  findDexName,
  TOKENS,
  VYPER_CONFIG,
  WALLETS,
} from './constants'

const TESTS: Array<SwapTestParamsV3> = [
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE1,
    amountIn: 3.7630231148622535,
    amountOutMin: 3.5,
    srcTokenData: TOKENS.kBUSD,
    dstTokenData: TOKENS.KUMA,
    isSourceFee: false,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.kBUSD.address,
        toToken: TOKENS.KUMA.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: '0xff23b87b0d5c04c4023f0944613e6df858145249',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.FOODCOURT,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9975,
        order: '0x', // No need to use for curve v2 tricrypto
      },
    ],
  },
]

testOnly('rei', 'swap', () =>
  describe.only('Swap v3', () => {
    testSwap(
      TESTS,
      findDexName,
      CONSTRUCTOR_PARAMS,
      WALLETS.WHALE1,
      WALLETS.FEE
    )
  })
)
