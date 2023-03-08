import { Suite } from 'mocha'

export type Chain =
  | 'local'
  | 'bsc'
  | 'polygon'
  | 'ethereum'
  | 'avalanche'
  | 'arbitrum'
  | 'aurora'
  | 'rei'
  | 'fantom'
  | 'bsctestnet'
  | 'any'
export type Module = 'swap' | 'swapv4' | 'stoplimit'

export const testOnly = (
  chain: Chain,
  module: Module,
  tests: () => void | Suite
) => {
  if (!process.env.CHAIN || chain === 'any' || process.env.CHAIN === chain) {
    if (
      !process.env.MODULE ||
      process.env.MODULE === 'all' ||
      process.env.MODULE === module
    ) {
      return tests()
    }
  }
}
