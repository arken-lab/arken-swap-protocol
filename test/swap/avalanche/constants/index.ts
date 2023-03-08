import _ from 'lodash'

import { ArkenDexConstructorParams } from '../../../helpers/contracts'
import { RouterInterface, VyperConfig } from '../../../helpers/types'
import { TOKENS } from './tokens'

export const DEX = {
  PANGOLIN: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
  TRADERJOE: '0x60ae616a2155ee3d9a68541ba4544862310933d4',
  SUSHI: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
  LYDIA: '0xa52abe4676dbfd04df42ef7755f01a3c41f28d27',
  CURVE: '0x58e57ca18b7a47112b877e31929798cd3d703b0f',
  KYBER_DMM: '0x8Efa5A9AD6D594Cf76830267077B78cE0Bc5A5F8',
  WOO_FI: '0x1df3009c57a8B143c6246149F00B090Bce3b8f88',
}

export const WALLETS = {
  FEE: '0x9F1c6b37deDE7584E722681C8f9D55E5CF1788f5',
  OWNER: '0xbA818E4F28F42c598A4f2b83df1A793Ac25c6C69',
  WHALE1: '0x0ed67daaacf97acf041cc65f04a632a8811347ff',
  WHALE2: '0xd8c8edf5e23a4f69aee60747294482e941dcbea0',
}

export const DODO = {
  approveAddress: '0x0000000000000000000000000000000000000000',
}

export const VYPER_CONFIG: VyperConfig = {}

export const CONSTRUCTOR_PARAMS: ArkenDexConstructorParams = {
  _ownerAddress: WALLETS.OWNER,
  _feeWalletAddress: WALLETS.FEE,
  _wrappedEther: TOKENS.WAVAX.address,
  _wrappedEtherDfyn: TOKENS.WAVAX.address,
  _dodoApproveAddress: DODO.approveAddress,
  _uniswapV3Factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  _woofiQuoteToken: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
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
