# lava-script

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
