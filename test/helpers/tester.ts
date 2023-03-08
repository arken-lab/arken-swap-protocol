import { ethers, artifacts } from 'hardhat'

import { SwapTestParamsV3 } from '../swap/testSwap.v3.spec'
import { ADDRESS_ZERO } from './types'

const iLimitOrder = new ethers.utils.Interface(
  artifacts.readArtifactSync('LimitOrderProtocol').abi
)
interface GolangSwapRoute {
  RouterAddress: string
  LpAddress: string
  FromToken: string
  ToToken: string
  From: string
  To: string
  Part: number
  Direction: number
  FromTokenIndex: number
  ToTokenIndex: number
  AmountAfterFee: number
  DexInterface: number
  Order: string
}

interface GolangSwapParams {
  SrcToken: string
  DstToken: string
  AmountIn: number
  AmountOutMin: number
  To: string
  Routes: Array<GolangSwapRoute>
  IsRouterSource: boolean
  IsSourceFee: boolean
}
interface LimitOrderData {
  makerAsset: string
  takerAsset: string
  getMakerAmount: string
  getTakerAmount: string
  makerAssetData: string
  takerAssetData: string
  salt: string
  permit: string
  predicate: string
  interaction: string
  receiver: string
  allowedSender: string
  makingAmount: string
  takingAmount: string
  maker: string
}

interface LimitOrder {
  signature: string
  orderHash?: string
  createDateTime?: string
  remainingMakerAmount?: string
  makerBalance?: string
  makerAllowance?: string
  makerRate?: string
  takerRate?: string
  data: LimitOrderData
}

const cutSelector = (data: string): string => {
  const hexPrefix = '0x'
  return hexPrefix + data.substring(hexPrefix.length + 8)
}

const cutLastArg = (data: string, padding: number = 0): string => {
  return data.substring(0, data.length - 64 - padding)
}

export const encodeOrderToHex = (order: LimitOrder): string => {
  return cutSelector(
    iLimitOrder.encodeFunctionData('fillOrder', [
      order.data,
      order.signature,
      '0',
      '0',
      '0',
    ])
  )
}

export const buildOrder = (
  wallet: string,
  makerAsset: string,
  takerAsset: string,
  makingAmount: string,
  takingAmount: string,
  allowedSender: string = ADDRESS_ZERO,
  predicate: string = '0x',
  permit: string = '0x',
  interaction: string = '0x',
  receiver: string = ADDRESS_ZERO
): LimitOrderData => {
  return buildOrderWithSalt(
    wallet,
    '1',
    makerAsset,
    takerAsset,
    makingAmount,
    takingAmount,
    allowedSender,
    predicate,
    permit,
    interaction,
    receiver
  )
}

const name = '1inch Limit Order Protocol'
const version = '2'

const EIP712Domain: any = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
]

const Order: any = [
  { name: 'salt', type: 'uint256' },
  { name: 'makerAsset', type: 'address' },
  { name: 'takerAsset', type: 'address' },
  { name: 'maker', type: 'address' },
  { name: 'receiver', type: 'address' },
  { name: 'allowedSender', type: 'address' },
  { name: 'makingAmount', type: 'uint256' },
  { name: 'takingAmount', type: 'uint256' },
  { name: 'makerAssetData', type: 'bytes' },
  { name: 'takerAssetData', type: 'bytes' },
  { name: 'getMakerAmount', type: 'bytes' },
  { name: 'getTakerAmount', type: 'bytes' },
  { name: 'predicate', type: 'bytes' },
  { name: 'permit', type: 'bytes' },
  { name: 'interaction', type: 'bytes' },
]

export const buildOrderData = (
  chainId: string,
  verifyingContract: string,
  order: LimitOrderData
): {
  primaryType: 'Order' | 'EIP712Domain'
  types: any
  domain: any
  message: any
} => {
  return {
    primaryType: 'Order',
    types: { EIP712Domain, Order },
    domain: { name, version, chainId, verifyingContract },
    message: order,
  }
}

