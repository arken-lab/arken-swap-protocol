import { testOnly } from '../../helpers/scope'
import { testOwnable } from '../ownable.spec'
import { CONSTRUCTOR_PARAMS } from './constants'

testOnly('bsc', 'swap', () =>
  describe('Swap (ownable)', () => testOwnable(CONSTRUCTOR_PARAMS))
)
