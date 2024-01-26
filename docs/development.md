# Development

## Plugins

```ts arco-design.ts
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

export default defineNuxtPlugin((NuxtApp)=> {
  NuxtApp.vueApp.use(ArcoVue)
})
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
