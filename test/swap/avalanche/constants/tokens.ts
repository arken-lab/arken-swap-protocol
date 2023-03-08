import { TokenData } from '../../../helpers/types'

export const TOKENS: { [x: string]: TokenData } = {
  AVAX: {
    symbol: 'AVAX',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18,
  },
  WAVAX: {
    symbol: 'WAVAX',
    address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    decimals: 18,
  },
  USDT: {
    symbol: 'USDT.e',
    address: '0xc7198437980c041c805a1edcba50c1ce5db95118',
    decimals: 6,
  },
  PNG: {
    symbol: 'PNG',
    address: '0x60781c2586d68229fde47564546784ab3faca982',
    decimals: 18,
  },
  USDCe: {
    symbol: 'USDC.e',
    address: '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
    decimals: 6,
  },
  USDC: {
    symbol: 'USDC',
    address: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
    decimals: 6,
  },

  MIM: {
    symbol: 'MIM',
    address: '0x130966628846bfd36ff31a822705796e8cb8c18d',
    decimals: 18,
  },
  WBTCE: {
    symbol: 'WBTC.e',
    address: '0x50b7545627a5162f82a992c33b87adc75187b218',
    decimals: 8,
  },
}
