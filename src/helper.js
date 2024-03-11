import { HttpsProxyAgent } from 'https-proxy-agent';
import { readFile } from 'fs/promises'
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
