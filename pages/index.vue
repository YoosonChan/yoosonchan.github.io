<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useSeoMeta({
  title: 'yooooooson'
})

import { ref } from 'vue';
// 输入功能
const text = ref('')
//TODO - 光标移动功能
// const underscoreString = ref('')
// watch(() => text.value, () => {
//   const { length } = text.value
//   underscoreString.value = ''.padStart(length, '0')
// })

// 查询内容
const msg = ref('')
const name = ref('')
const tags = ref<string[]>([])
// 查询
const handleQuery = async (value: string) => {
  // Tag判断
  let _tag: string | undefined
  if (_tag = /^#[a-zA-z0-9_]+/.exec(value)?.[0]) {
    const tag = _tag.split('#')[1]
    // 去重
    if (!tags.value.includes(tag)) {
      tags.value.push(tag)
    }
  }
  // 命令判断
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
    case 'help': {
      handleClear()
      msg.value = `
      ls\t: list
      help\t: help
      clear\t: clear all
      <Esc>\t: clear command
      `
      break;
    }
    default:
      break;
  }
  // 非命令处理
  try {
    const result = await queryContent('/').where({ title: value }).findOne()
    if (result) {
      msg.value = result.description
      name.value = result._id
    }
    console.log(result, value);
  } catch (error) { }
  // 清除命令行
  handleClear('command')
}
// 清除
const handleClear = (type: ('msg' | 'command' | 'all') = 'command') => {
  switch (type) {
    case 'all': {
      tags.value = []
    }
    case 'msg': {
      msg.value = ''
      name.value = ''
    }
    case 'command': {
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
// 输入功能：事件监听
onMounted(() => {
  // 键盘监听
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    //TODO - 光标移动功能
    // console.log(e.key);
    switch (e.key) {
      case 'Backspace': {
        text.value = text.value.slice(0, -1)
        break;
      }
      case 'Escape': {
        handleClear('command')
        break;
      }
      case 'Enter': {
        handleQuery(text.value)
        break;
      }
      default: {
        if (/^[A-Za-z0-9\-,.?\/> \-_#]$/.test(e.key)) {
          text.value += e.key
        }
        break;
      }
    }
    //TODO - @input功能
    // handleQuery(text.value)
  })
})
</script>

<template>
  <a-space direction="vertical" align="center" fill>
    <a-space direction="vertical" align="center" fill style="margin-top: 10vw;">
      <!-- TODO - 光标移动功能 -->
      <!-- <div id="nm-typing-container">
        <span style="color: transparent;">{{ underscoreString }}</span><span class="nm-underscore"></span>
      </div> -->
      <pre
        class="nm-typing-container"><span class="nm-command-head">-></span>{{ text }}<span class="nm-underscore"></span></pre>
    </a-space>
    <a-space>
      <a-tag v-for="tag in tags" size="large" @close="handleCloseTag(tag)" closable>{{ tag }}</a-tag>
    </a-space>
    <a-space direction="vertical" align="center" fill>
      <pre class="nm-msg-container">{{ msg }}</pre>
    </a-space>
    <a-space v-if="name === 'content:index.md'" direction="vertical" align="center" fill>
      <ContentDoc />
    </a-space>
  </a-space>
</template>

<style scoped lang="less">
@font-face {
  font-family: 'Fira Code';
  src: url('~/assets/fonts/FiraCode-Regular.ttf');
}

.nm-typing-container {
  height: calc(6vw + 1rem);
  max-width: 100vw;
  font-size: 6vw;
  font-weight: 700;
  font-family: 'Fira Code';
  overflow-x: hidden;

  &>.nm-command-head {
    font-size: 4.2vw;
    color: #c9cdd4;
  }

  &>.nm-underscore {
    display: inline-block;
    width: 3vw;
    animation: blink 1s step-end infinite;
    border-bottom: 0.8vw solid #000;
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

.nm-msg-container {
  font-size: 1.2rem;
}
</style>
