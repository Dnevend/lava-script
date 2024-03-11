import { JsonRpcProvider, FetchRequest, ZeroAddress } from 'ethers';
import { getProxyAgent, loadFile } from './helper.js';

const proxyAgent = getProxyAgent(10 * 1000);

async function run() {

    console.log('load json file...');
    const rpcFileContent = await loadFile('./rpc.json');

    const rpcJson = JSON.parse(rpcFileContent) || [];

    const rpcUrls = rpcJson.map(it => it.rpc['ETH']);

    console.log('🚀 run start ...');

    let count = 1;
    let balance = '';

    while (true) {
        try {

            let provider = null;

            const rpcUrl = rpcUrls[Math.floor(Math.random() * rpcUrls.length)];

            if (proxyAgent) {
                const fetchReq = new FetchRequest(rpcUrl);
                fetchReq.getUrlFunc = FetchRequest.createGetUrlFunc({ agent: proxyAgent });
                provider = new JsonRpcProvider(fetchReq);
            } else {
                provider = new JsonRpcProvider(rpcUrl);
            }

            const block = await provider.getBlock();
            const transactions = await Promise.all(block.transactions.map(async txHash => await provider.getTransaction(txHash)));

            for (let tx of transactions) {
                const { from = ZeroAddress, to = ZeroAddress } = tx;
                balance = await provider.getBalance(from);
                console.log(`${count++} ${from} balance: ${balance}`);

                balance = await provider.getBalance(to);
                console.log(`${count++} ${to} balance: ${balance}`);

                await new Promise(resolve => setTimeout(resolve, 500));
            }

            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
            console.log("🐞 => error:", err);
        }
    }
}

run()
