const Block = require('./block')
const Ledger = require('./ledger')
const fs = require('fs');

class Blockchain {
  constructor(initialDifficulty, chain, ledger) {
    this.ledger = ledger
    this.chain = chain

    // Check if our ledger already has a Genesis block. If not, add one.
    if (!chain[0]) {
      // The Genesis Block first block in the chain. This block is used to jumpstart the whole blockchain
      // and does not typically contain any real data.
      let genesisBlock = new Block(0, "", [], initialDifficulty)

      // Since the Genesis Block is the first block in the chain, it is not mined because
      // there will never be a previous_hash for this block. We can set this block's hash
      // to anything we wish.
      genesisBlock.hash = "GENESIS"

      this.addBlock(genesisBlock)
    }
  }

  run() {
    let previousBlock = this.chain[this.chain.length - 1]
    let newBlock = new Block(previousBlock.idx + 1, previousBlock.hash, [], previousBlock.difficulty).mine()
    console.log(newBlock)

    this.addBlock(newBlock)
  }

  addBlock(block) {
    this.ledger.addBlock(block)
    this.chain.push(block)
  }
}

module.exports = Blockchain
