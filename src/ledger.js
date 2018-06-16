const leveldb = require('level')

class Ledger {
  constructor() {
    // This will create or open the underlying LevelDB store.
    this.db = leveldb('./.ledger.dat')
  }

  async addBlock(block) {
    // Store the block in LevelDB, using the block hash as the index in the DB so that
    // we can ensure a unique index for each block
    let encodedBlock = JSON.stringify(block)
    return await this.db.put(block.hash, encodedBlock)
  }

  async getBlock(hash) {
    return await this.db.get(hash)
  }

  getAllBlocks() {
    return new Promise((res, rej) => {
      let stream = this.db.createReadStream({reverse: true})
      let blocks = []

      stream.on('data', data => {
        blocks.push(JSON.parse(data.value))
      })
      .on('end', () => {
        res(blocks.sort((a, b) => a.idx - b.idx))
      })
    })
  }
}

module.exports = Ledger
