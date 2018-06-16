const Blockchain = require('./blockchain')

let itpChain = new Blockchain(5.0)

while(true) {
  itpChain.run()
}
