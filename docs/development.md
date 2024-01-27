# Development

## Plugins

```ts arco-design.ts
// plugins/arco-design.ts
import ArcoVue from '@arco-design/web-vue';
// 图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css';

export default defineNuxtPlugin((NuxtApp)=> {
  NuxtApp.vueApp.use(ArcoVue)
  NuxtApp.vueApp.use(ArcoVueIcon)
})
```

## Modules

### [pinia for Nuxt](https://pinia.vuejs.org/ssr/nuxt.html)

```sh
yarn add pinia @pinia/nuxt
```

```js
// nuxt.config.js
export default defineNuxtConfig({
  // ... other options
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
```

#### Auto imports

```js
// nuxt.config.ts
export default defineNuxtConfig({
  // ... other options
  modules: ['@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
})
```

## Postcss

### [tailwindcss for Nuxt](https://tailwindcss.com/docs/guides/nuxtjs)

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

```js nuxt.config.js
// nuxt.config.js
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
```

```js tailwind.config.js
// tailwind.config.js
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`./assets/css/main.css` -> `css` of `nuxt.config.js`

```css main.css
/* main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Install Problem

print some errors when to action the `yarn add -D less` command.

> require() of ES Module `**\node_modules\string-width\index.js` from `**\node_modules\wide-align\align.js` not supported.
Instead change the require of index.js in `**\node_modules\wide-align\align.js` to a dynamic import() which is available in all CommonJS modules.

[resolution](https://github.com/nuxt/nuxt/issues/21231)(package.json):

```json
"resolutions": {
    "string-width": "4.2.3"
}
```

## Deploy

[Deploy a Nuxt App](https://nuxt.com/deploy)

[Nuxt application to staic hoting services](https://nuxt.com/docs/getting-started/deployment#static-hosting)

```sh
npx nuxi generate
```
