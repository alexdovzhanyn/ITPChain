const Blockchain = require('./src/blockchain')
const Ledger = require('./src/ledger')

let ledger = new Ledger()

ledger.getAllBlocks().then(async chain => {
  let itpChain = await new Blockchain(5.0, chain, ledger)

  while(true) {
    itpChain.run()
  }
})
