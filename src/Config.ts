require('dotenv').config();

import bitcore from 'bitcore-lib-cash';
import { BigNumber } from 'bignumber.js';

export interface StampConfig {
    name: string,
    symbol: string,
    tokenId: string,
    decimals: number,
    rate: BigNumber
}

export interface SwapConfig {
    name: string,
    symbol: string,
    tokenId: string,
    decimals: number,
    buy: number,
    sell: number
}

export interface PostageConfig {
    memo: string,
    network: string,
    stampGenerationIntervalSeconds: number,
    privateKey: bitcore.PrivateKey
}

export interface PostageRateConfig {
    version: number,
    address: string,
    weight: number,
    transactionttl: number,
    stamps: StampConfig[]
}

export interface SwapRateConfig {
    version: number,
    address: string,
    unit: string,
    tokens: SwapConfig[]
}

export interface ServerConfig {
    server: {
        port: number,
        host: string,
        limitEvery: number,
        limitMaxReqs: number
    };

    bchd: {
        server: string;
    };

    postage: PostageConfig;
    postageRate: PostageRateConfig;
    swapRate: SwapRateConfig;
}

// this environment variable is not set to a default
if (process.env.PRIVATE_KEY === '') {
    throw new Error('must set PRIVATE_KEY environment variable');
}

const Config: ServerConfig = {
    server: {
        port: Number(process.env.PORT),
        host: process.env.SERVER_HOST,
        limitEvery: 15 * 60 * 1000,
        limitMaxReqs: 100,
    },
    bchd: {
        server: process.env.BCHD_SERVER,
    },
    postage: {
        privateKey: bitcore.PrivateKey.fromWIF(process.env.PRIVATE_KEY),
        network: process.env.NETWORK,
        memo: process.env.MEMO,
        stampGenerationIntervalSeconds: Number(process.env.STAMP_GENERATION_INTERVAL),
    },
    postageRate: {
        version: 1,
        address: process.env.ADDRESS,
        weight: 365,
        transactionttl: 30,
        stamps: [
            // Here you should enumerate all of the tokens you'd like to support
            // you can have the rate be updated regularly by using the priceFeeders config below
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
            {
                name: "dSLP",
                symbol: "dSLP",
                tokenId: "5aa6c9485f746cddfb222cba6e215ab2b2d1a02f3c2506774b570ed40c1206e8",
                decimals: 4,
                rate: new BigNumber(12500)
            },
            {
                name: "Blind Hackers Group",
                symbol: "BHACK",
                tokenId: "bc3ab6616aecd03ecbff478c882e05df043e8af959f3c3964c9c9d15ba7d55bd",
                decimals: 4,
                rate: new BigNumber(12500)
            },
            {
                name: "Mistcoin",
                symbol: "Mist",
                tokenId: "d6876f0fce603be43f15d34348bb1de1a8d688e1152596543da033a060cff798",
                decimals: 6,
                rate: new BigNumber(1250000)
            },
            {
                name: "MAZE-REBEL",
                symbol: "REBEL",
                tokenId: "4b42d3f9c9aa48b78efc1fc05d4c92314352409d387880e5803358522a33e968",
                decimals: 2,
                rate: new BigNumber(250)
            },
            {
                name: "MAZE-VANDALS",
                symbol: "VANDALS",
                tokenId: "30d05b44dc304db9cf56a6138c1dfdbb24f7c8d9e26c87a8079acc461e61b684",
                decimals: 2,
                rate: new BigNumber(250)
            },
            {
                name: "MAZE-CARTEL",
                symbol: "CARTEL",
                tokenId: "7b5d1aa0918d96540997db8313e3b06231bc6fd84a020c282f9c774c7729abf9",
                decimals: 2,
                rate: new BigNumber(250)
            }
        ]
    },
        swapRate: {
        version: 1,
        address: process.env.SWAP_ADDRESS,
        unit: "BCH",
        tokens: [
            {
                name: "MAZE",
                symbol: "MAZE",
                tokenId: "bb553ac2ac7af0fcd4f24f9dfacc7f925bfb1446c6e18c7966db95a8d50fb378",
                decimals: 6,
                buy: 0.00000150,
                sell: 0.00000350
            },
            {
                name: "dSLP",
                symbol: "dSLP",
                tokenId: "5aa6c9485f746cddfb222cba6e215ab2b2d1a02f3c2506774b570ed40c1206e8",
                decimals: 4,
                buy: 0.00000150,
                sell: 0.00000300
            },
            {
                name: "Blind Hackers Group",
                symbol: "BHACK",
                tokenId: "bc3ab6616aecd03ecbff478c882e05df043e8af959f3c3964c9c9d15ba7d55bd",
                decimals: 4,
                buy: 0.00000150,
                sell: 0.00000300
            },
            {
                name: "MAZE-REBEL",
                symbol: "REBEL",
                tokenId: "4b42d3f9c9aa48b78efc1fc05d4c92314352409d387880e5803358522a33e968",
                decimals: 2,
                buy: 0.00000150,
                sell: 0.00000250
            },
            {
                name: "MAZE-VANDALS",
                symbol: "VANDALS",
                tokenId: "30d05b44dc304db9cf56a6138c1dfdbb24f7c8d9e26c87a8079acc461e61b684",
                decimals: 2,
                buy: 0.00000150,
                sell: 0.00000250
            },
            {
                name: "MAZE-CARTEL",
                symbol: "CARTEL",
                tokenId: "7b5d1aa0918d96540997db8313e3b06231bc6fd84a020c282f9c774c7729abf9",
                decimals: 2,
                buy: 0.00000150,
                sell: 0.00000250
            },
            {
                name: "Mistcoin",
                symbol: "MIST",
                tokenId: "d6876f0fce603be43f15d34348bb1de1a8d688e1152596543da033a060cff798",
                decimals: 6,
                buy: 0.00000250,
                sell: 0.00000450
            }
        ]
    },
};

export { Config };