const buildOrderWithSalt = (
  wallet: string,
  salt: string,
  makerAsset: string,
  takerAsset: string,
  makingAmount: string,
  takingAmount: string,
  allowedSender: string = ADDRESS_ZERO,
  predicate: string = '0x',
  permit: string = '0x',
  interaction: string = '0x',
  receiver: string = ADDRESS_ZERO
): LimitOrderData => {
  return {
    salt: salt,
    makerAsset: makerAsset,
    takerAsset: takerAsset,
    maker: wallet,
    receiver,
    allowedSender,
    makingAmount,
    takingAmount,
    makerAssetData: '0x',
    takerAssetData: '0x',
    getMakerAmount: cutLastArg(
      iLimitOrder.encodeFunctionData('getMakerAmount', [
        makingAmount,
        takingAmount,
        '0',
      ])
    ),
    getTakerAmount: cutLastArg(
      iLimitOrder.encodeFunctionData('getTakerAmount', [
        makingAmount,
        takingAmount,
        '0',
      ])
    ),
    predicate: predicate,
    permit: permit,
    interaction: interaction,
  }
}

export const convertGoObjectToTestParams = (
  p: GolangSwapParams,
  only?: boolean,
  skip?: boolean
): SwapTestParamsV3 => {
  return {
    srcTokenData: {
      address: p.SrcToken,
      decimals: 0,
      symbol: p.SrcToken,
    },
    dstTokenData: {
      address: p.DstToken,
      decimals: 0,
      symbol: p.DstToken,
    },
    walletAddr: p.To,
    isAmountParsed: true,
    amountIn: p.AmountIn,
    amountOutMin: p.AmountOutMin,
    isRouterSource: p.IsRouterSource,
    isSourceFee: p.IsSourceFee,
    routes: p.Routes.map((r) => ({
      amountAfterFee: r.AmountAfterFee,
      dexInterface: r.DexInterface,
      direction: r.Direction,
      from: r.From,
      fromToken: r.FromToken,
      fromTokenIndex: r.FromTokenIndex,
      lpAddress: r.LpAddress,
      part: r.Part,
      routerAddress: r.RouterAddress,
      to: r.To,
      toToken: r.ToToken,
      toTokenIndex: r.ToTokenIndex,
      order: r.Order,
    })),
    only,
    skip,
  }
}

interface APIResponseProtocol {
  chain: string
  dexName: string
  part: number
  partPool: number
  fromTokenAddress: string
  toTokenAddress: string
  fromRouterAddress: string
  toRouterAddress: string
  lpAddress: string
  updatedAt: number
  updatedBlock: number
  fee: number
  order: string
}
interface APIResponse {
  fromToken: string
  toToken: string
  fromTokenAmount: string
  toTokenAmount: string
  toTokenAmountWithoutArkenFee: string
  isSourceFee: boolean
  isRouterSource: boolean
  priceImpact: string
  arkenFee: string
  otherFee: string
  transactionFee: string
  protocols: Array<Array<APIResponseProtocol>>
}

export const convertAPIResponseToTestParams = (
  p: APIResponse,
  walletAddr: string,
  only?: boolean,
  skip?: boolean
): SwapTestParamsV3 => {
  return {
    srcTokenData: {
      address: p.fromToken,
      decimals: 0,
      symbol: p.fromToken,
    },
    dstTokenData: {
      address: p.toToken,
      decimals: 0,
      symbol: p.toToken,
    },
    isAmountParsed: true,
    amountIn: p.fromTokenAmount,
    amountOutMin: p.toTokenAmount,
    isRouterSource: p.isRouterSource,
    isSourceFee: p.isSourceFee,
    walletAddr,
    routes: p.protocols[0].map((r) => ({
      amountAfterFee: r.fee,
      from: r.fromRouterAddress,
      to: r.toRouterAddress,
      fromToken: r.fromTokenAddress,
      toToken: r.toTokenAddress,
      routerAddress: ADDRESS_ZERO,
      lpAddress: r.lpAddress,
      part: r.part * 1000000,
      fromTokenIndex: 0,
      toTokenIndex: 0,
      direction: 0,
      dexInterface: 0,
      order: r.order,
    })),
    only,
    skip,
  }
}
