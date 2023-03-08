import { BigNumberish } from '@ethersproject/bignumber'
import { expect } from 'chai'
import * as ethSigUtil from 'eth-sig-util'
import Wallet from 'ethereumjs-wallet'
import { BigNumber, BytesLike, Signer, utils } from 'ethers'
import { ethers, network } from 'hardhat'
import _ from 'lodash'

import { ArkenDexV4, IERC20 } from '../../typechain'
import {
  ArkenDexConstructorParams,
  MAX_UINT256,
  useArkenDEXV4,
  useERC20,
  useWallet,
} from '../helpers/contracts'
import {
  getChainId,
  setEtherBalance,
  setTokenBalance,
} from '../helpers/hardhat'
import { buildOrder, buildOrderData, encodeOrderToHex } from '../helpers/tester'
import { ETHER_ADDRESS, RouterInterface, TokenData } from '../helpers/types'

export interface RouteParamsV4 {
  direction: BigNumberish
  fromToken: string
  toToken: string
  fromTokenIndex: number
  toTokenIndex: number
  from: string
  to: string
  lpAddress: string
  routerAddress: string
  dexInterface: number
  amountAfterFee: number
  part: BigNumberish
  order: BytesLike
  holderToToken?: string
  holderFromToken?: string
}

export interface SwapTestParamsV4 {
  srcTokenData: TokenData
  dstTokenData: TokenData
  amountIn: BigNumberish
  amountOutMin: BigNumberish
  isSourceFee: boolean
  isRouterSource: boolean
  routes: Array<RouteParamsV4>
  description?: string
  walletAddr?: string
  only?: boolean
  skip?: boolean
  isAmountParsed?: boolean
}

export const testSwap = (
  tests: Array<SwapTestParamsV4>,
  findDexName: (addr: string, iRouter: number) => string,
  conParams: ArkenDexConstructorParams,
  defaultWallet: string,
  feeWallet: string
) => {
  const someOnly = tests.some((test) => test.only)
  let filteredTests: Array<SwapTestParamsV4> = []
  if (someOnly) {
    filteredTests = tests.filter((t) => t.only)
  } else {
    filteredTests = tests.filter((t) => typeof t.skip !== 'boolean' || !t.skip)
  }
  filteredTests.forEach(async (testParams) => {
    let description: string = ''
    const tokens = `${testParams.srcTokenData.symbol} to ${testParams.dstTokenData.symbol}`
    const uniqueDexes = _.chain(testParams.routes)
      .map((d: any) => findDexName(d.routerAddress, d.dexInterface))
      .uniq()
      .value()
    const dexes = uniqueDexes.join(',')
    description = `${tokens} via ${dexes} - starts with ${
      testParams.isRouterSource ? 'router' : 'sender'
    } - fee on ${testParams.isSourceFee ? 'source' : 'destination'}`
    testSwapLogic(
      conParams,
      testParams.walletAddr || defaultWallet,
      feeWallet,
      testParams,
      description,
      someOnly
    )
  })
}

const compareAddress = (a: string, b: string) =>
  a.toLowerCase() === b.toLowerCase()

