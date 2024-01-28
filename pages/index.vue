<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useSeoMeta({
  title: 'yooooooson'
})
// TODO - 夜间模式
// const dark = ref(false)
// 设备模式切换
const deviceMode = useDeviceModeStore()
// 命令行默认符号
const DEFAULT_CMD = '->'
// 输入功能
const text = ref('')
// 超出文本显示范围tiptop的visible
const tooltipVisible = computed(() => {
  return text.value.length > 18
})
// TODO - 光标移动功能
// const underscoreString = ref('')
// watch(() => text.value, () => {
//   const { length } = text.value
//   underscoreString.value = ''.padStart(length, '0')
// })
// 查询内容
const msg = ref('')
const name = ref('')
const cmd = ref(DEFAULT_CMD)
const tags = ref<string[]>([])
// 输入处理(键入Enter)
const handleText = async (value: string) => {
  // Tag判断
  let _tag = /^#[a-zA-z0-9_]+/.exec(value)?.[0]
  if (_tag) {
    const tag = _tag.split('#')[1]
    // 去重
    if (!tags.value.includes(tag)) {
      tags.value.push(tag)
    }
  }
  // 命令判断
  if (value === 'clear' || cmd.value === '->') {
    switch (value) {
      case 'ls': {
        handleClear()
        msg.value = 'list'
        break;
      }
      case 'clear': {
        handleClear('all')
        break;
      }
      case 'find': {
        handleQuery()
        break;
      }
      case 'help': {
        handleClear()
        msg.value = `
      ls\t: list
      help\t: help
      clear\t: clear all
      <Esc>\t: cleartyping 
      `
        break;
      }
      default:
        break;
    }
  } else {
    if (!_tag) {
      // TODO - 有tag的查询
      msg.value = value
    }
    if (cmd.value === 'find=>') {
      handleQuery(value)
    }
  }
  // 非命令处理(常规输入)
  try {
    const result = await queryContent('/').where({ title: value }).findOne()
    if (result) {
      msg.value = result.description
      name.value = result._id
    }
    console.log(result, value);
  } catch (error) { }
  // 清除命令行
  handleClear('typing')
}
// 查询命令
const handleQuery = (value?: string) => {
  if (value) {
    // TODO - 查询
    console.log('query-> ', value);
  } else {
    cmd.value = 'find=>'
  }
}
// 清除
const handleClear = (type: ('msg' | 'typing' | 'all') = 'typing') => {
  switch (type) {
    case 'all': {
      tags.value = []
      cmd.value = DEFAULT_CMD
    }
    case 'msg': {
      msg.value = ''
      name.value = ''
    }
    case 'typing': {
      text.value = ''
    }
    default:
      break;
  }
}
// 删除tag
const handleCloseTag = (tag: string) => {
  tags.value = tags.value.filter(item => item !== tag)
}
const addTypingListener = () => {
  // 键盘监听
  document.addEventListener('keydown', handleTyping)
}
// 输入功能：事件监听
const handleTyping = (e: KeyboardEvent) => {
  //TODO - 光标移动功能
  // console.log(e.key);
  switch (e.key) {
    case 'Backspace': {
      text.value = text.value.slice(0, -1)
      break;
    }
    case 'Escape': {
      handleClear('typing')
      break;
    }
    case 'Enter': {
      handleText(text.value)
      break;
    }
    default: {
      if (/^[A-Za-z0-9\-,.?\/> \-_#!]$/.test(e.key)) {
        text.value += e.key
      }
      break;
    }
  }
  //TODO - @input功能
  // handleText(text.value)
}
onMounted(() => {
  addTypingListener()
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleTyping)
})
</script>

<template>
  <a-space class="fixed top-0 inset-x-0 z-10 y-search-container" direction="vertical" align="center" fill>
    <a-space direction="vertical" align="center" fill style="">
      <!-- TODO - 光标移动功能 -->
      <!-- <div id="y-typing-container">
        <span style="color: transparent;">{{ underscoreString }}</span><span class="y-underscore"></span>
      </div> -->
      <a-tooltip :popup-visible="tooltipVisible" :default-popup-visible="false"
        :content-style="{ maxWidth: 'calc(100vw - 24vw)' }">
        <template #content>
          <pre class="overflow-hidden">{{ text }}<span>_</span></pre>
        </template>
        <pre tabindex="0"
          class="translate-x-[-4.8vw] outline-none y-typing-container"><span class="y-typing-head">{{ cmd }}</span>{{ text }}<span class="y-underscore"></span></pre>
      </a-tooltip>

    </a-space>
    <a-space>
      <a-tag v-for="tag in tags" size="large" @close="handleCloseTag(tag)" closable>{{ tag }}</a-tag>
    </a-space>
    <a-space direction="vertical" align="center" fill>
      <pre class="translate-x-[-16%] y-msg-container">{{ msg }}</pre>
    </a-space>
    <a-space v-if="name === 'content:index.md'" class="" direction="vertical" align="center" fill>
      <ContentDoc />
    </a-space>
  </a-space>
</template>

<style scoped lang="less">
@font-face {
  font-family: 'Fira Code';
  src: url('~/assets/fonts/FiraCode-Regular.ttf');
}

.y-search-container {
  --y-container-padding: 6vw;
  width: 100vw;
  height: 100vh;
  padding: 12vw var(--y-container-padding) 0 var(--y-container-padding);
  // TODO - scroll probllem
  // overflow-y: scroll;
  box-sizing: border-box;

  .y-typing-container {
    --y-typing-size: 5.4vw;
    --y-typing-head-size: 4.2vw;
    --y-underscore-width: 3vw;
    --y-underscore-boder: 0.8vw;
    height: calc(var(--y-typing-size) + 2.4vw);
    max-width: calc(100vw - 2 * var(--y-container-padding) - 4.8vw - 2 * var(--y-typing-head-size));
    font-size: var(--y-typing-size);
    font-weight: 700;
    font-family: 'Fira Code';
    overflow-x: hidden;

    &>.y-typing-head {
      font-size: var(--y-typing-head-size);
      color: var(--y-color-grey)
    }

    &>.y-underscore {
      display: inline-block;
      width: var(--y-underscore-width);
      height: calc(2 * var(--y-underscore-width));
      margin-right: calc(2 * var(--y-underscore-width));
      transform: translateY(0.8rem);
      animation: blink 1s step-end infinite;
      border-bottom: var(--y-underscore-boder) solid #000;
    }
  }

  .y-msg-container {
    font-size: 1.2rem;
  }
}


@keyframes blink {

  from,
  to {
    border-color: transparent;
  }

  50% {
    border-color: #000;
  }
}
</style>
