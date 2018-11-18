pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract OfferingBox is Ownable {
    event Donate(address indexed _from, address indexed _to, uint256 _value);
    
    modifier onlyShintoPriest() {
        require(isOwner());
        _;
    }

    function donate() public payable {
        emit Donate(msg.sender, address(this), msg.value);
    }
    
    function getBalanceContract() external constant returns(uint){
        return address(this).balance;
    }
    
    function withdraw(uint256 _amount) external onlyShintoPriest {
        require(_amount <= address(this).balance);

        msg.sender.transfer(_amount);
    }
}
