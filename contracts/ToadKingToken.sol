pragma solidity ^0.8.13;

import ".././node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import ".././node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract ToadKingToken is ERC20, Ownable {
    constructor() ERC20("ToadKingToken", "TKT") {  
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
