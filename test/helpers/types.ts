import { BigNumberish } from 'ethers'

export type VyperConfig = {
  [dexAddr: string]: {
    [tokenAddr: string]: number
  }
}

export const RouterInterface = {
  UNISWAP_V2: 0,
  BAKERY: 1,
  VYPER: 2,
  VYPER_UNDERLYING: 3,
  DOPPLE: 4,
  DODO_V2: 5,
  DODO_V1: 6,
  DFYN: 7,
  BALANCER: 8,
  UNISWAP_V3: 9,
  CURVE_TRICRYPTO_V2: 10,
  LIMIT_ORDER_PROTOCOL_V2: 11,
  KYBER_DMM: 12,
  WOO_FI: 13,
}

export type TokenData = {
  symbol: string
  address: string
  decimals: number
  holder?: string
}

export const ETHER_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
export const ADDRESS_ONE = '0x0000000000000000000000000000000000000001'
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export type TradeDescription = {
  srcToken: string
  dstToken: string
  amountIn: BigNumberish
  amountOutMin: BigNumberish
  to: string
  routes: {
    routerAddress: string
    lpAddress: string
    fromToken: string
    toToken: string
    from: string
    to: string
    part: BigNumberish
    direction: BigNumberish
    fromTokenIndex: BigNumberish
    toTokenIndex: BigNumberish
    amountAfterFee: BigNumberish
    dexInterface: BigNumberish
  }[]
  isRouterSource: boolean
  isSourceFee: boolean
}
