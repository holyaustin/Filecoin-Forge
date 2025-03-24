// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

import { AxelarExecutable } from './Axelar/AxelarExecutable.sol';
import { IAxelarGasService } from './Axelar/interfaces/IAxelarGasService.sol' ;

contract PolygonIdVerifcationRouter is AxelarExecutable{
    
    IAxelarGasService public immutable gasService;
    address gateway_ = 0xe432150cce91c13a887f7D836923d5597adD8E31;
    address gasReceiver_ = 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6;
    string fevmChain = "filecoin";
    string destinationContractAddress;

    struct _message{
        address _contract;
        uint8 _score;
    }

    constructor(string memory _contract) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);
        destinationContractAddress = _contract;
    }

    function KYContractToFevm(address _contract, uint8 _score)external payable{
        bytes memory message = abi.encode(_message(_contract,_score));
        gasService.payNativeGasForContractCall(address(this), fevmChain, destinationContractAddress, message, msg.sender);
        gateway.callContract(fevmChain, destinationContractAddress, message);
    }
    
}