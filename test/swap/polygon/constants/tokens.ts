import { TokenData } from '../../../helpers/types'

export const TOKENS: { [x: string]: TokenData } = {
  MATIC: {
    symbol: 'MATIC',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18,
  },
  WMATIC: {
    symbol: 'WMATIC',
    address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    decimals: 18,
  },
  USDC: {
    symbol: 'USDC',
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    decimals: 6,
  },
  USDT: {
    symbol: 'USDT',
    address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    decimals: 6,
  },
  WETH_DFYN: {
    symbol: 'WETH_DFYN',
    address: '0x4c28f48448720e9000907bc2611f73022fdce1fa',
    decimals: 18,
  },
  QUICK: {
    symbol: 'QUICK',
    address: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
    decimals: 18,
  },
  WETH: {
    symbol: 'WETH',
    address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    decimals: 18,
  },
  SHI3LD: {
    symbol: 'SHI3LD',
    address: '0xf239e69ce434c7fb408b05a0da416b14917d934e',
    decimals: 18,
  },
  WBTC: {
    symbol: 'WBTC',
    address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    decimals: 8,
  },
}
