import { JsonRpcProvider } from 'ethers';
import { readFile } from 'fs/promises'

async function loadJson(filePath) {
    try {
        const data = await readFile(filePath, { encoding: 'utf8' });
        return JSON.parse(data);
    } catch (error) {
        console.log("🐞 => loadJson => error:", error);
        return null;
    }
}

async function run() {

    console.log('load json file...');

    const rpcJson = await loadJson('./rpc.json');
    const rpcArray = rpcJson.map(it => it.rpc['ETH']);

    console.log('🚀 run start ...');

    let count = 1;
    let balance = '';

    while (true) {
        try {
            const rpcUrl = rpcArray[Math.floor(Math.random() * rpcArray.length)];
            const provider = new JsonRpcProvider(rpcUrl);

            const block = await provider.getBlock();
            const transactions = await Promise.all(block.transactions.map(async txHash => await provider.getTransaction(txHash)));

            for (let tx of transactions) {
                const { from = '0x0000000000000000000000000000000000000000', to = '0x0000000000000000000000000000000000000000' } = tx;
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
