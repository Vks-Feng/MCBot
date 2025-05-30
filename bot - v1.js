const mineflayer = require('mineflayer')


// 使用RadminLAN连接服务器，下文ip均为RadminLAN分配的ip
const bot = mineflayer.createBot({
  host: '此处填房主ip',
  port: 25565,
  username: 'MZYdeDABA',
  version: '1.20.4',
  localAddress: '此处填本地ip'
})

// 打招呼词库
const greetings = ['你好', '嗨', 'Hello', 'Hi', '哈喽']

// 玩家聊天监听
bot.on('chat', (username, message) => {
  if (username === bot.username) return // 忽略自己

  const msg = message.toLowerCase()

  // 打招呼
  if (greetings.some(word => msg.includes(word.toLowerCase()))) {
    bot.chat(`你好 ${username}，很高兴见到你！`)
  }

  // 时间查询
  else if (msg.includes('time') || msg.includes('时间')) {
    const time = new Date().toLocaleTimeString()
    bot.chat(`现在时间是: ${time}`)
  }

  // 帮助信息
  else if (msg === 'help' || msg === '帮助') {
    bot.chat('📘 我可以理解的指令有：hello, time, about, help, 杀人, 调整时间')
  }

  // 关于机器人
  else if (msg === 'about' || msg.includes('关于')) {
    bot.chat('🤖 我是聊天机器人“明子越他大坝”，由 Vcats 制作，当前版本 v1.1。支持聊天、攻击、查询时间、控制时间等功能。')
  }

  // 杀人指令（寻找最近的玩家并攻击）
  // 随机杀人指令
  else if (msg === '帮我杀人') {
    const playerList = Object.keys(bot.players).filter(name => name !== bot.username)
    
    if (playerList.length === 0) {
      bot.chat('⚠ 没有找到可攻击的在线玩家')
      return
    }

    const randomPlayer = playerList[Math.floor(Math.random() * playerList.length)]
    bot.chat(`🎯 抽取目标：${randomPlayer}，准备执行传送并攻击！`)

    // 先执行 tp，再执行攻击（延迟1秒等加载完成）
    bot.chat(`/tp ${bot.username} ${randomPlayer}`)
    setTimeout(() => {
      const targetEntity = bot.players[randomPlayer]?.entity
      if (targetEntity) {
        bot.chat(`🔪 开始攻击 ${randomPlayer}！`)
        bot.attack(targetEntity)
      } else {
        bot.chat(`⚠ 找不到 ${randomPlayer} 的实体，可能尚未加载`)
      }
    }, 1000)
  }

  // 调整时间指令（前提是机器人有权限执行命令）
  else if (msg.startsWith('调整时间')) {
    const timeKeyword = msg.replace('调整时间', '').trim()
    const validTimes = ['day', 'night', 'noon', 'midnight']

    if (validTimes.includes(timeKeyword)) {
      bot.chat(`/time set ${timeKeyword}`)
      bot.chat(`⏳ 已请求调整时间为 ${timeKeyword}`)
    } else {
      bot.chat(`⚠ 无效时间选项，可用: ${validTimes.join(', ')}`)
    }
  }
})

// 玩家加入服务器时欢迎
bot.on('playerJoined', (player) => {
  if (player.username !== bot.username) {
    bot.chat(`🎉 欢迎 ${player.username} 加入服务器！我是机器人“明子越他大坝”`)
  }
})

// 出生事件
bot.on('spawn', () => {
  console.log('✅ Bot 已成功加入服务器！')
  bot.chat('大家好！我是聊天机器人“明子越他大坝”，输入 help 查看我能做什么~')
})

// 错误和断线处理
bot.on('end', () => {
  console.log('⛔ Bot 已断开连接')
})

bot.on('error', err => {
  console.log('❌ 出现错误：', err)
})

const deathTaunts = [
  '菜就多练！',
  '我奶玩的都比你好。',
  '建议退游。',
  '你是在表演吗？',
  '再接再厉，或者别打了😏',
  '你这操作我瞎了都能赢。',
  '你是不是闭着眼玩的？',
  '下次带你奶奶一起上吧。',
  '建议卸载游戏🐶'
]

bot.on('message', (jsonMsg) => {
  try {
    const msg = jsonMsg.json

    if (!msg || typeof msg !== 'object') return

    // 检查是否是死亡相关的 translate key
    if (
      typeof msg.translate === 'string' &&
      msg.translate.startsWith('death.') &&
      Array.isArray(msg.with) &&
      msg.with.length >= 1
    ) {
      // 取第一个参与者（死亡玩家）的名字
      const player = msg.with[0]?.text || ''
      const taunt = deathTaunts[Math.floor(Math.random() * deathTaunts.length)]
      bot.chat(`${player}  ${taunt}`)
    }
  } catch (e) {
    console.warn('⚠ 错误解析 message 事件：', e)
  }
})

