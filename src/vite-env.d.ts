/// <reference types="vite/client" />

declare const __APP_VERSION__: string
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface Window {
  jsonCallBack: any
}

// type EventHandlers<E> = {
//   [K in keyof E]?: E[K] extends (...args: any) => any ? E[K] : (payload: E[K]) => void
// }