"我有一个旧的 Vite React 项目组件在D:\app\dapp\fengyue-ai 文件夹里。请帮我将它们迁移到当前的D:\app\dapp\fyxm的 Next.js App Router 架构中。
将路由逻辑从 react-router-dom 转换为 Next.js 的文件系统路由。
识别需要交互的组件并在顶部添加 'use client'。
将 <Link to="..."> 替换为 next/link。
保持 Tailwind 样式不变。"


1. 局部更新：AI 辅助搬运（最快，适合加了几个组件）
如果你在 React 项目里写了几个新组件或新页面，想同步到 Next.js：
操作： 在 Cursor 中打开 Next.js 项目，使用 Composer (Cmd+I)。
指令： “我把旧 React 项目里的 src/components/NewFeature.tsx 复制到了 ./temp 文件夹，请帮我把它正式迁移到目前的 app/new-feature/page.tsx 中。记得适配 Next.js 的路由、图片组件，并检查是否需要添加 'use client'。”
优点： 准确率极高，AI 会自动帮你处理 Link 和 Image 的差异。
2. 逻辑重用：抽离 Hook 和工具函数（适合业务逻辑更新）
如果你更新的是复杂的业务逻辑（比如计算公式、API 请求逻辑）：
策略： 保持 hooks/ 和 utils/ 文件夹在两个项目中结构一致。
同步： 直接把 React 项目中更新的 useAuth.ts 或 api.ts 覆盖到 Next.js 对应的文件夹。
注意： 因为这些是纯 JS/TS 逻辑，不涉及 DOM 或路由，通常可以无缝覆盖。
3. 架构同步：建立“映射关系”（适合大规模长期同步）
如果你打算长期同时维护这两个项目，建议在心里（或文档里）建立一个文件映射表：
React 项目路径	Next.js 项目路径	同步策略
src/components/*	components/*	直接覆盖（组件通常通用）
src/pages/Login.tsx	app/login/page.tsx	手动/AI 转换（路由逻辑不同）
src/assets/*	public/*	直接覆盖
src/context/*	app/layout.tsx (或 providers)	手动合并


"我有一个旧的 Vite React 项目组件在D:\app\dapp\fengyue-ai 文件夹里。请帮我将它们迁移到当前的D:\app\dapp\fyxm的 Next.js App Router 架构中。
将路由逻辑从 react-router-dom 转换为 Next.js 的文件系统路由。
识别需要交互的组件并在顶部添加 'use client'。
将 <Link to="..."> 替换为 next/link。
保持 Tailwind 样式不变。"


把这个页面组件化，并把页面添加到 D:\app\dapp\fyxm 项目中