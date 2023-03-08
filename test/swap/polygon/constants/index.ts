import _ from 'lodash'

import { ArkenDexConstructorParams } from '../../../helpers/contracts'
import { RouterInterface, VyperConfig } from '../../../helpers/types'
import { TOKENS } from './tokens'

export const DEX = {
  SUSHI: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
  QUICK: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
  DFYN: '0xa102072a4c07f06ec3b4900fdc4c7b80b6c57429',
  JET: '0x5c6ec38fb0e2609672bdf628b1fd605a523e5923',
  BALANCER: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
  KYBER_DMM: '0x546C79662E028B661dFB4767664d0273184E4dD1',
  WOO_FI: '0x7400b665c8f4f3a951a99f1ee9872efb8778723d',
}

export const WALLETS = {
  FEE: '0x9F1c6b37deDE7584E722681C8f9D55E5CF1788f5',
  OWNER: '0xbA818E4F28F42c598A4f2b83df1A793Ac25c6C69',
  WHALE1: '0x84d34f4f83a87596cd3fb6887cff8f17bf5a7b83',
  WHALE2: '0xf9211ffbd6f741771393205c1c3f6d7d28b90f03',
}

export const DODO = {
  routerAddress: '0xa222e6a71D1A1Dd5F279805fbe38d5329C1d0e70',
  approveAddress: '0x6D310348d5c12009854DFCf72e0DF9027e8cb4f4',
  poolV2: {
    WMATIC_WETH: '0x80db8525f61e8c3688dbb7ffa9abcae05ae8a90a',
    WMATIC_USDC: '0x10dd6d8a29d489bede472cc1b22dc695c144c5c7',
    WETH_USDC: '0x5333eb1e32522f1893b7c9fea3c263807a02d561',
  },
  poolV1: {
    USDC_USDT: '0x813fddeccd0401c4fa73b092b074802440544e52',
  },
}

export const BALANCER_POOLS = {
  WMATIC_USD_WETH_BAL: '0x0297e37f1873d2dab4487aa67cd56b58e2f27875',
  USDC_TUSD_DAI_USDT: '0x0d34e5dd4d8f043557145598e4e2dc286b35fd4f',
  WBTC_WETH: '0xcf354603a9aebd2ff9f33e1b04246d8ea204ae95',
}

export const VYPER_CONFIG: VyperConfig = {}

export const CONSTRUCTOR_PARAMS: ArkenDexConstructorParams = {
  _ownerAddress: WALLETS.OWNER,
  _feeWalletAddress: WALLETS.FEE,
  _wrappedEther: TOKENS.WMATIC.address,
  _wrappedEtherDfyn: TOKENS.WETH_DFYN.address,
  _dodoApproveAddress: DODO.approveAddress,
  _uniswapV3Factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  _woofiQuoteToken: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
}

export { TOKENS }

export const findDexName = (addr: string, iRouter: number): string => {
  const key = _.findKey(
    DEX,
    (dAddr) => dAddr.toLowerCase() === addr.toLowerCase()
  )
  if (key) return key
  if (iRouter === RouterInterface.DODO_V2) return 'DODOv2'
  if (iRouter === RouterInterface.DODO_V1) return 'DODOv1'
  return `${addr.slice(0, 6)}…`
}
