var Web3 = require("web3");

var web3 = new Web3("http://127.0.0.1:7545");
var erc1155 = new web3.eth.Contract(
  [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_spender",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_oldValue",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "_approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_currentValue",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "string",
          name: "_uri",
          type: "string",
        },
        {
          internalType: "bool",
          name: "_isNF",
          type: "bool",
        },
      ],
      name: "create",
      outputs: [
        {
          internalType: "uint256",
          name: "_type",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "_to",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "_quantities",
          type: "uint256[]",
        },
      ],
      name: "mintFungible",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "_type",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "_to",
          type: "address[]",
        },
      ],
      name: "mintNonFungible",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "_ids",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "_values",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "safeBatchTransferFrom",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address payable",
          name: "_user",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      name: "sendETHtoUser",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "_approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "_ids",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "_values",
          type: "uint256[]",
        },
      ],
      name: "TransferBatch",
      type: "event",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "_spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_currentValue",
          type: "uint256",
        },
      ],
      name: "transferEthToContract",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      name: "TransferSingle",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "_value",
          type: "string",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "URI",
      type: "event",
    },
    {
      constant: false,
      inputs: [],
      name: "withdraw",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "_spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address[]",
          name: "_owners",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "_ids",
          type: "uint256[]",
        },
      ],
      name: "balanceOfBatch",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "_ids",
          type: "uint256[]",
        },
      ],
      name: "balanceOfBatchSingleOwner",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "creators",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
      ],
      name: "getEthBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getNonFungibleBaseType",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getNonFungibleIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "_operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "isFungible",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "isNonFungible",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "isNonFungibleBaseType",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "isNonFungibleItem",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "maxIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
      ],
      name: "ownedBy",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes4",
          name: "_interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
  "0xc44825892c219281a55d64fad30e0330ebaf9b72"
);

class CreateArgs {
  constructor(name, is_nf, quantity, img) {
    this.name = name;
    this.is_nf = is_nf;
    this.img = img;
    this.quantity = quantity;
  }
}

class HuDeX {
  constructor(dev_addr, dev_id, game_id) {
    this.devAddr = dev_addr;
    this.devId = dev_id;
    this.gameId = game_id;
  }

  getAccounts() {
    return web3.eth.getAccounts();
  }

  createAccount() {
    return new Promise((resolve, reject) => {
      resolve(web3.eth.accounts.create());
    });
  }

  balanceOf(usr_addr, tokenId) {
    return new Promise((resolve, reject) => {
      erc1155.methods
        .balanceOf(usr_addr, tokenId)
        .call({ from: this.devAddr })
        .then((bal) => {
          var res = {};
          res[tokenId] = parseInt(bal);
          resolve(res);
        });
    });
  }

  balanceOfBatch(usr_addr, tokenIds) {
    return new Promise((resolve, reject) => {
      erc1155.methods
        .balanceOfBatchSingleOwner(usr_addr, tokenIds)
        .call({ from: this.devAddr })
        .then((bals) => {
          var res = {};
          for (var i in tokenIds) {
            res[tokenIds[i]] = parseInt(bals[i]);
          }
          resolve(res);
        });
    });
  }

  createAndMint(createArgs) {
    return new Promise((resolve, reject) => {
      createArgs["game"] = this.gameId;
      createArgs["usr_addr"] = this.devAddr;

      erc1155.methods
        .create(JSON.stringify(createArgs), createArgs.is_nf)
        .send({ from: this.devAddr })
        .on("receipt", (receipt) => {
          var tokenId = receipt.events.URI.returnValues._id;
          if (createArgs.is_nf) {
            erc1155.methods
              .mintNonFungible(tokenId, [this.devAddr])
              .send({ from: this.devAddr, gas: 500000 })
              .on("receipt", (receipt) => {
                resolve({
                  tokenId: receipt.events.TransferSingle.returnValues._id,
                  mint: true,
                });
              })
              .on("error", (error) => {
                resolve({ mint: false });
              });
          } else {
            erc1155.methods
              .mintFungible(tokenId, [this.devAddr], [createArgs.quantity])
              .send({ from: this.devAddr, gas: 500000 })
              .on("receipt", (receipt) => {
                resolve({ tokenId: tokenId, mint: true });
              })
              .on("error", (error) => {
                resolve({ mint: false });
              });
          }
        })
        .on("error", () => {
          reject("Error");
        });
    });
  }

  mint(tokenId, quantity) {
    return new Promise((resolve, reject) => {
      erc1155.methods
        .mintFungible(tokenId, [this.devAddr], [quantity])
        .send({ from: this.devAddr })
        .on("receipt", (receipt) => {
          resolve({ tokenId: tokenId, mint: true });
        })
        .on("error", (error) => {
          resolve({ mint: false });
        });
    });
  }

  transfer(senderAddr, toAddr, tokenId, quantity) {
    return new Promise((resolve, reject) => {
      erc1155.methods
        .safeTransferFrom(senderAddr, toAddr, tokenId, quantity, "0x01")
        .send({ from: senderAddr, gas: 500000 })
        .on("receipt", (receipt) => {
          resolve({ transfer: true });
        })
        .on("error", (error) => {
          resolve({ transfer: false });
        });
    });
  }

  burn(senderAddr, tokenId, quantity) {
    return this.transfer(senderAddr, "0x0", tokenId, quantity);
  }

  ownerOf(tokenId) {
    return new Promise((resolve, reject) => {
      erc1155.methods
        .ownerOf(tokenId)
        .call()
        .then((addr) => {
          resolve(addr);
        });
    });
  }

  ownedBy(addr) {
    return new Promise((resolve, reject) => {
      erc1155.methods
        .ownedBy(addr)
        .call()
        .then((tokenids) => {
          resolve(tokenids);
        });
    });
  }
}

module.exports = {
  HuDeX,
  CreateArgs,
};
