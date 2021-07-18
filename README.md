# MAZE BCH SLP smart contract tokens - SLP Post Office Server

prepared for MAZE, dSLP, BHACK, REBEL, VANDALS and CARTEL (https://mazetoken.github.io)

priceFeeders are removed, npm packages are updated and other minor changes

## Setup

Create a new wallet in [Electron Cash SLP edition](https://github.com/simpleledger/Electron-Cash-SLP/releases/tag/3.6.6), choose address (e.g. address index 0), send BCH (e.g. 0.00050000) to the address

Download or clone this repository

Edit:

- .env file (type/paste your wallet address PRIVATE_KEY (WIF)- e.g. address index 0 and slp ADDRESS- e.g. address index 1),

- src/Config.ts (change tokens you want to use as stamps and set rates),

- public/index.html (your tokens)

Open a command line (PowerShell or Linux terminal) and type:

`npm i`
`npm start`

Post-Office stamps will be generated

You can run it locally (http://localhost:3000) or deploy it e.g. on [Heroku](https://heroku.com) - like this: https://mazepostage.herokuapp.com

This repository is for postage protocol testing. Use it at your own risk. You can read the tutorial below and try the original repository first

"As the Post Office is still new there is not wallet support for it yet. If you are a developer and would like to test or inspect the fork of Electron Cash SLP with the Post Office you can find the link below.

- [Electron Cash SLP](https://github.com/OPReturnCode/Electron-Cash-SLP/commits/post-office) (Development)"

------------------------

# SLP Post Office Server

An implementation of the Simple Ledger Postage Protocol

## Introduction

It is a server that accepts modified [Simple Ledger Payment Protocol](https://github.com/simpleledger/slp-specifications/blob/master/slp-payment-protocol.md) transactions, adds _stamps_ (inputs) to it to cover the
fee costs, broadcasts the transaction and optionally takes SLP payments for the _postage_.

It enables all sorts of applications where the user can have only SLP tokens in their wallet and send transactions without the need for BCH as "gas", with the Post Office covering the costs of the transaction.

### Current Status

Right now the master branch contains an alpha release. We encourage you to test with small amounts during integration into your own products and provide feedback.

**Use at your own risk, there are no guarantees**.

### More information about the protocol

- [Simple Ledger Postage Protocol Specification](https://slp.dev/specs/slp-postage-protocol/)
- [Medium article by the protocol creator, Vin Armani](https://medium.com/@vinarmani/simple-ledger-postage-protocol-enabling-a-true-slp-token-ecosystem-on-bitcoin-cash-f960a58c16c4)


## Setup

Install the required packages and start the server. [nvm](https://github.com/nvm-sh/nvm) is not strictly necessary although it makes it easier to use a compatible version of node.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
nvm install v14.13.1
nvm use v14.13.1
npm install -g yarn
git clone https://github.com/simpleledger/slp-post-office-server.git
cd slp-post-office-server
cp example.env .env
$(EDITOR) .env
$(EDITOR) src/Config.ts
yarn
yarn start
```

After this, it will start up and request for you to send some BCH to an address so that the server may generate stamps.

### Configuration

Open `./src/Config.ts` to list the stamps, priceFeeders, and other options you may want to override or change.

`Config.postageRate.stamps` describes the different tokens you will accept in your post office.

`Config.priceFeeders` describes custom price updating mechanisms. These are allowed to overlap in case of downtime of an exchange api.

You will also want to take a look at the example token price feeders in `./src/TokenPriceFeeder/ApiWrapper/` - we have examples for 3 different common price manipulations you may have to do for your token, as well as 3 different exchanges. If you have an example for another exchange please open a PR.


### Daemonizing the Server

#### PM2

You may want to use [PM2](https://pm2.keymetrics.io/) to daemonize the server.

```
pm2 start yarn --interpreter bash --name postoffice -- start
```

#### systemd

You can find an example systemd service file in `slp-post-office-server.service`

Edit this then copy it to /etc/systemd/system

Then run `systemctl daemon-reload` and `systemctl start slp-post-office-server`

## Wallet Support

As the Post Office is still new there is not wallet support for it yet. If you are a developer and would like to test or inspect the fork of Electron Cash SLP with the Post Office you can find the link below.

- [Electron Cash SLP](https://github.com/OPReturnCode/Electron-Cash-SLP/commits/post-office) (Development)

## Special Thanks

- bchinjim who funded the initial open source post office prototype

## License

MIT License
