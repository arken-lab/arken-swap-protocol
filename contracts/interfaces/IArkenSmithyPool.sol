// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface IArkenSmithyPool {
    function handleArkenPerBlockChange(
        uint256 prevArkenPerBlock,
        uint256 newArkenPerBlock
    ) external;
}
