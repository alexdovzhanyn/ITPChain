const sha256 = require('js-sha256').sha256

class Block {

  /*
    idx: The index of the block (always 1 greater than the block before it)
    previous_hash: The hash of the block that is 1 index before this one in the chain
    transactions: An array of transactions that are getting validated in this block
    difficulty: The network difficulty at which we will be mining this block
    nonce: Random number which we will use in order to try and generate a matching hash
  */
  constructor(idx, previous_hash, transactions, difficulty) {
    this.idx = idx
    this.previous_hash = previous_hash
    this.transactions = transactions
    this.timestamp = new Date()
    this.nonce = 0
    this.difficulty = difficulty
  }


  mine(nonce = 0) {
    console.log(`Mining Block at index ${this.idx}...`)
    let potential_hash = sha256(this.idx + this.previous_hash + this.timestamp + nonce)

    while(!this.hash_beat_target(potential_hash)) {
      nonce++
      potential_hash = sha256(this.idx + this.previous_hash + this.timestamp + nonce)
    }

    console.log(`Found block hash: ${potential_hash}`)
    this.hash = potential_hash
    this.nonce = nonce
    return this
  }

  // Checks to see if the generated hash beat the current network target
  hash_beat_target(hash) {
    return parseInt(hash, 16) < this.calculate_target(this.difficulty)
  }

  // Uses the network difficulty to calculate the maximum value of a hash
  // that is valid. Any hash that represents a number lower than this target
  // is a valid hash.
  calculate_target() {
    return Math.pow(16, 64 - this.difficulty) - 1
  }
}

module.exports = Block
