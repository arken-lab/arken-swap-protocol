import { TokenData } from '../../../helpers/types'

export const TOKENS: { [x: string]: TokenData } = {
  ETH: {
    symbol: 'ETH',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18,
  },
  WETH: {
    symbol: 'WETH',
    address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    decimals: 18,
  },
  USDC: {
    symbol: 'USDC',
    address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    decimals: 6,
  },
  USDT: {
    symbol: 'USDT',
    address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    decimals: 6,
  },
  USX: {
    symbol: 'USX',
    address: '0x641441c631e2f909700d2f41fd87f0aa6a6b4edb',
    decimals: 18,
  },
  DODO: {
    symbol: 'DODO',
    address: '0x69Eb4FA4a2fbd498C257C57Ea8b7655a2559A581',
    decimals: 18,
  },
  WBTC: {
    symbol: 'WBTC',
    address: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    decimals: 8,
  },
}
