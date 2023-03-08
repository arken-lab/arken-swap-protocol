import { TokenData } from '../../../helpers/types'

export const TOKENS: { [x: string]: TokenData } = {
  ETH: {
    symbol: 'ETH',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18,
  },
  WETH: {
    symbol: 'WETH',
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18,
  },
  BUSD: {
    symbol: 'BUSD',
    address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    decimals: 18,
  },
  BNB: {
    symbol: 'BNB',
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    decimals: 18,
  },
  USDC: {
    symbol: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    holder: '0x3041cbd36888becc7bbcbc0045e3b1f144466f5f',
  },
  USDT: {
    symbol: 'USDT',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    decimals: 6,
  },
  DAI: {
    symbol: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
  },
  WBTC: {
    symbol: 'WBTC',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    decimals: 8,
  },
}
