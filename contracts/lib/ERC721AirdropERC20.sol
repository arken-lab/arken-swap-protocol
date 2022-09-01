// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';

abstract contract ERC721AirdropERC20 is ERC721Enumerable, EIP712 {
    using SafeERC20 for IERC20;

    IERC20 public claimableToken;
    mapping(uint256 => uint256) private _claimableAmounts;
    mapping(uint256 => bool) private _claimables;

    constructor(
        address token_,
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) EIP712(name_, '1.0.0') {
        claimableToken = IERC20(token_);
    }

    function _claim(uint256 tokenId) internal virtual returns (uint256) {
        _setClaimable(tokenId, false);
        uint256 amount = _claimableAmounts[tokenId];
        _transferToken(msg.sender, amount);
        return amount;
    }

    function _claimMultiple(uint256[] memory tokenIds)
        internal
        virtual
        returns (uint256)
    {
        uint256 amount = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            _setClaimable(tokenId, false);
            amount += _claimableAmounts[tokenId];
        }
        _transferToken(msg.sender, amount);
        return amount;
    }

    function _transferToken(address to, uint256 amount) internal virtual {
        require(
            claimableToken.balanceOf(address(this)) >= amount,
            'ERC721AirdropERC20: NOT_ENOUGH_TOKEN'
        );
        claimableToken.transfer(to, amount);
    }

    function getClaimableAmount(uint256 tokenId)
        public
        view
        virtual
        returns (uint256)
    {
        require(
            _exists(tokenId),
            'ERC721AirdropERC20: CLAIMABLE_AMOUNT_GET_NONEXISTENT'
        );
        return _claimableAmounts[tokenId];
    }

    function getClaimable(uint256 tokenId) public view virtual returns (bool) {
        require(
            _exists(tokenId),
            'ERC721AirdropERC20: CLAIMABLE_GET_NONEXISTENT'
        );
        return _claimables[tokenId];
    }

    function _setClaimableAmount(uint256 tokenId, uint256 amount)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            'ERC721AirdropERC20: CLAIMABLE_AMOUNT_SET_NONEXISTENT'
        );
        _claimableAmounts[tokenId] = amount;
    }

    function _setClaimable(uint256 tokenId, bool claimed) internal virtual {
        require(
            _exists(tokenId),
            'ERC721AirdropERC20: CLAIMABLE_SET_NONEXISTENT'
        );
        _claimables[tokenId] = claimed;
    }
}
