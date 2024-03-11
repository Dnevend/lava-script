# lava-script

## 介绍

[Lava 官网](https://points.lavanet.xyz/)

[如何工作？](https://www.lavanet.xyz/blog/introducing-magma-points?utm_source=dashboard&utm_medium=referral&utm_campaign=magma)

- 用户可以通过推荐赚取积分。您将获得您推荐的用户获得的所有积分的 10%。这不会从他们的积分中扣除;

- 通过 Lava 网络生成的 RPC 地址，在链上进行交互（查询余额，发送交易...）赚取 Lava 积分;

[Refer 脚本](./src/refer.js) 通过配置参数中的邀请码，生成新的账号地址，获取地址对应的 RPC 地址，并保存至`rpc.json`文件；

[Rpc 脚本]('./src/index.js') 根据生成的 RPC 地址，随机请求链上数据，获取积分。

## 安装

## 环境要求

```
node version >= 16
```

## 指定命令

```shell
npm install
```

## 配置

1. 将`.env_example`文件重命名为`.env`

2. 将`.env`文件内容替换为你需要的参数

```shell
# 邀请数量（生成地址数量）
REFER_COUNT="100"
# 邀请码
INVITE_CODE="MMEMS"
# 代理地址（可选）
PROXY="Your Proxy"
```

## 运行

### 生成邀请账号脚本

```shell
npm run refer
```

### RPC 调用脚本

```
npm run start
```
