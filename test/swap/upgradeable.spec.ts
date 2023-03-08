import { expect } from 'chai'
import hre from 'hardhat'

import { ArkenApprove, ArkenDexV3 } from '../../typechain'
import {
  ArkenDexConstructorParams,
  formatConstructorParams,
} from '../helpers/contracts'

export const testUpgradeable = (constructorParams: ArkenDexConstructorParams) =>
  describe('Upgradeable', () => {})
