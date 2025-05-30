# 明子越他大坝 - Mineflayer 聊天与战斗机器人 🤖⚔️

> 一个基于 [mineflayer](https://github.com/PrismarineJS/mineflayer) 构建的 Minecraft 1.20.4 聊天机器人，支持打招呼、查询时间、调整时间、随机攻击玩家、死亡嘲讽等趣味功能。  
> 作者：[@Vcats](https://github.com/your-github)

## 🌟 功能介绍

- 💬 **聊天交互**：可回应 “hello”、"time"、"help"、"about" 等关键词
- 🕒 **时间查询**：输出当前系统时间
- ☀️ **时间控制**：通过 “调整时间 day/night/noon/midnight” 控制游戏时间（需要权限）
- 🔪 **随机杀人**：发送“帮我杀人”命令，机器人将随机 TP 并攻击一名在线玩家
- 😈 **死亡嘲讽**：有玩家死亡时自动发送“菜就多练”等嘲讽语句

## 📦 安装依赖

确保你已安装 Node.js

```bash
npm install
````

## 🚀 启动方式

编辑 `index.js` 中的 bot 配置：

```js
const bot = mineflayer.createBot({
  host: '你的 Minecraft 服务器 IP',
  port: 25565, // 默认端口
  username: 'Bot用户名',
  version: '1.20.4',
  localAddress: '本地Radmin IP（可选）'
})
```

然后运行：

```bash
node index.js
```

## 🛠 项目结构

```
.
├── bot-v1.js        # 主程序，包含聊天监听与行为逻辑
└── package.json    # 依赖定义
```

## 🙏 致谢

本项目基于以下开源项目构建：

* [mineflayer](https://github.com/PrismarineJS/mineflayer) - Minecraft bot 框架
* [minecraft-protocol](https://github.com/PrismarineJS/node-minecraft-protocol) - 协议支持库



