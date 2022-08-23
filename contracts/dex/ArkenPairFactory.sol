// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity =0.8.11;

import '@openzeppelin/contracts/access/Ownable.sol';
import './interfaces/IUniswapV2Factory.sol';
import './ArkenPair.sol';

contract ArkenPairFactory is Ownable, IUniswapV2Factory {
    address public override feeTo;
    address public override feeToSetter;

    mapping(address => mapping(address => address)) public override getPair;
    address[] public override allPairs;

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view override returns (uint256) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB)
        external
        override
        onlyOwner
        returns (address pair)
    {
        require(tokenA != tokenB, 'ArkenPairFactory: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);
        require(token0 != address(0), 'ArkenPairFactory: ZERO_ADDRESS');
        require(
            getPair[token0][token1] == address(0),
            'ArkenPairFactory: PAIR_EXISTS'
        ); // single check is sufficient

        pair = address(
            new ArkenPair{salt: keccak256(abi.encodePacked(token0, token1))}()
        );
        IUniswapV2Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external override {
        require(msg.sender == feeToSetter, 'ArkenPairFactory: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, 'ArkenPairFactory: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}