const testSwapLogic = (
  arkenDexConstructorParams: ArkenDexConstructorParams,
  srcWalletAddress: string,
  feeWalletAddress: string,
  params: SwapTestParamsV4,
  description: string,
  only: boolean = false
) => {
  const desc = only ? describe.only : describe
  return desc(description, async () => {
    let srcWallet: Signer
    let feeWallet: Signer
    let srcToken: IERC20
    let dstToken: IERC20
    let arkenDex: ArkenDexV4

    beforeEach(async () => {
      srcWallet = await useWallet(srcWalletAddress, true)
      feeWallet = await useWallet(feeWalletAddress, true)
      const arkenDexDeployed = await useArkenDEXV4(arkenDexConstructorParams)
      arkenDex = arkenDexDeployed.arkenDex
      arkenDex = arkenDex.connect(srcWallet)

      const amountIn = params.isAmountParsed
        ? BigNumber.from(params.amountIn.toString())
        : utils.parseUnits(
            params.amountIn.toString(),
            params.srcTokenData.decimals
          )

      await setEtherBalance(srcWalletAddress, MAX_UINT256.div(2))
      if (!compareAddress(params.srcTokenData.address, ETHER_ADDRESS)) {
        try {
          await setTokenBalance(
            srcWalletAddress,
            amountIn,
            params.srcTokenData.address,
            params.srcTokenData.holder || params.routes[0].lpAddress
          )
        } catch (e) {
          console.log(`error while setting token balance: ${e}.`)
        }

        srcToken = (await useERC20(params.srcTokenData.address, true)).connect(
          srcWallet
        )
      }

      if (!compareAddress(params.dstTokenData.address, ETHER_ADDRESS)) {
        dstToken = (await useERC20(params.dstTokenData.address, true)).connect(
          srcWallet
        )
      }

      let makerWallet = Wallet.generate()
      let makerWalletAddress = makerWallet.getAddressString()
      let makerWalletSigner = await ethers.getSigner(makerWalletAddress)
      await network.provider.request({
        method: 'hardhat_impersonateAccount',
        params: [makerWalletAddress],
      })
      await setEtherBalance(makerWalletAddress, MAX_UINT256.div(2))
      let chainId = await getChainId()

      for (let i = 0; i < params.routes.length; i++) {
        if (
          params.routes[i].dexInterface ===
          RouterInterface.LIMIT_ORDER_PROTOCOL_V2
        ) {
          if (params.routes[i].order !== '0x') {
            continue
          }
          const route = params.routes[i]
          await setTokenBalance(
            makerWalletAddress,
            MAX_UINT256.div(4),
            route.toToken,
            route.holderToToken || route.toToken
          )
          const token = (await useERC20(route.toToken, false)).connect(
            makerWalletSigner
          )
          await token.approve(route.routerAddress, MAX_UINT256)
          const order = buildOrder(
            makerWalletAddress,
            route.toToken,
            route.fromToken,
            '1000000000000000000',
            '1000000000000000000'
          )
          // let lop = await ethers.getSigner(DEX.LIMIT_ORDER)
          const data = buildOrderData(chainId, route.routerAddress, order)
          const signature = ethSigUtil.signTypedMessage(
            makerWallet.getPrivateKey(),
            { data }
          )
          const orderBytes = encodeOrderToHex({
            data: order,
            signature: signature,
          })
          params.routes[i].order = orderBytes
        }
      }
    })

    if (
      !compareAddress(params.srcTokenData.address, ETHER_ADDRESS) &&
      !compareAddress(params.dstTokenData.address, ETHER_ADDRESS)
    ) {
      // erc20 to erc20
      it('swap successfully', async () => {
        const amountIn = params.isAmountParsed
          ? BigNumber.from(params.amountIn.toString())
          : utils.parseUnits(
              params.amountIn.toString(),
              params.srcTokenData.decimals
            )
        const amountOutMin = params.isAmountParsed
          ? BigNumber.from(params.amountOutMin.toString())
          : utils.parseUnits(
              params.amountOutMin.toString(),
              params.dstTokenData.decimals
            )
        await srcToken.approve(arkenDex.address, MAX_UINT256)
        const beforeWhale = await dstToken.balanceOf(srcWalletAddress)
        const beforeSrcWhale = await srcToken.balanceOf(srcWalletAddress)
        let beforeFee
        if (params.isSourceFee) {
          beforeFee = await srcToken.balanceOf(feeWalletAddress)
        } else {
          beforeFee = await dstToken.balanceOf(feeWalletAddress)
        }
        const tx = await arkenDex.trade({
          amountIn: amountIn,
          amountOutMin: amountOutMin,
          srcToken: srcToken.address,
          dstToken: dstToken.address,
          to: srcWalletAddress,
          routes: params.routes,
          isSourceFee: params.isSourceFee,
          isRouterSource: params.isRouterSource,
        })
        expect(tx, 'should emit Swapped').to.emit(arkenDex, 'Swapped')
        await tx.wait()
        const afterWhale = await dstToken.balanceOf(srcWalletAddress)
        const whaleReceived = afterWhale.sub(beforeWhale)
        expect(
          whaleReceived,
          'should received at least amountOutMin'
        ).to.be.gte(amountOutMin)
        const afterSrcWhale = await srcToken.balanceOf(srcWalletAddress)
        const whalePaid = beforeSrcWhale.sub(afterSrcWhale)
        expect(whalePaid, 'should paid exactly amountIn').to.be.equal(amountIn)
        let afterFee
        if (params.isSourceFee) {
          afterFee = await srcToken.balanceOf(feeWalletAddress)
        } else {
          afterFee = await dstToken.balanceOf(feeWalletAddress)
        }
        const feeReceived = afterFee.sub(beforeFee)
        if (params.isSourceFee) {
          expect(feeReceived, 'should received fee').to.be.eq(
            amountIn.div(1000)
          )
        } else {
          const fullAmount = whaleReceived.add(feeReceived)
          expect(feeReceived, 'should received fee').to.be.eq(
            fullAmount.div(1000)
          )
        }
      })
    } else if (compareAddress(params.dstTokenData.address, ETHER_ADDRESS)) {
      // erc20 to ether
      it('swap successfully', async () => {
        const amountIn = params.isAmountParsed
          ? BigNumber.from(params.amountIn.toString())
          : utils.parseUnits(
              params.amountIn.toString(),
              params.srcTokenData.decimals
            )
        const amountOutMin = params.isAmountParsed
          ? BigNumber.from(params.amountOutMin.toString())
          : utils.parseUnits(
              params.amountOutMin.toString(),
              params.dstTokenData.decimals
            )
        await srcToken.approve(arkenDex.address, amountIn)
        let beforeFee
        if (params.isSourceFee) {
          beforeFee = await srcToken.balanceOf(feeWalletAddress)
        } else {
          beforeFee = await feeWallet.getBalance()
        }
        const beforeWhale = await srcWallet.getBalance()
        const beforeSrcWhale = await srcToken.balanceOf(srcWalletAddress)
        const tx = await arkenDex.trade({
          amountIn: amountIn,
          amountOutMin: amountOutMin,
          srcToken: srcToken.address,
          dstToken: ETHER_ADDRESS,
          to: srcWalletAddress,
          routes: params.routes,
          isSourceFee: params.isSourceFee,
          isRouterSource: params.isRouterSource,
        })
        expect(tx, 'should emit Swapped').to.emit(arkenDex, 'Swapped')
        if (!tx.gasPrice) {
          throw new Error('no tx gasPrice')
        }
        const gasUsed = (await tx.wait()).gasUsed.mul(tx.gasPrice)
        const afterWhale = await srcWallet.getBalance()
        const whaleReceived = afterWhale.sub(beforeWhale).add(gasUsed)
        expect(
          whaleReceived,
          'should received at least amountOutMin'
        ).to.be.gte(amountOutMin)
        const afterSrcWhale = await srcToken.balanceOf(srcWalletAddress)
        const whalePaid = beforeSrcWhale.sub(afterSrcWhale)
        expect(whalePaid, 'should paid exactly amountIn').to.be.equal(amountIn)
        let afterFee
        if (params.isSourceFee) {
          afterFee = await srcToken.balanceOf(feeWalletAddress)
        } else {
          afterFee = await feeWallet.getBalance()
        }
        const feeReceived = afterFee.sub(beforeFee)
        if (params.isSourceFee) {
          expect(feeReceived, 'should received fee').to.be.eq(
            amountIn.div(1000)
          )
        } else {
          const fullAmount = whaleReceived.add(feeReceived)
          expect(feeReceived, 'should received fee').to.be.eq(
            fullAmount.div(1000)
          )
        }
      })
    } else {
      // ether to erc20
      it('swap successfully', async () => {
        const amountIn = params.isAmountParsed
          ? BigNumber.from(params.amountIn.toString())
          : utils.parseUnits(
              params.amountIn.toString(),
              params.srcTokenData.decimals
            )
        const amountOutMin = params.isAmountParsed
          ? BigNumber.from(params.amountOutMin.toString())
          : utils.parseUnits(
              params.amountOutMin.toString(),
              params.dstTokenData.decimals
            )
        let beforeFee
        if (params.isSourceFee) {
          beforeFee = await feeWallet.getBalance()
        } else {
          beforeFee = await dstToken.balanceOf(feeWalletAddress)
        }
        const beforeWhale = await dstToken.balanceOf(srcWalletAddress)
        const beforeSrcWhale = await srcWallet.getBalance()
        const tx = await arkenDex.trade(
          {
            amountIn: amountIn,
            amountOutMin: amountOutMin,
            srcToken: ETHER_ADDRESS,
            dstToken: dstToken.address,
            to: srcWalletAddress,
            routes: params.routes,
            isSourceFee: params.isSourceFee,
            isRouterSource: params.isRouterSource,
          },
          {
            value: amountIn,
          }
        )
        expect(tx, 'should emit Swapped').to.emit(arkenDex, 'Swapped')
        await tx.wait()
        if (!tx.gasPrice) {
          throw new Error('no tx gasPrice')
        }
        const gasUsed = (await tx.wait()).gasUsed.mul(tx.gasPrice)
        const afterWhale = await dstToken.balanceOf(srcWalletAddress)
        const whaleReceived = afterWhale.sub(beforeWhale)
        expect(
          whaleReceived,
          'should received at least amountOutMin'
        ).to.be.gte(amountOutMin)
        const afterSrcWhale = await srcWallet.getBalance()
        const whalePaid = beforeSrcWhale.sub(gasUsed).sub(afterSrcWhale)
        expect(whalePaid, 'should paid exactly amountIn').to.be.equal(amountIn)
        let afterFee
        if (params.isSourceFee) {
          afterFee = await feeWallet.getBalance()
        } else {
          afterFee = await dstToken.balanceOf(feeWalletAddress)
        }
        const feeReceived = afterFee.sub(beforeFee)
        if (params.isSourceFee) {
          expect(feeReceived, 'should received fee').to.be.eq(
            amountIn.div(1000)
          )
        } else {
          const fullAmount = whaleReceived.add(feeReceived)
          expect(feeReceived, 'should received fee').to.be.eq(
            fullAmount.div(1000)
          )
        }
      })
    }
  })
}
