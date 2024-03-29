import _ from 'lodash'

import { testOnly } from '../../helpers/scope'
import { ADDRESS_ONE, ADDRESS_ZERO, RouterInterface } from '../../helpers/types'
import {
  SwapTestStopLimitParamsV3,
  testSwapStopLimit,
} from '../testSwap.stoplimit.v3.spec'
import {
  CONSTRUCTOR_PARAMS,
  DEX,
  findDexName,
  TOKENS,
  WALLETS,
} from './constants'

const TESTS: Array<SwapTestStopLimitParamsV3> = [
  // isSourceFee = false && stopLimitFee < minimumStopLimitFee
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 100,
    stopLimitFee: 30, // 0.3%
    minimumStopLimitFee: 3,
    srcTokenData: TOKENS.BNB,
    dstTokenData: TOKENS.BUSD,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WBNB.address,
        toToken: TOKENS.BUSD.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0x559e3d9611e9cb8a77c11335bdac49621382188b',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.BAKERY,
        dexInterface: RouterInterface.BAKERY,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  // isSourceFee = false && stopLimitFee > minimumStopLimitFee
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 10000,
    stopLimitFee: 30, // 0.3%
    minimumStopLimitFee: 3,
    srcTokenData: TOKENS.BNB,
    dstTokenData: TOKENS.BUSD,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WBNB.address,
        toToken: TOKENS.BUSD.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0x559e3d9611e9cb8a77c11335bdac49621382188b',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.BAKERY,
        dexInterface: RouterInterface.BAKERY,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // isSourceFee = true && stopLimitFee < minimumStopLimitFee
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 10,
    amountOutMin: 0.0005,
    stopLimitFee: 30, // 0.3%
    minimumStopLimitFee: 3,
    srcTokenData: TOKENS.BUSD,
    dstTokenData: TOKENS.BNB,
    isSourceFee: true,
    isRouterSource: false,
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
        amountAfterFee: 9975,
        order: '0x',
      },
    ],
  },
  {
    // isSourceFee = true && stopLimitFee > minimumStopLimitFee
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 30000,
    amountOutMin: 50,
    stopLimitFee: 30, // 0.3%
    minimumStopLimitFee: 3,
    srcTokenData: TOKENS.BUSD,
    dstTokenData: TOKENS.BNB,
    isSourceFee: true,
    isRouterSource: false,
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
        amountAfterFee: 9975,
        order: '0x',
      },
    ],
  },
  {
    // isSourceFee = true && stopLimitFee > minimumStopLimitFee && split paths
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 100000,
    amountOutMin: 10,
    stopLimitFee: 30, // 0.3%
    minimumStopLimitFee: 3,
    srcTokenData: TOKENS.BUSD,
    dstTokenData: TOKENS.ETH,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.BUSD.address,
        toToken: TOKENS.WBNB.address,
        from: ADDRESS_ZERO,
        to: '0x74e4716e431f45807dcf19f284c7aa99f18a4fbc',
        lpAddress: '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.PANCAKE,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9975,
        order: '0x',
      },
      {
        fromToken: TOKENS.WBNB.address,
        toToken: TOKENS.ETH.address,
        from: '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16',
        to: ADDRESS_ZERO,
        lpAddress: '0x74e4716e431f45807dcf19f284c7aa99f18a4fbc',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.PANCAKE,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9975,
        order: '0x',
      },
    ],
  },
  {
    // isSourceFee = false && stopLimitFee > minimumStopLimitFee && super split paths
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 10,
    amountOutMin: 10000,
    stopLimitFee: 30, // 0.3%
    minimumStopLimitFee: 3,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.BUSD,
    isSourceFee: false,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.ETH.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: '0xea26b78255df2bbc31c1ebf60010d78670185bd0',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.PANCAKE,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 50000000,
        amountAfterFee: 9975,
        order: '0x',
      },
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.BUSD.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0x160caed03795365f3a589f10c379ffa7d75d4e76',
        direction: 0,
        fromTokenIndex: 1,
        toTokenIndex: 0,
        routerAddress: DEX.ELLIPSIS,
        dexInterface: RouterInterface.VYPER,
        part: 100000000,
        amountAfterFee: 10000,
        order: '0x',
      },
      {
        fromToken: TOKENS.ETH.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: '0x531febfeb9a61d948c384acfbe6dcc51057aea7e',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.PANCAKE,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 50000000,
        amountAfterFee: 9975,
        order: '0x',
      },
      {
        fromToken: TOKENS.ETH.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: '0x0fb881c078434b1c0e4d0b64d8c64d12078b7ce2',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.MDEX,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.BUSD.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0xc3dac2049616326e7d596ce52062789d96373b55',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.KYBER_DMM,
        dexInterface: RouterInterface.KYBER_DMM,
        part: 100000000,
        amountAfterFee: 10000,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 10000,
    amountOutMin: 5000,
    stopLimitFee: 30, // 0.3%
    minimumStopLimitFee: 3,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.BUSD,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.BUSD.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0x2e707261d086687470b515b320478eb1c88d49bb',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.APE,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9980,
        order: '0x',
      },
    ],
  },
]
// testOnly('bsc', 'stoplimit', () =>
//   describe.only('Swap StopLimit v3', () => {
//     testSwapStopLimit(
//       TESTS,
//       findDexName,
//       CONSTRUCTOR_PARAMS,
//       WALLETS.WHALE1,
//       WALLETS.FEE
//     )
//   })
// )
