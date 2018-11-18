# OfferingBox
Ethereum smart contract with Google Home example.

### initial setup

require: [direnv](https://github.com/zimbatm/direnv)

```sh
$ cp .envrc.sample .envrc
```

set your environment variables.

```.envrc
# truffle
export HDWALLET_MNEMONIC=
export INFURA_URL=

# server
export INFURA_WS_URL=
export CONTRACT_ADDRESS=0x8c146b6fd93720ab090ba0cb065aaf23556e2098 # rinkeby example
export GOOGLE_HOME_API_URL=http://localhost:8091/google-home-notifier

# google_home
export GOOGLE_HOME_IP=
```

### contract setup

```sh
$ yarn install
$ yarn run truffle compile
```

### server setup

open another terminal tab.

```sh
$ cd server
$ yarn install
$ node index.js
```

the server watches contract events.

### client dapp setup

open another terminal tab.

```sh
$ cd client
$ yarn install
$ yarn run link-contracts
$ yarn run dev
```

the dapp launches at 3000 port. 

```sh
$ ngrok http 3000
```

access the application url by your dapp browser.
