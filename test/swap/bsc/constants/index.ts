import _ from 'lodash'

import {
  ArkenDexConstructorParams,
  ArkenStopLimitConstructorParams,
} from '../../../helpers/contracts'
import {
  ADDRESS_ZERO,
  RouterInterface,
  VyperConfig,
} from '../../../helpers/types'
import { TOKENS } from './tokens'

export const DEX = {
  PANCAKE: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  TWINDEX: '0x6B011d0d53b0Da6ace2a3F436Fd197A4E35f47EF',
  MDEX: '0x7dae51bd3e3376b8c7c4900e9107f12be3af1ba8',
  WAULT: '0xd48745e39bbed146eec15b79cbf964884f9877c2',
  APE: '0xc0788a3ad43d79aa53b09c2eacc313a787d1d607',
  PANTHER: '0x24f7c33ae5f77e2a9eceed7ea858b4ca2fa1b7ec',
  BAKERY: '0xcde540d7eafe93ac5fe6233bee57e1270d3e330f',
  DOPPLE: '0x5162f992EDF7101637446ecCcD5943A9dcC63A8A',
  ELLIPSIS: '0x160CAed03795365F3A589f10C379FfA7d75d4E76',
  BELTFI: '0xAEA4f7dcd172997947809CE6F12018a6D5c1E8b6',
  LIMIT_ORDER: '0x1e38Eff998DF9d3669E32f4ff400031385Bf6362',
  KYBER_DMM: '0x78df70615ffc8066cc0887917f2Cd72092C86409',
  WOO_FI: '0xbf365Ce9cFcb2d5855521985E351bA3bcf77FD3F',
}

export const WALLETS = {
  FEE: '0x9F1c6b37deDE7584E722681C8f9D55E5CF1788f5',
  OWNER: '0xbA818E4F28F42c598A4f2b83df1A793Ac25c6C69',
  FULFILLERADMIN: '0xe963aF8B8F11351278FdA86780f85c3611692857',
  FULFILLER: '0xf68a4b64162906eff0ff6ae34e2bb1cd42fef62d',
  PAUSER: '0xe963aF8B8F11351278FdA86780f85c3611692857',
  WHALE1: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
  WHALE2: '0x84d34f4f83a87596cd3fb6887cff8f17bf5a7b83',
  WHALE3: '0x36e55406fab7a11f3fa030fb2eee20b60cddb64f',
  WHALEVEKTOR: '0xc5a7c9d185a47da11878f46932d23c0fdc56f275',
  WHALEBABYDOGE: '0xfaab5b7328d7bfce873b71f62bda4207216cfb03',
}

export const DODO = {
  routerAddress: '0x8F8Dd7DB1bDA5eD3da8C9daf3bfa471c12d58486',
  approveAddress: '0xa128Ba44B2738A558A1fdC06d6303d52D3Cef8c1',
  poolV2: {
    BNB_BUSD: '0x0fe261aeE0d1C4DFdDee4102E82Dd425999065F4',
    BUSD_CAKE: '0xc3D4FAC86f62f594c7B290fA9B1F09515Fbf8613',
    BNB_BUSD_2: '0x8a1f4957f851f764677cdeacff4c738ddeba1928',
  },
  poolV1: {
    BUSD_USDT: '0xbe60d4c4250438344bec816ec2dec99925deb4c7',
    USDC_BUSD: '0x6064dbd0ff10bfed5a797807042e9f63f18cfe10',
  },
}

export const VYPER_CONFIG: VyperConfig = {
  [DEX.ELLIPSIS]: {
    [TOKENS.BUSD.address]: 0,
    [TOKENS.USDC.address]: 1,
    [TOKENS.USDT.address]: 2,
  },
  [DEX.BELTFI]: {
    [TOKENS.DAI.address]: 0,
    [TOKENS.USDC.address]: 1,
    [TOKENS.USDT.address]: 2,
    [TOKENS.BUSD.address]: 3,
  },
}

export const CONSTRUCTOR_PARAMS: ArkenDexConstructorParams = {
  _ownerAddress: WALLETS.OWNER,
  _feeWalletAddress: WALLETS.FEE,
  _wrappedEther: TOKENS.WBNB.address,
  _wrappedEtherDfyn: TOKENS.WBNB.address,
  _dodoApproveAddress: DODO.approveAddress,
  _uniswapV3Factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  _woofiQuoteToken: '0x55d398326f99059ff775485246999027b3197955',
}

export const CONSTRUCTOR_STOPLIMIT_PARAMS: ArkenStopLimitConstructorParams = {
  _ownerAddress: WALLETS.OWNER,
  _arkenFulfillerAdmin: WALLETS.FULFILLERADMIN,
  _arkenFulfiller: WALLETS.FULFILLER,
  _arkenPauser: WALLETS.PAUSER,
  _wrappedEther: TOKENS.WBNB.address,
  _arkenApproveAddress: ADDRESS_ZERO,
  _version: 1,
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
