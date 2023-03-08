import _ from 'lodash'

import { ArkenDexConstructorParams } from '../../../helpers/contracts'
import { RouterInterface, VyperConfig } from '../../../helpers/types'
import { TOKENS } from './tokens'

export const DEX = {
  SADDLE: '0xbea9f78090bdb9e662d8cb301a00ad09a5b756e9',
  SYNAPSE_FOUR: '0x2913e812cf0dcca30fb28e6cac3d2dcff4497688',
  SYNAPSE_THREE: '0x85662fd123280827e11c59973ac9fcbe838dc3b4',
  CURVE_FOUR: '0x9dc516a18775d492c9f061211C8a3FDCd476558d',
  CURVE_THREE1: '0x7c79acC9aEf46E4d55BD05d06C24E79C35183241',
  CURVE_THREE2: '0xa58f16498c288c357e28ee899873ff2b55d7c437',
  CURVE_TWO: '0x27e611fd27b276acbd5ffd632e5eaebec9761e40',
  WOO_FI: '0x9503e7517d3c5bc4f9e4a1c6ae4f8b33ac2546f2',
}

export const WALLETS = {
  FEE: '0x9F1c6b37deDE7584E722681C8f9D55E5CF1788f5',
  OWNER: '0xbA818E4F28F42c598A4f2b83df1A793Ac25c6C69',
  WHALE1: '0x62fc798d7a1924532c72511d132aeabd02f4fa30',
}

export const DODO = {
  routerAddress: '0xa356867fDCEa8e71AEaF87805808803806231FdC',
  approveAddress: '0xCB859eA579b28e02B87A1FDE08d087ab9dbE5149',
  poolV2: {
    DAI_USDT: '0x3058ef90929cb8180174d74c507176cca6835d73',
    USDT_USDC: '0xb96fd0320e5372a0f3593f28184029f34798d4a0',
  },
  poolV1: {
    USDT_USDC: '0xc9f93163c99695c6526b799ebca2207fdf7d61ad',
    WETH_USDC: '0x75c23271661d9d143dcb617222bc4bec783eff34',
  },
}

export const VYPER_CONFIG: VyperConfig = {
  [DEX.SADDLE]: {
    [TOKENS.FRAX.address]: 0,
    [TOKENS.USDC.address]: 1,
  },
  [DEX.SYNAPSE_FOUR]: {
    [TOKENS.nUSD.address]: 0,
    [TOKENS.MIM.address]: 1,
    [TOKENS.USDC.address]: 2,
    [TOKENS.fUSDT.address]: 3,
  },
  [DEX.SYNAPSE_THREE]: {
    [TOKENS.nUSD.address]: 0,
    [TOKENS.USDC.address]: 1,
    [TOKENS.fUSDT.address]: 2,
  },
  [DEX.CURVE_FOUR]: {
    [TOKENS.FRAX.address]: 0,
    [TOKENS.USDC.address]: 1,
    [TOKENS.UST.address]: 2,
    [TOKENS.fUSDT.address]: 3,
  },
  [DEX.CURVE_THREE1]: {
    [TOKENS.UST.address]: 0,
    [TOKENS.USDC.address]: 1,
    [TOKENS.fUSDT.address]: 2,
  },
  [DEX.CURVE_THREE2]: {
    [TOKENS.miMATIC.address]: 0,
    [TOKENS.fUSDT.address]: 1,
    [TOKENS.USDC.address]: 2,
  },
  [DEX.CURVE_TWO]: {
    [TOKENS.DAI.address]: 0,
    [TOKENS.USDC.address]: 1,
  },
}

export const CONSTRUCTOR_PARAMS: ArkenDexConstructorParams = {
  _ownerAddress: WALLETS.OWNER,
  _feeWalletAddress: WALLETS.FEE,
  _wrappedEther: TOKENS.WFTM.address,
  _wrappedEtherDfyn: TOKENS.WFTM.address,
  _dodoApproveAddress: DODO.approveAddress,
  _uniswapV3Factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  _woofiQuoteToken: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
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
