src/
├── hooks/             # 自定义 Hooks 层（核心）
│   ├── use-auth.ts    # 结合 SWR 和 Zustand 的复合逻辑
│   └── use-user.ts    # 纯 SWR 获取用户信息
├── services/          # API 请求层（定义 fetcher）
│   ├── api.ts         # Axios 实例/基础配置
│   └── user.service.ts# 具体请求函数
├── store/             # Zustand 状态层
│   ├── use-ui-store.ts# UI 状态（侧边栏、弹窗、主题）
│   └── use-auth-store.ts# 客户端授权状态（Token、持久化）
└── components/        # 视图层
    └── Profile.tsx

### 在使用 SWR（负责数据获取/缓存）和 Zustand（负责全局状态/UI逻辑）时，核心原则是：让 SWR 处理服务器状态（Server State），让 Zustand 处理客户端状态（Client State）。


### 要在 Zustand 中实现持久化（将状态自动保存到 localStorage 或 sessionStorage），只需使用内置的 persist 中间件。


在 Next.js 或 SSR 环境下，服务器渲染的 HTML 和客户端从 LocalStorage 读取后的内容可能不一致，会导致 Hydration Error。
解决方法： 在组件中通过 useEffect 确认已加载。

### 持久化

// store/use-auth-store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  token: string
  setToken: (t: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: '',
      setToken: (token) => set({ token }),
    }),
    {
      name: 'user-auth',
      storage: createJSONStorage(() => localStorage), // 明确使用 localStorage
    }
  )
)

### 为了避免在每个组件里写 useEffect，建议写一个通用的自定义 Hook 来安全地读取持久化状态：
typescript
// hooks/use-has-hydrated.ts
import { useState, useEffect } from 'react'

export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState(false)
  useEffect(() => {
    setHasHydrated(true)
  }, [])
  return hasHydrated
}

### 性能：对于敏感的 UI（如用户名），水合前显示“骨架屏 Skeleton”比显示“未登录”再跳到“已登录”体验更好。

export function Navbar() {
  const token = useAuthStore(s => s.token)
  const hasHydrated = useHasHydrated() // 上一个回答中的 Hook

  // 水合完成前，统一显示骨架屏或 Loading 状态
  if (!hasHydrated) {
    return <Skeleton className="h-8 w-20" />
  }

  return <div>{token ? 'Dashboard' : 'Login'}</div>
}

### 简单来说，这两个 Hook 的分工非常明确：useState 用来“存数据”，useEffect 用来“处理副作用”