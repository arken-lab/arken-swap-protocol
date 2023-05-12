import _ from 'lodash'

import { testOnly } from '../../helpers/scope'
import { encodeOrderToHex } from '../../helpers/tester'
import { ADDRESS_ONE, ADDRESS_ZERO, RouterInterface } from '../../helpers/types'
import { SwapTestParamsV3, testSwap } from '../testSwap.v3.spec'
import {
  BALANCER_POOLS,
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
    // LimitOrder
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.99,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.USDC,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.USDC.address,
        holderToToken: TOKENS.USDC.holder,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.LIMIT_ORDER,
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.LIMIT_ORDER,
        dexInterface: RouterInterface.LIMIT_ORDER_PROTOCOL_V2,
        part: 100000000,
        amountAfterFee: 100,
        order: encodeOrderToHex({
          signature:
            '0xb6310ef64c56cb4e3b4fada43e0f52710e1c5c5466b5bd5fffe13b7d4d3cf00f6958469944a3813f8011d594cf97579536d75ba9d0aea6f0a77295cc01d3e60d1b',
          orderHash:
            '0x4c3bce3cdadf6deef58fa5c34465fa54f0f5432b9406bd7ec94ad78dad8f1479',
          createDateTime: '2022-02-28T13:33:51.751Z',
          remainingMakerAmount: '612000000',
          makerBalance: '9000395000',
          makerAllowance:
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          data: {
            makerAsset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            takerAsset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            getMakerAmount:
              '0xf4a215c300000000000000000000000000000000000000000000000000000000247a6100000000000000000000000000000000000000000000000000042a0a4120066028',
            getTakerAmount:
              '0x296637bf00000000000000000000000000000000000000000000000000000000247a6100000000000000000000000000000000000000000000000000042a0a4120066028',
            makerAssetData: '0x',
            takerAssetData: '0x',
            salt: '234180897687',
            permit:
              '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000aa573f94bcca0a8083846430ba5120eddbfca055000000000000000000000000119c71d3bbac22029622cbaec24854d3d32d2828ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000062445c39000000000000000000000000000000000000000000000000000000000000001bf180c4637ac7de99e6be8116757ed1867bb73130ca50058af474ce9118624a427c09a87128855d407c7e25a3d8817f64c833df61f5092f2498ad8dbe646783bb',
            predicate:
              '0x961d5b1e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000119c71d3bbac22029622cbaec24854d3d32d2828000000000000000000000000119c71d3bbac22029622cbaec24854d3d32d28280000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000044cf6fc6e3000000000000000000000000aa573f94bcca0a8083846430ba5120eddbfca055000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002463592c2b0000000000000000000000000000000000000000000000000000000062445c3c00000000000000000000000000000000000000000000000000000000',
            interaction:
              '0x1282d0c06368c40c8d4a4d818d78f258d982437baa573f94bcca0a8083846430ba5120eddbfca055',
            receiver: '0x1282d0c06368c40c8d4a4d818d78f258d982437b',
            allowedSender: '0x0000000000000000000000000000000000000000',
            makingAmount: '612000000',
            takingAmount: '300063600000000040',
            maker: '0xaa573f94bcca0a8083846430ba5120eddbfca055',
          },
          makerRate: '490300000.000000065359477124',
          takerRate: '2.039567611E-9',
        }),
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.06 * 0.9,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.WBTC,
    isSourceFee: true,
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
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: (1 / 3000) * 0.9,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.ETH,
    isSourceFee: true,
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
    walletAddr: WALLETS.WHALE1,
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
    walletAddr: WALLETS.WHALE1,
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
    walletAddr: WALLETS.WHALE1,
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
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.8,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.USDT,
    isSourceFee: false,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V2,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: '0xef0dcc839c1490cebc7209baa11f46cfe83805ab',
    amountIn: 1,
    amountOutMin: 0.9,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.DAI,
    isSourceFee: false,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.DAI.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV2.DAI_USDT,
        direction: 0,
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
    amountIn: 0.1,
    amountOutMin: 100,
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
        lpAddress: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V2,
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
    amountIn: 100,
    amountOutMin: 0.001,
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
        lpAddress: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V2,
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
    amountIn: 0.1,
    amountOutMin: 100,
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
        lpAddress: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
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
    amountIn: 100,
    amountOutMin: 0.001,
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
        lpAddress: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
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
    //
    walletAddr: '0xef0dcc839c1490cebc7209baa11f46cfe83805ab',
    amountIn: 1,
    amountOutMin: 0.9,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.USDC,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV1.USDT_USDC,
        direction: 0,
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
    //
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
    amountOutMin: 0.0001,
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
        lpAddress: DODO.poolV1.WETH_USDC,
        direction: 0,
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
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 0.001,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.ETH,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV1.WETH_USDC,
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
    dstTokenData: TOKENS.USDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_USDT,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.CURVE_USDT][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_USDT][TOKENS.USDT.address],
        routerAddress: DEX.CURVE_USDT,
        dexInterface: RouterInterface.VYPER_UNDERLYING,
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
    amountOutMin: 100,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.USDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f',
        lpAddress: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.SUSHI,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
        to: ADDRESS_ZERO,
        lpAddress: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V2,
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
    amountOutMin: 100,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.USDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.SUSHI,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_USDT,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.CURVE_USDT][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_USDT][TOKENS.USDT.address],
        routerAddress: DEX.CURVE_USDT,
        dexInterface: RouterInterface.VYPER_UNDERLYING,
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
    dstTokenData: TOKENS.ETH,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V3,
        dexInterface: RouterInterface.UNISWAP_V3,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },

  // Source Fee

  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.8,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.USDT,
    isSourceFee: true,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ONE,
        lpAddress: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V2,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: '0xef0dcc839c1490cebc7209baa11f46cfe83805ab',
    amountIn: 1,
    amountOutMin: 0.9,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.DAI,
    isSourceFee: true,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.DAI.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ONE,
        lpAddress: DODO.poolV2.DAI_USDT,
        direction: 0,
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
    amountIn: 0.1,
    amountOutMin: 100,
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
        lpAddress: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V2,
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
    amountIn: 100,
    amountOutMin: 0.001,
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
        lpAddress: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V2,
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
    amountIn: 0.1,
    amountOutMin: 100,
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
        lpAddress: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
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
    amountIn: 100,
    amountOutMin: 0.001,
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
        lpAddress: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
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
    //
    walletAddr: '0xef0dcc839c1490cebc7209baa11f46cfe83805ab',
    amountIn: 1,
    amountOutMin: 0.9,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.USDC,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV1.USDT_USDC,
        direction: 0,
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
    //
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
    amountOutMin: 0.0001,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.USDC,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV1.WETH_USDC,
        direction: 0,
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
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 0.001,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.ETH,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DODO.poolV1.WETH_USDC,
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
    dstTokenData: TOKENS.USDT,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_USDT,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.CURVE_USDT][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_USDT][TOKENS.USDT.address],
        routerAddress: DEX.CURVE_USDT,
        dexInterface: RouterInterface.VYPER_UNDERLYING,
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
    amountOutMin: 100,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.USDT,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f',
        lpAddress: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.SUSHI,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
        to: ADDRESS_ONE,
        lpAddress: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V2,
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
    amountOutMin: 100,
    srcTokenData: TOKENS.ETH,
    dstTokenData: TOKENS.USDT,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.SUSHI,
        dexInterface: RouterInterface.UNISWAP_V2,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_USDT,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.CURVE_USDT][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_USDT][TOKENS.USDT.address],
        routerAddress: DEX.CURVE_USDT,
        dexInterface: RouterInterface.VYPER_UNDERLYING,
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
    dstTokenData: TOKENS.ETH,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V3,
        dexInterface: RouterInterface.UNISWAP_V3,
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
        lpAddress: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.UNI_V3,
        dexInterface: RouterInterface.UNISWAP_V3,
        part: 100000000,
        amountAfterFee: 9970,
        order: '0x',
      },
    ],
  },

  // kyberDMM
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 0.01,
    amountOutMin: 1,
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
        lpAddress: '0xd478953d5572f829f457a5052580cbeaee36c1aa',
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
    amountIn: 100,
    amountOutMin: 0.01,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.ETH,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WETH.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: '0xd478953d5572f829f457a5052580cbeaee36c1aa',
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
    amountIn: 1,
    amountOutMin: 0.5,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.USDT,
    isSourceFee: false,
    isRouterSource: false,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.USDT.address,
        from: ADDRESS_ONE,
        to: ADDRESS_ZERO,
        lpAddress: '0x306121f1344ac5f84760998484c0176d7bfb7134',
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
    amountIn: 1000,
    amountOutMin: 100,
    srcTokenData: TOKENS.USDT,
    dstTokenData: TOKENS.DAI,
    isSourceFee: true,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDT.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: '0xd478953d5572f829f457a5052580cbeaee36c1aa',
        lpAddress: '0x306121f1344ac5f84760998484c0176d7bfb7134',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.KYBER_DMM,
        dexInterface: RouterInterface.KYBER_DMM,
        part: 100000000,
        amountAfterFee: 10000,
        order: '0x',
      },
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WETH.address,
        from: '0x306121f1344ac5f84760998484c0176d7bfb7134',
        to: '0x20d6b227f4a5a2a13d520329f01bb1f8f9d2d628',
        lpAddress: '0xd478953d5572f829f457a5052580cbeaee36c1aa',
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.KYBER_DMM,
        dexInterface: RouterInterface.KYBER_DMM,
        part: 100000000,
        amountAfterFee: 10000,
        order: '0x',
      },
      {
        fromToken: TOKENS.WETH.address,
        toToken: TOKENS.DAI.address,
        from: '0xd478953d5572f829f457a5052580cbeaee36c1aa',
        to: ADDRESS_ZERO,
        lpAddress: '0x20d6b227f4a5a2a13d520329f01bb1f8f9d2d628',
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
]

testOnly('ethereum', 'swap', () =>
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