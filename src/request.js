import axios from "axios";
import fakeUa from "fake-useragent";
import { HttpsProxyAgent } from 'https-proxy-agent'
import 'dotenv/config'

const proxyAgent = new HttpsProxyAgent(process.env.PROXY);

export const request = axios.create({
    baseURL: "https://points-api.lavanet.xyz/",
    timeout: 1000 * 30,
});

request.interceptors.request.use((config) => {
    config.headers = {
        'authority': 'points-api.lavanet.xyz',
        'accept': 'application/json',
        'content-type': 'application/json',
        'origin': 'https://points.lavanet.xyz',
        'referer': 'https://points.lavanet.xyz/',
        'sec-ch-ua-platform': '"Windows"',
        'x-lang': 'english',
        'user-agent': fakeUa(),
        ...config.headers
    }

    config.httpAgent = proxyAgent;
    config.httpsAgent = proxyAgent;
    config.withCredentials = true;

    return config;
});

request.interceptors.response.use((res) => {
    return res;
});
