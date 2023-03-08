import _ from 'lodash'

import { ArkenDexConstructorParams } from '../../../helpers/contracts'
import {
  ADDRESS_ZERO,
  RouterInterface,
  VyperConfig,
} from '../../../helpers/types'
import { TOKENS } from './tokens'

export const DEX = {
  UNI_V2: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  UNI_V3: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
  CURVE_BUSD: '0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27',
  CURVE_USDT: '0x52EA46506B9CC5Ef470C5bf89f17Dc28bB35D85C',
  SUSHI: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
  BALANCER: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
  CURVE_TRICRYPTO_V2: '0xD51a44d3FaE010294C616388b506AcdA1bfAAE46',
  LIMIT_ORDER: '0x119c71D3BbAC22029622cbaEc24854d3D32D2828',
  KYBER_DMM: '0x1c87257f5e8609940bc751a07bb085bb7f8cdbe6',
}

export const WALLETS = {
  FEE: '0x9F1c6b37deDE7584E722681C8f9D55E5CF1788f5',
  OWNER: '0xbA818E4F28F42c598A4f2b83df1A793Ac25c6C69',
  WHALE1: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
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

export const BALANCER_POOLS = {
  WETH_DAI: '0x0b09dea16768f0799065c475be02919503cb2a35',
  DAI_USDC_UDST: '0x06df3b2bbb68adc8b0e302443692037ed9f91b42',
  WBTC_WETH: '0xa6f548df93de924d73be7d25dc02554c6bd66db5',
}

export const VYPER_CONFIG: VyperConfig = {
  [DEX.CURVE_BUSD]: {
    [TOKENS.DAI.address]: 0,
    [TOKENS.USDC.address]: 1,
    [TOKENS.USDT.address]: 2,
    [TOKENS.BUSD.address]: 3,
  },
  [DEX.CURVE_USDT]: {
    [TOKENS.DAI.address]: 0,
    [TOKENS.USDC.address]: 1,
    [TOKENS.USDT.address]: 2,
  },
  [DEX.CURVE_TRICRYPTO_V2]: {
    [TOKENS.USDT.address]: 0,
    [TOKENS.WBTC.address]: 1,
    [TOKENS.WETH.address]: 2,
  },
}

export const CONSTRUCTOR_PARAMS: ArkenDexConstructorParams = {
  _ownerAddress: WALLETS.OWNER,
  _feeWalletAddress: WALLETS.FEE,
  _wrappedEther: TOKENS.WETH.address,
  _wrappedEtherDfyn: TOKENS.WETH.address,
  _dodoApproveAddress: DODO.approveAddress,
  _uniswapV3Factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  _woofiQuoteToken: ADDRESS_ZERO,
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
