import { Suite } from 'mocha'

export const testOnlyBSC = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'bsc' && (process.env.FEATURE === 'swap' || process.env.FEATURE === '') ) {
    tests()
  }
}

export const testOnlyStopLimitBSC = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'bsc' && process.env.FEATURE === 'stoplimit') {
    tests()
  }
}

export const testOnlyTradeStopLimitBSC = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'bsc' && process.env.FEATURE === 'stoplimit') {
    tests()
  }
}

export const testOnlyPolygon = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'polygon') {
    tests()
  }
}

export const testOnlyEthereum = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'ethereum') {
    tests()
  }
}

export const testOnlyEthereumRopsten = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'ethereum-ropsten') {
    tests()
  }
}

export const testOnlyBscTestnet = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'bsctestnet') {
    tests()
  }
}

export const testOnlyAvalanche = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'avalanche') {
    tests()
  }
}

export const testOnlyArbitrum = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'arbitrum') {
    tests()
  }
}

export const testOnlyAurora = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'aurora') {
    tests()
  }
}

export const testOnlyRei = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'rei') {
    tests()
  }
}

export const testOnlyFantom = (tests: () => void | Suite) => {
  if (process.env.CHAIN === 'fantom') {
    tests()
  }
}