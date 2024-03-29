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
    amountIn: 1,
    amountOutMin: (1 / 3000) * 0.9,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.ETH,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_TRICRYPTO_V2,
        direction: 0,
        fromTokenIndex:
          VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.USDT.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WETH.address],
        routerAddress: DEX.CURVE_TRICRYPTO_V2,
        dexInterface: RouterInterface.CURVE_TRICRYPTO_V2,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x', // No need to use for curve v2 tricrypto
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE2,
    amountIn: 1,
    amountOutMin: (1 / 3000) * 0.9,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.WETH,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_TRICRYPTO_V2,
        direction: 0,
        fromTokenIndex:
          VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.USDT.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WETH.address],
        routerAddress: DEX.CURVE_TRICRYPTO_V2,
        dexInterface: RouterInterface.CURVE_TRICRYPTO_V2,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x', // No need to use for curve v2 tricrypto
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE2,
    amountIn: 1,
    amountOutMin: (1 / 40000) * 0.9,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.WBTC,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.WBTC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_TRICRYPTO_V2,
        direction: 0,
        fromTokenIndex:
          VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.USDT.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WBTC.address],
        routerAddress: DEX.CURVE_TRICRYPTO_V2,
        dexInterface: RouterInterface.CURVE_TRICRYPTO_V2,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x', // No need to use for curve v2 tricrypto
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE2,
    amountIn: 1,
    amountOutMin: 1,
    srcTokenData: TOKENS.WETH,
    dstTokenData: TOKENS.USDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_TRICRYPTO_V2,
        direction: 0,
        fromTokenIndex:
          VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WETH.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.USDT.address],
        routerAddress: DEX.CURVE_TRICRYPTO_V2,
        dexInterface: RouterInterface.CURVE_TRICRYPTO_V2,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x', // No need to use for curve v2 tricrypto
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.06 * 0.9,
    srcTokenData: TOKENS.WETH,
    dstTokenData: TOKENS.WBTC,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.WBTC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_TRICRYPTO_V2,
        direction: 0,
        fromTokenIndex:
          VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WETH.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WBTC.address],
        routerAddress: DEX.CURVE_TRICRYPTO_V2,
        dexInterface: RouterInterface.CURVE_TRICRYPTO_V2,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x', // No need to use for curve v2 tricrypto
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE2,
    amountIn: 1,
    amountOutMin: 0.06 * 0.9,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.WBTC,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.WBTC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_TRICRYPTO_V2,
        direction: 0,
        fromTokenIndex:
          VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WETH.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WBTC.address],
        routerAddress: DEX.CURVE_TRICRYPTO_V2,
        dexInterface: RouterInterface.CURVE_TRICRYPTO_V2,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x', // No need to use for curve v2 tricrypto
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE2,
    amountIn: 1,
    amountOutMin: 10000,
    srcTokenData: TOKENS.WBTC,
    dstTokenData: TOKENS.USDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WBTC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_TRICRYPTO_V2,
        direction: 0,
        fromTokenIndex:
          VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WBTC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.USDT.address],
        routerAddress: DEX.CURVE_TRICRYPTO_V2,
        dexInterface: RouterInterface.CURVE_TRICRYPTO_V2,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x', // No need to use for curve v2 tricrypto
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE2,
    amountIn: 1,
    amountOutMin: 1.4,
    srcTokenData: TOKENS.WBTC,
    dstTokenData: TOKENS.WETH,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WBTC.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_TRICRYPTO_V2,
        direction: 0,
        fromTokenIndex:
          VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WBTC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_TRICRYPTO_V2][TOKENS.WETH.address],
        routerAddress: DEX.CURVE_TRICRYPTO_V2,
        dexInterface: RouterInterface.CURVE_TRICRYPTO_V2,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x', // No need to use for curve v2 tricrypto
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.0001,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.ETH,
    isSourceFee: false,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: '0x905dfcd5649217c42684f23958568e533c711aa3',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.SUSHI,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 1000,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.USDC,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0x905dfcd5649217c42684f23958568e533c711aa3',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.SUSHI,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.9,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.USDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV1.USDT_USDC,
        direction: 1,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DODO.routerAddress,
        dexInterface: RouterInterface.DODO_V1,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.00001,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.WBTC,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WBTC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV1.WBTC_USDC,
        direction: 1,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DODO.routerAddress,
        dexInterface: RouterInterface.DODO_V1,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.9,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.USX,
    isSourceFee: false,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USX.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV2.USX_USDC,
        direction: 1,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DODO.routerAddress,
        dexInterface: RouterInterface.DODO_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.001,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.DODO,
    isSourceFee: false,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.DODO.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV2.DODO_USDC,
        direction: 1,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DODO.routerAddress,
        dexInterface: RouterInterface.DODO_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },

  // SOURCE FEE

  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.0001,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.ETH,
    isSourceFee: true,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: '0x905dfcd5649217c42684f23958568e533c711aa3',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.SUSHI,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 1000,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.USDC,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ONE,
        lpAddress: '0x905dfcd5649217c42684f23958568e533c711aa3',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.SUSHI,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.9,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.USDT,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV1.USDT_USDC,
        direction: 1,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DODO.routerAddress,
        dexInterface: RouterInterface.DODO_V1,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.00001,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.WBTC,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WBTC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV1.WBTC_USDC,
        direction: 1,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DODO.routerAddress,
        dexInterface: RouterInterface.DODO_V1,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.9,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.USX,
    isSourceFee: true,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USX.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ONE,
        lpAddress: DODO.poolV2.USX_USDC,
        direction: 1,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DODO.routerAddress,
        dexInterface: RouterInterface.DODO_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.001,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.DODO,
    isSourceFee: true,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.DODO.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ONE,
        lpAddress: DODO.poolV2.DODO_USDC,
        direction: 1,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DODO.routerAddress,
        dexInterface: RouterInterface.DODO_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
]

testOnly('arbitrum', 'swap', () =>
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
