import _ from 'lodash'

import { ArkenDexConstructorParams } from '../../../helpers/contracts'
import {
  ADDRESS_ZERO,
  RouterInterface,
  VyperConfig,
} from '../../../helpers/types'
import { TOKENS } from './tokens'

export const DEX = {
  SUSHI: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
  CURVE_TRICRYPTO_V2: '0x960ea3e3c7fb317332d990873d354e18d7645590',
}

export const WALLETS = {
  FEE: '0x9F1c6b37deDE7584E722681C8f9D55E5CF1788f5',
  OWNER: '0xbA818E4F28F42c598A4f2b83df1A793Ac25c6C69',
  WHALE1: '0x0ed67daaacf97acf041cc65f04a632a8811347ff',
  WHALE2: '0x489ee077994b6658eafa855c308275ead8097c4a',
}

export const DODO = {
  routerAddress: '0x88CBf433471A0CD8240D2a12354362988b4593E5',
  approveAddress: '0xA867241cDC8d3b0C07C85cC06F25a0cD3b5474d8',
  poolV2: {
    DODO_USDC: '0x6a58c68ff5c4e4d90eb6561449cc74a64f818da5',
    USX_USDC: '0x9340e3296121507318874ce9c04afb4492af0284',
  },
  poolV1: {
    WETH_USDC: '0xfe176a2b1e1f67250d2903b8d25f56c0dabcd6b2',
    WBTC_USDC: '0xb42a054d950dafd872808b3c839fbb7afb86e14c',
    USDT_USDC: '0xe4b2dfc82977dd2dce7e8d37895a6a8f50cbb4fb',
  },
}

export const VYPER_CONFIG: VyperConfig = {
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
