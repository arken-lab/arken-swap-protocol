import _ from 'lodash'

import { testOnly } from '../../helpers/scope'
import { encodeOrderToHex } from '../../helpers/tester'
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
    amountOutMin: 0.9,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.FRAX,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.FRAX.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.SADDLE,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.SADDLE][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.SADDLE][TOKENS.FRAX.address],
        routerAddress: DEX.SADDLE,
        dexInterface: RouterInterface.DOPPLE,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 90,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.fUSDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.fUSDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.SYNAPSE_FOUR,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.SYNAPSE_FOUR][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.SYNAPSE_FOUR][TOKENS.fUSDT.address],
        routerAddress: DEX.SYNAPSE_FOUR,
        dexInterface: RouterInterface.DOPPLE,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 90,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.fUSDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.fUSDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.SYNAPSE_THREE,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.SYNAPSE_THREE][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.SYNAPSE_THREE][TOKENS.fUSDT.address],
        routerAddress: DEX.SYNAPSE_THREE,
        dexInterface: RouterInterface.DOPPLE,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 90,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.fUSDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.fUSDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_FOUR,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.CURVE_FOUR][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_FOUR][TOKENS.fUSDT.address],
        routerAddress: DEX.CURVE_FOUR,
        dexInterface: RouterInterface.VYPER,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 90,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.fUSDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.fUSDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_THREE1,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.CURVE_THREE1][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_THREE1][TOKENS.fUSDT.address],
        routerAddress: DEX.CURVE_THREE1,
        dexInterface: RouterInterface.VYPER,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 90,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.fUSDT,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.fUSDT.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_THREE2,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.CURVE_THREE2][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_THREE2][TOKENS.fUSDT.address],
        routerAddress: DEX.CURVE_THREE2,
        dexInterface: RouterInterface.VYPER,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    // USDT-WBTC-WETH
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 90,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.DAI,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.DAI.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.CURVE_TWO,
        direction: 0,
        fromTokenIndex: VYPER_CONFIG[DEX.CURVE_TWO][TOKENS.USDC.address],
        toTokenIndex: VYPER_CONFIG[DEX.CURVE_TWO][TOKENS.DAI.address],
        routerAddress: DEX.CURVE_TWO,
        dexInterface: RouterInterface.VYPER,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 10,
    amountOutMin: 0.0001,
    srcTokenData: TOKENS.FTM,
    dstTokenData: TOKENS.BTC,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WFTM.address,
        toToken: TOKENS.BTC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.WOO_FI,
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.WOO_FI,
        dexInterface: RouterInterface.WOO_FI,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 1,
    amountOutMin: 0.1,
    srcTokenData: TOKENS.FTM,
    dstTokenData: TOKENS.USDC,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.WFTM.address,
        toToken: TOKENS.USDC.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.WOO_FI,
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.WOO_FI,
        dexInterface: RouterInterface.WOO_FI,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
  {
    // only: true,
    walletAddr: WALLETS.WHALE1,
    amountIn: 100,
    amountOutMin: 90,
    srcTokenData: TOKENS.USDC,
    dstTokenData: TOKENS.FTM,
    isSourceFee: false,
    isRouterSource: true,
    routes: [
      {
        fromToken: TOKENS.USDC.address,
        toToken: TOKENS.WFTM.address,
        from: ADDRESS_ZERO,
        to: ADDRESS_ZERO,
        lpAddress: DEX.WOO_FI,
        direction: 0,
        fromTokenIndex: 0,
        toTokenIndex: 0,
        routerAddress: DEX.WOO_FI,
        dexInterface: RouterInterface.WOO_FI,
        part: 100000000,
        amountAfterFee: 100,
        order: '0x',
      },
    ],
  },
]

testOnly('fantom', 'swap', () =>
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
