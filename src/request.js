import { getProxyAgent } from "./helper.js";
import fakeUa from "fake-useragent";
import axios from "axios";
import 'dotenv/config'

const TIMEOUT = 30 * 1000;

const proxyAgent = getProxyAgent(TIMEOUT);

export const request = axios.create({
    baseURL: "https://points-api.lavanet.xyz/", timeout: TIMEOUT
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