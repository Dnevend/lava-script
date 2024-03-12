import { HttpsProxyAgent } from 'https-proxy-agent';
import { readFile } from 'fs/promises'
import { HDNodeWallet } from 'ethers';
import 'dotenv/config'

export const getProxyAgent = (timeout = 1000) => {
    let proxyAgent = null;

    const proxyUrl = process.env.PROXY;

    if (proxyUrl && proxyUrl !== 'Your Proxy') {
        console.log("🐞 => initProxyAgent => proxyUrl:", proxyUrl);

        proxyAgent = new HttpsProxyAgent(process.env.PROXY, {
            timeout,
            keepAlive: true,
            keepAliveMsecs: timeout
        });
    }

    return proxyAgent
}

export const loadFile = async (filePath) => {
    try {
        const data = await readFile(filePath, { encoding: 'utf8' });
        return data
    } catch (error) {
        console.log("🐞 => loadFile => error:", error);
        return null;
    }
}

export const generatePrivateKeys = (phrase, count = 1) => {
    const prePath = "m/44'/60'/0'/0/";

    const privateKeys = [];

    for (let i = 0; i < count; i++) {
        let path = `${prePath}${i}`;

        let wallet = HDNodeWallet.fromPhrase(phrase, null, path);

        privateKeys.push(wallet.privateKey)
    }

    return privateKeys;
}

export const sleep = (millisecond = 1000) => new Promise(resolve => setTimeout(resolve, millisecond))