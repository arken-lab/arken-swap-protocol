// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

import '../interfaces/IArkenDexV3.sol';

abstract contract ArkenSwapper is Ownable {
    using SafeERC20 for IERC20;

    uint256 constant MAX_UINT_256 = 2**256 - 1;
    address public constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    address public swap;
    address public swapApprove;

    constructor(address _swap, address _swapApprove) {
        swap = _swap;
        swapApprove = _swapApprove;
    }

    function updateSwap(address _swap, address _swapApprove)
        external
        onlyOwner
    {
        swap = _swap;
        swapApprove = _swapApprove;
    }

    function _swapArkenDex(IArkenDexV3.TradeDescription memory desc) internal {
        if (desc.srcToken == ETH) {
            IArkenDexV3(swap).trade{value: desc.amountIn}(desc);
        } else {
            IERC20(desc.srcToken).transferFrom(
                msg.sender,
                address(this),
                desc.amountIn
            );
            _increaseAllowanceArkenDex(desc.srcToken, desc.amountIn);
            desc.amountIn = IERC20(desc.srcToken).balanceOf(address(this));
            IArkenDexV3(swap).trade(desc);
        }
    }

    function _increaseAllowanceArkenDex(address token, uint256 amount)
        internal
    {
        if (token == ETH) return;
        uint256 allowance = IERC20(token).allowance(address(this), swapApprove);
        if (allowance < amount) {
            IERC20(token).safeIncreaseAllowance(
                swapApprove,
                MAX_UINT_256 - allowance
            );
        }
    }
}
