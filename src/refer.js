import { ethers } from 'ethers';
import { request } from './request.js';
import { writeFileSync } from 'fs';
import 'dotenv/config'

const requestUrl = {
    login: '/accounts/metamask/login/',
    me: '/api/v1/users/me'
}

async function login(wallet) {

    const requestTokenBody = {
        account: wallet.address,
        invite_code: process.env.INVITE_CODE,
        process: 'token'
    }

    // get login token
    const { headers: tokenResHeaders, data: tokenData } = await request({
        url: requestUrl.login,
        method: 'post',
        data: requestTokenBody
    })
    const loginCookie = tokenResHeaders.get('set-cookie');
    const loginToken = await wallet.signMessage(tokenData.data);
    console.log("🐞 => login => loginToken:", loginToken);

    // verify login token
    const requestVerifyBody = {
        account: wallet.address,
        login_token: loginToken,
        invite_code: process.env.INVITE_CODE,
        process: 'verify'
    }

    const {
        // headers: verifyResHeaders,
        data: verifyData
    } = await request({
        url: requestUrl.login,
        method: 'post',
        data: requestVerifyBody,
        headers: {
            cookie: loginCookie
        }
    })
    const userHash = verifyData.data
    console.log("🐞 => login => verifyData:", verifyData);

    // requestConfig.headers['cookie'] = verifyResHeaders.get('set-cookie').map(it => it.replace("Secure", ""));
    // const { data: userData } = await axios.get(requestUrl.me, { ...requestConfig })

    return userHash
}

async function main() {
    console.log('🚀 refer start...')

    // generate eth wallets
    const walletCount = Number(process.env.REFER_COUNT);

    let rpcPool = [];

    for (let count = 1; count <= walletCount;) {
        // login with refer code
        try {
            const wallet = ethers.Wallet.createRandom();
            const userHash = await login(wallet);
            const ethRpcUrl = `https://eth1.lava.build/lava-referer-${userHash}/`
            rpcPool.push({
                address: wallet.address,
                privateKey: wallet.privateKey,
                userHash,
                rpc: {
                    'ETH': ethRpcUrl
                }
            })
            console.log(`refer count ${count++} success:`, wallet.address);
        } catch (err) {
            console.log(`🐞 => refer ${count}  error:`, err);
        }
    }

    // save wallet & rpc to `rpc.json` file
    const rpcPoolStr = JSON.stringify(rpcPool, null, 2)
    writeFileSync('./rpc.json', rpcPoolStr);
    console.log(`refer success, total ${count - 1} item.`)
}

main()