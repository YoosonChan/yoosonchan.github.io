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
// 命令
const cmd = ref(DEFAULT_CMD)
// tag
const tags = ref<string[]>([])
// 查询结构
const result = ref()
const markdown = ref()
// 输入处理(键入Enter)
const handleText = (value: string) => {
  // Tag判断
  const _tag = /^#[a-zA-z0-9_]+/.exec(value)?.[0]
  if (_tag) {
    const tag = _tag.split('#')[1]
    // 去重
    if (!tags.value.includes(tag)) {
      tags.value.push(tag)
    }
  }
  // 路由判断
  const route = /^\/[a-zA-z0-9_?=]+/.exec(value)?.[0]
  if (route) {
    navigateTo(route)
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
    // 查询命令
    if (cmd.value === 'find=>') {
      if (!_tag) {
        // TODO - 有tag的查询
        msg.value = value
        handleQuery(value)
      }
    }
  }
  // 清除命令行
  handleClear('typing')
}
// 查询命令
const handleQuery = async (value?: string) => {
  if (value) {
    // TODO - 查询Tag功能
    const _tag = tags.value[0]
    const path = _tag ?? '/'
    try {
      let _result
      console.log('before', _tag, path);
      if (!_tag) {
        _result = await queryContent(path).where({ title: value }).findOne()
      } else {
        _result = await queryContent(path).findOne()
      }
      console.log(_result, value);
      if (_result._extension === 'md') {
        markdown.value = _result
      } else {
        if (_result.body) {
          result.value = _result.body
        } else {
          msg.value = _result.description
        }
      }
    } catch (error) {
      console.log(error);
    }
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
      result.value = undefined
      markdown.value = undefined
    }
    case 'msg': {
      msg.value = ''
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
      if (/^[A-Za-z0-9\-,.?\/> \-_=#!]$/.test(e.key)) {
        text.value += e.key
      }
      break;
    }
  }
  //TODO - @input功能
  // handleText(text.value)
}
onMounted(() => {
  addTypingListener();
  // 清除聚焦问题
  (document.querySelector('.y-typing-container')! as HTMLElement).focus()
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleTyping)
})
</script>

<template>
  <a-space class="y-search-container" direction="vertical" align="center" fill>
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
      <pre class="translate-x-[-4.8vw] y-msg-container">{{ msg }}</pre>
    </a-space>
    <a-space direction="vertical" align="center" fill>
      <pre class="translate-x-[-4.8vw] y-msg-container">{{ result }}</pre>
    </a-space>
    <a-space class="translate-x-[-4.8vw]" direction="vertical" align="center" fill>
      <ContentRenderer v-if="markdown" :value="markdown">
        <ContentRendererMarkdown :value="markdown" />
      </ContentRenderer>
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
  padding-top: 9vw;
  // TODO - scroll probllem
  // overflow-y: scroll;

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
