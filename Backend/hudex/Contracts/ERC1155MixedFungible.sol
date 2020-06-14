pragma solidity ^0.5.0;

import "./ERC1155.sol";


/**
    @dev Extension to ERC1155 for Mixed Fungible and Non-Fungible Items support
    The main benefit is sharing of common type information, just like you do when
    creating a fungible id.
*/
contract ERC1155MixedFungible is ERC1155 {
    // Use a split bit implementation.
    // Store the type in the upper 128 bits..
    uint256 constant TYPE_MASK = uint256(uint128(~0)) << 128;

    // ..and the non-fungible index in the lower 128
    uint256 constant NF_INDEX_MASK = uint128(~0);

    // The top bit is a flag to tell if this is a NFI.
    uint256 constant TYPE_NF_BIT = 1 << 255;

    // id => address
    mapping(uint256 => address) nfOwners;

    // Only to make code clearer. Should not be functions
    function isNonFungible(uint256 _id) public pure returns (bool) {
        return _id & TYPE_NF_BIT == TYPE_NF_BIT;
    }

    function isFungible(uint256 _id) public pure returns (bool) {
        return _id & TYPE_NF_BIT == 0;
    }

    function getNonFungibleIndex(uint256 _id) public pure returns (uint256) {
        return _id & NF_INDEX_MASK;
    }

    function getNonFungibleBaseType(uint256 _id) public pure returns (uint256) {
        return _id & TYPE_MASK;
    }

    function isNonFungibleBaseType(uint256 _id) public pure returns (bool) {
        // A base type has the NF bit but does not have an index.
        return (_id & TYPE_NF_BIT == TYPE_NF_BIT) && (_id & NF_INDEX_MASK == 0);
    }

    function isNonFungibleItem(uint256 _id) public pure returns (bool) {
        // A base type has the NF bit but does has an index.
        return (_id & TYPE_NF_BIT == TYPE_NF_BIT) && (_id & NF_INDEX_MASK != 0);
    }

    function ownerOf(uint256 _id) public view returns (address) {
        return nfOwners[_id];
    }

    function ownedBy(address _owner) public view returns (uint256[] memory) {
        return ownedTokens[_owner];
    }

    function addTokenToOwner(address _to, uint256 _id) internal {
        ownedTokens[_to].push(_id);
        tokenToOwnerIndex[_id][_to] = ownedTokens[_to].length - 1;
    }

    function removeTokenFromOwner(address _from, uint256 _id) internal {
        uint256 lastTokenIndex = ownedTokens[_from].length - 1;
        uint256 tokenToRemoveIndex = tokenToOwnerIndex[_id][_from];

        if (lastTokenIndex != tokenToRemoveIndex) {
            uint256 lastToken = ownedTokens[_from][lastTokenIndex];
            ownedTokens[_from][tokenToRemoveIndex] = lastToken;
            tokenToOwnerIndex[lastToken][_from] = tokenToRemoveIndex;
        }

        ownedTokens[_from].pop();
    }

    function transferHelper(
        address _from,
        address _to,
        uint256 _id,
        uint256 _value
    ) internal {
        if (isNonFungible(_id)) {
            require(nfOwners[_id] == _from);
            nfOwners[_id] = _to;

            addTokenToOwner(_to, _id);
            removeTokenFromOwner(_from, _id);

            // You could keep balance of NF type in base type id like so:
            // uint256 baseType = getNonFungibleBaseType(_id);
            // balances[baseType][_from] = balances[baseType][_from].sub(_value);
            // balances[baseType][_to]   = balances[baseType][_to].add(_value);
        } else {
            if (balances[_id][_to] == 0) {
                addTokenToOwner(_to, _id);
            }

            balances[_id][_from] = balances[_id][_from].sub(_value);
            if (_id == 1) {
                balances[0][_to] = balances[0][_to].add(_value);
            } else {
                balances[_id][_to] = balances[_id][_to].add(_value);
            }

            if (balances[_id][_from] == 0) {
                removeTokenFromOwner(_from, _id);
            }
        }
        emit TransferSingle(msg.sender, _from, _to, _id, _value);
    }

    // override
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external {
        if (
            _from == msg.sender || operatorApproval[_from][msg.sender] == true
        ) {
            transferHelper(_from, _to, _id, _value);
            if (_to.isContract()) {
                _doSafeTransferAcceptanceCheck(
                    msg.sender,
                    _from,
                    _to,
                    _id,
                    _value,
                    _data
                );
            }
        } else {
            require(
                allowances[_from][msg.sender][_id] >= _value,
                "allowance must be bigger than or equal to the value"
            );
            allowances[_from][msg.sender][_id] = allowances[_from][msg
                .sender][_id]
                .sub(_value);
            transferHelper(_from, _to, _id, _value);
            if (_to.isContract()) {
                _doSafeTransferAcceptanceCheck(
                    msg.sender,
                    _from,
                    _to,
                    _id,
                    _value,
                    _data
                );
            }
        }
    }

    // override
    function safeBatchTransferFrom(
        address _from,
        address _to,
        uint256[] calldata _ids,
        uint256[] calldata _values,
        bytes calldata _data
    ) external {
        require(_ids.length == _values.length, "Array length must match");

        // Only supporting a global operator approval allows us to do only 1 check and not to touch storage to handle allowances.
        require(
            _from == msg.sender || operatorApproval[_from][msg.sender] == true,
            "Need operator approval for 3rd party transfers."
        );

        for (uint256 i = 0; i < _ids.length; ++i) {
            // Cache value to local variable to reduce read costs.
            uint256 id = _ids[i];
            uint256 value = _values[i];

            if (isNonFungible(id)) {
                require(nfOwners[id] == _from);
                nfOwners[id] = _to;
            } else {
                balances[id][_from] = balances[id][_from].sub(value);
                balances[id][_to] = value.add(balances[id][_to]);
            }
        }

        emit TransferBatch(msg.sender, _from, _to, _ids, _values);

        if (_to.isContract()) {
            _doSafeBatchTransferAcceptanceCheck(
                msg.sender,
                _from,
                _to,
                _ids,
                _values,
                _data
            );
        }
    }

    function balanceOf(address _owner, uint256 _id)
        external
        view
        returns (uint256)
    {
        if (isNonFungibleItem(_id)) return nfOwners[_id] == _owner ? 1 : 0;
        return balances[_id][_owner];
    }

    function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids)
        external
        view
        returns (uint256[] memory)
    {
        require(_owners.length == _ids.length);

        uint256[] memory balances_ = new uint256[](_owners.length);

        for (uint256 i = 0; i < _owners.length; ++i) {
            uint256 id = _ids[i];
            if (isNonFungibleItem(id)) {
                balances_[i] = nfOwners[id] == _owners[i] ? 1 : 0;
            } else {
                balances_[i] = balances[id][_owners[i]];
            }
        }

        return balances_;
    }

    function balanceOfBatchSingleOwner(address _owner, uint256[] calldata _ids)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory balances_ = new uint256[](_ids.length);

        for (uint256 i = 0; i < _ids.length; ++i) {
            uint256 id = _ids[i];
            if (isNonFungibleItem(id)) {
                balances_[i] = nfOwners[id] == _owner ? 1 : 0;
            } else {
                balances_[i] = balances[id][_owner];
            }
        }

        return balances_;
    }
}
