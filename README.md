# SLP Post Office server by MAZE BCH SLP smart contract tokens

Supported tokens: MAZE, dSLP, BHACK, Mist, REBEL, VANDALS and CARTEL (https://mazepostage.herokuapp.com)

If you don`t have these tokens (to test Post Office - SLP postage protocol) you can [mine](https://github.com/mazetoken/mminer) or [mint/farm](https://github.com/mazetoken/slp-smart-contract-tokens) it

Postage api: https://mazepostage.herokuapp.com/postage

Swap rates api: https://mazepostage.herokuapp.com/swap (not tested yet)


## Setup (Post Office user)

If You used Electron Cash SLP wallet before (e.g. 3.6.6 version) - backup your wallets

Download and install [Electron Cash SLP wallet developer edition 3.6.7.-dev6](https://github.com/simpleledger/Electron-Cash-SLP/releases/download/3.6.7-dev6/Electron-Cash-SLP-3.6.7-dev6-setup.exe) which has Post Office enabled

On Windows go to Program Files(x86) folder - Electron Cash SLP - electroncash and open `servers_post_office.json` file in any editor (e.g. notepad). Add https://mazepostage.herokuapp.com under https://postoffice.fountainhead.cash. It should look like this:

```
[
    "https://postoffice.fountainhead.cash",
    "https://mazepostage.herokuapp.com"
]
```

Create a new wallet in ELectron Cash SLP 3.6.7-dev6. Do not send BCH to the wallet. Post Office works without BCH

In the wallet go to Tools - Network - Postage, check the box - Enable SLP Postage Protocol (you should see mazepostage server there - click on it ; if you click on fountainhead server you can send Spice and Honk token without BCH fee)

Choose one wallet address (e.g. at address index 0) and send supported SLP tokens to this address. Do not send BCH. Wait for at least 1 confirmation

Open https://mazepostage.herokuapp.com in a browser (applications on free Heroku plan sleep after 30 minutes, we might need to wake it up ;-)

You should be able to send supported tokens to any slp address without BCH fee, but you pay fee in token (e.g. you want to send MAZE you will have to pay 5 MAZE fee, because every transaction takes 4 stamps (4x546 satoshis - paid by Post Office server provider) - MAZE rate is 1.25 MAZE per stamp for now). You should see something like this:

```
BCH amount to be sent: 0.00001092 // this is locked in token you sent to the wallet_
Token amount to be send: 25 MAZE // you need 30 MAZE to send 25 MAZE_
Postage fee: 5 MAZE // the fee goes to Post Office server provider_
Payment sent.
MAZE SLP Post Office Payment
```

_*If you see any Post Office errors (e.g. "No post office supporting the token was found") try again in a minute or open https://mazepostage.herokuapp.com again in the browser and try to send token then. Report issues in [MAZE Telegram Group](https://t.me/mazeslptoken). Post Office is an experimental feature_


## Setup (Post Office provider) - if you want to create your own Post Office server

Create a new wallet in [Electron Cash SLP edition](https://github.com/simpleledger/Electron-Cash-SLP/releases/download/3.6.7-dev6/Electron-Cash-SLP-3.6.7-dev6-setup.exe), choose address (e.g. address at index 0), copy private key (WIF) and send BCH (e.g. 0.00050000) to that address (stamps will be created there later)

Download or clone this repository

Open the folder you have downloaded the wallet and edit:

- .env file (type/paste your wallets details - PRIVATE_KEY - the wallet you generate stamps and ADDRESS - the wallet address where you receive tokens as fee - better use different wallet than wallet your stamps were generated in),

- src/Config.ts (change token environment you want to use as stamp and set rate), e.g. change this:

```
postageRate: {
        version: 1,
        address: process.env.ADDRESS,
        weight: 365,
        transactionttl: 30,
        stamps: [
            // Here you should enumerate all of the tokens you'd like to support
            {
                name: "MAZE",
                symbol: "MAZE",
                tokenId: "bb553ac2ac7af0fcd4f24f9dfacc7f925bfb1446c6e18c7966db95a8d50fb378",
                decimals: 6,
                // cost per satoshi in slp base units
                // base units are the token prior to having decimals applied to it
                // maze has 6 decimals, so for each 1 maze there are 10^6 base units of maze
                rate: new BigNumber(1250000)
            },

```

- public/index.html (change website for you needs)

Open a command line (PowerShell or Linux terminal) and type:

`npm i`
`npm start`

Post Office stamps will be generated in the wallet which PRIVATE_KEY you used in .env file (you will see multiple BCH 546 sats in Electron Cash wallet - Coins tab)

You can run the server locally (http://localhost:3000) or deploy it e.g. on [Heroku](https://heroku.com)


_*This repository is for testing [postage protocol](https://slp.dev/specs/slp-postage-protocol/). It`s experimental. PriceFeeders are removed, npm packages are updated and other minor changes, swap rates are added (to work with slpswap-client - not testet yet). Use it at your own risk. You can read the tutorial below and try the original repository first_

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
