require('dotenv').config();

import { BigNumber } from 'bignumber.js';

// import CoinFlexFLEXApiWrapper from './TokenPriceFeeder/ApiWrapper/CoinflexFLEXApiWrapper'
// import BitcoinComSpiceApiWrapper from './TokenPriceFeeder/ApiWrapper/BitcoinComSpiceApiWrapper'
// import CoinexUSDTApiWrapper from './TokenPriceFeeder/ApiWrapper/CoinexUSDTApiWrapper'

export interface StampConfig {
    name: string;
    symbol: string;
    tokenId: string;
    decimals: number;
    rate: BigNumber;
}

export interface PostageConfig {
    mnemonic: string;
    memo: string;
    network: string;
    stampGenerationIntervalSeconds: number;
}

export interface PostageRateConfig {
    version: number;
    address: string;
    weight: number;
    transactionttl: number;
    stamps: StampConfig[];
};

export interface PriceFeederConfig {
    tokenId: string;
    feederClass: any; // TODO make better typed
    useInitialStampRateAsMin: boolean;
}

export interface ServerConfig {
    server: {
        port: number;
        host: string;
        limitEvery: number;
        limitMaxReqs: number;
    }

    bchd: {
        server: string;
    }

    postage: PostageConfig;
    postageRate: PostageRateConfig;
    priceFeeders: PriceFeederConfig[];
}

const Config: ServerConfig = {
    server: {
        port: Number(process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000),
        host: process.env.SERVER_HOST ? process.env.SERVER_HOST : '0.0.0.0',
        limitEvery: 15 * 60 * 1000,
        limitMaxReqs: 100,
    },
    bchd: {
        server: process.env.BCHD_SERVER,
    },
    postage: {
        mnemonic: process.env.MNEMONIC,
        network: process.env.NETWORK,
        memo: process.env.MEMO,
        stampGenerationIntervalSeconds: Number(process.env.STAMP_GENERATION_INTERVAL ? process.env.STAMP_GENERATION_INTERVAL : 600),
    },
    postageRate: {
        version: 1,
        address: process.env.ADDRESS,
        weight: 365,
        transactionttl: 30,
        stamps: [
            {
                name: "Spice",
                symbol: "SPICE",
                tokenId: "4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf",
                decimals: 8,
                rate: new BigNumber(10)
            }
        ]
    },
    priceFeeders: [
        /*
        // FLEX / coinflex.com
        {
            "tokenId": "fb1813fd1a53c1bed61f15c0479cc5315501e6da6a4d06da9d8122c1a4fabb6c",
            "feederClass": CoinFlexFLEXApiWrapper,
            "useInitialStampRateAsMin": true
        },
        */

        /*
        // SPICE / exchange.bitcoin.com
        {
            "tokenId": "4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf",
            "feederClass": BitcoinComSpiceApiWrapper,
            "useInitialStampRateAsMin": true
        }
        */

        /*
        // USDT / coinex.com
        {
            "tokenId": "9fc89d6b7d5be2eac0b3787c5b8236bca5de641b5bafafc8f450727b63615c11",
            "feederClass": CoinexUSDTApiWrapper,
            "useInitialStampRateAsMin": true
        }
        */

        /*
         * Add your own implementations here...
         */
    ],
};

export { Config };
