import '@nomicfoundation/hardhat-chai-matchers'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@openzeppelin/hardhat-upgrades'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'hardhat-storage-layout'
import { HardhatUserConfig } from 'hardhat/types'
import 'solidity-coverage'

require('dotenv').config()

const getConfig = (
  chain: string
): {
  chainId: number
  forkURL: string
  apiKey: string
  gasPriceAPI: string
  token: string
} => {
  switch (chain) {
    case 'local':
      return {
        chainId: 0,
        forkURL: '',
        apiKey: '',
        gasPriceAPI: '',
        token: 'LOCAL',
      }
    case 'bsc':
      return {
        chainId: 56,
        forkURL:
          process.env.BSC_MAINNET_FORK_URL ||
          'https://bsc-dataseed.binance.org/',
        apiKey: process.env.BSC_SCAN_API_KEY || '',
        gasPriceAPI:
          'https://api.bscscan.com/api?module=proxy&action=eth_gasPrice',
        token: 'BNB',
      }
    case 'polygon':
      return {
        chainId: 137,
        forkURL:
          process.env.POLYGON_MAINNET_FORK_URL ||
          'https://rpc-mainnet.matic.network',
        apiKey: process.env.POLYGON_SCAN_API_KEY || '',
        gasPriceAPI:
          'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice',
        token: 'MATIC',
      }
    case 'avalanche':
      return {
        chainId: 43114,
        forkURL: process.env.AVALANCHE_MAINNET_FORK_URL || '',
        apiKey: process.env.SNOWTRACE_API_KEY || '',
        gasPriceAPI:
          'https://api.snowtrace.io/api?module=proxy&action=eth_gasPrice',
        token: 'AVAX',
      }
    case 'arbitrum':
      return {
        chainId: 42161,
        forkURL:
          process.env.ARBITRUM_MAINNET_FORK_URL ||
          'https://arb1.arbitrum.io/rpc',
        apiKey: process.env.ARBISCAN_API_KEY || '',
        gasPriceAPI:
          'https://api.arbiscan.io/api?module=proxy&action=eth_gasPrice',
        token: 'AETH',
      }
    case 'aurora':
      return {
        chainId: 1313161554,
        forkURL:
          process.env.AURORA_MAINNET_FORK_URL || 'https://mainnet.aurora.dev',
        apiKey: process.env.AURORASCAN_API_KEY || '',
        gasPriceAPI:
          'https://api.aurorascan.dev/api?module=proxy&action=eth_gasPrice',
        token: 'aETH',
      }
    case 'rei':
      return {
        chainId: 55555,
        forkURL:
          process.env.REI_MAINNET_FORK_URL || 'https://rei-rpc.moonrhythm.io/',
        apiKey: process.env.REISCAN_API_KEY || '',
        gasPriceAPI:
          'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
        token: 'ETH',
      }
    case 'bsctestnet':
      return {
        chainId: 97,
        forkURL:
          process.env.BSC_TESTNET_FORK_URL ||
          'https://data-seed-prebsc-1-s1.binance.org:8545',
        apiKey: process.env.BSC_SCAN_API_KEY || '',
        gasPriceAPI:
          'https://api-testnet.bscscan.com/api?module=proxy&action=eth_gasPrice',
        token: 'BNB',
      }
    case 'fantom':
      return {
        chainId: 250,
        forkURL:
          process.env.FANTOM_MAINNET_FORK_URL || 'https://rpc.ftm.tools/',
        apiKey: process.env.FANTOM_SCAN_API_KEY || '',
        gasPriceAPI:
          'https://api.ftmscan.com/api?module=proxy&action=eth_gasPrice',
        token: 'FTM',
      }
    case 'etherum':
      return {
        chainId: 1,
        forkURL: process.env.ETHEREUM_MAINNET_FORK_URL || '',
        apiKey: process.env.ETHEREUM_SCAN_API_KEY || '',
        gasPriceAPI:
          'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
        token: 'ETH',
      }
    default:
      return {
        chainId: 0,
        forkURL: '',
        apiKey: '',
        gasPriceAPI: '',
        token: 'LOCAL',
      }
  }
}

const CONFIG = getConfig(process.env.CHAIN || '')
console.log('🚀 ~ file: hardhat.config.ts:135 ~ CONFIG:', CONFIG)

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    hardhat:
      CONFIG.chainId !== 0
        ? {
            chainId: CONFIG.chainId,
            forking: {
              enabled: true,
              url: CONFIG.forkURL,
              blockNumber: process.env.FORK_BLOCK_NUMBER
                ? parseInt(process.env.FORK_BLOCK_NUMBER)
                : undefined,
              ignoreUnknownTxType: true,
            },
          }
        : {},
    bsctestnet: {
      chainId: 97,
      url:
        process.env.BSC_TESTNET_URL ||
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bsc: {
      chainId: 56,
      url: process.env.BSC_URL || 'https://bsc-dataseed.binance.org/',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  solidity: {
    version: '0.8.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: CONFIG.apiKey,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 300000,
  },
  typechain: {
    outDir: './typechain',
    target: 'ethers-v5',
  },
  gasReporter: {
    currency: 'USD',
    token: CONFIG.token,
    gasPriceApi: CONFIG.gasPriceAPI,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
}

export default config
