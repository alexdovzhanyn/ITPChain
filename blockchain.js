const Block = require('./block')

class Blockchain {
  constructor(initialDifficulty) {
    // The Genesis Block first block in the chain. This block is used to jumpstart the whole blockchain
    // and does not typically contain any real data.
    let genesisBlock = new Block(0, "", [], initialDifficulty)

    // Since the Genesis Block is the first block in the chain, it is not mined because
    // there will never be a previous_hash for this block. We can set this block's hash
    // to anything we wish.
    genesisBlock.hash = "This is the genesis hash"
    this.chain = [genesisBlock] // Initialize the blockchain as an array with only the Genesis Block in it (at index 0)
  }

  run() {
    let previousBlock = this.chain[this.chain.length - 1]
    let newBlock = new Block(previousBlock.idx + 1, previousBlock.hash, [], previousBlock.difficulty).mine()
    console.log(newBlock)

    this.chain.push(newBlock)
  }
}

module.exports = Blockchain
