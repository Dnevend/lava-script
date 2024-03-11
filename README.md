# lava-script

## 介绍

[Lava Website](https://points.lavanet.xyz/)

[如何工作？](https://www.lavanet.xyz/blog/introducing-magma-points?utm_source=dashboard&utm_medium=referral&utm_campaign=magma)

通过 Lava 网络生成的 RPC 地址，在链上进行交互（查询余额，发送交易...）赚取 Lava 积分。

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
