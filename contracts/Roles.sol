// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

// Importing to other contracts using library keyword
library Roles {
    struct Role{
        mapping(address => bool) bearer;
    }

    function add(Role storage role, address account) internal {
        require(!has(role, account), "Roles: already defined role");
        role.bearer[account] = true;
    }

    function remove(Role storage role, address account) internal {
        require(has(role, account), "Roles: account does not have role");
        role.bearer[account] = false;
    }

    function has(Role storage role, address account) internal view returns (bool){
        require(account != address(0), "Roles: account is the zero address");
        return role.bearer[account];
    }

    modifier onlyRole(Role storage role) {
        require(has(role, msg.sender), "Roles: caller does not have the role");
        _;
    }
}


