import { constants } from 'ethers'
import _ from 'lodash'

import { ArkenDexConstructorParams } from '../../../helpers/contracts'
import {
  ADDRESS_ZERO,
  RouterInterface,
  VyperConfig,
} from '../../../helpers/types'
import { TOKENS } from './tokens'

export const DEX = {
  FOODCOURT: '0xa7A360E2135A99f13Ad955DdD4dD2347bDF09887',
}

export const WALLETS = {
  FEE: '0x9F1c6b37deDE7584E722681C8f9D55E5CF1788f5',
  OWNER: '0xbA818E4F28F42c598A4f2b83df1A793Ac25c6C69',
  WHALE1: '0x0ed67daaacf97acf041cc65f04a632a8811347ff',
}

export const DODO = {}

export const VYPER_CONFIG: VyperConfig = {}

export const CONSTRUCTOR_PARAMS: ArkenDexConstructorParams = {
  _ownerAddress: WALLETS.OWNER,
  _feeWalletAddress: WALLETS.FEE,
  _wrappedEther: TOKENS.WREI.address,
  _wrappedEtherDfyn: TOKENS.WREI.address,
  _dodoApproveAddress: constants.AddressZero,
  _uniswapV3Factory: constants.AddressZero,
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
