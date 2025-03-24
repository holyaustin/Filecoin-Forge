// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

import { AxelarExecutable } from './Axelar/AxelarExecutable.sol';

contract KYContract is AxelarExecutable {

    uint256 index;
    address public fEVMGateway = 0xe432150cce91c13a887f7D836923d5597adD8E31;
    address public fEVM;
    
    event ContractScoreAdded(address indexed contractAddr, uint256 score);

    struct Message{
        address _contract;
        uint8 _score;
    }

    constructor() AxelarExecutable(fEVMGateway){}

    mapping(address => uint8) public contractsScoreMapping;
    address[] public kycontracts;

    function addContract(address _contractAddr, uint8 score)internal {
        contractsScoreMapping[_contractAddr] = score;
        kycontracts.push(_contractAddr);
        emit ContractScoreAdded(_contractAddr, score);
    }

    function isContractKyc(address _contract)external view returns(bool _kyc){
        _kyc = contractsScoreMapping[_contract] != 0;
    }

    function getKYContracts()external view returns(address[] memory){
        return kycontracts;
    }

    function _execute(
    string calldata sourceChain,
    string calldata sourceAddress,
    bytes calldata payload
    ) internal override {
    
    Message memory _message = abi.decode(payload, (Message));
    contractsScoreMapping[_message._contract] = _message._score;

    }

}