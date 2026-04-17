# Lib + API 混合模式 - 快速参考

## ✅ 改造完成

已成功将认证系统改造为 Lib + API 的混合模式。

---

## 🎯 快速开始

### 1. 客户端获取用户信息（已有的方式）

```typescript
'use client';
import { useAuth } from '@/contexts/auth';

const { user, logout } = useAuth();
```

### 2. 服务器端获取用户信息（新增）

```typescript
// app/user/page.tsx
import { getCurrentUser } from '@/lib/auth';

const user = await getCurrentUser();
```

### 3. 要求用户登录（新增）

```typescript
// app/actions.ts
'use server';
import { requireAuth } from '@/lib/auth';

export async function myAction() {
  const user = await requireAuth(); // 未登录抛出错误
}
```

---

## 📦 核心 Lib 函数

### 获取用户信息

```typescript
import { getCurrentUser } from '@/lib/auth';

// 获取当前用户（如果未登录返回 null）
const user = await getCurrentUser();
```

### 要求已登录

```typescript
import { requireAuth } from '@/lib/auth';

// 要求用户已登录（未登录抛出错误）
const user = await requireAuth();
```

### 获取完整认证状态

```typescript
import { getCurrentAuth } from '@/lib/auth';

const { authenticated, user } = await getCurrentAuth();
```

### 检查用户角色

```typescript
import { hasRole } from '@/lib/auth';

const isAgent = await hasRole('agent');
```

### 清除认证 Cookies

```typescript
import { clearAuthCookies } from '@/lib/auth';

await clearAuthCookies(); // 用于手动退出
```

---

## 🌐 API 端点

### 发送验证码

```bash
POST /api/auth/send-code
{ "phone": "13800138000" }
```

### 验证码登录

```bash
POST /api/auth/login
{ "phone": "13800138000", "code": "123456", "role": "user" }
```

### 验证登录状态

```bash
GET /api/auth/verify
```

### 退出登录

```bash
POST /api/auth/logout
```

---

## 💡 使用场景

### 场景 1: 保护页面

```typescript
// app/protected/page.tsx
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getCurrentUser();
  
  if (!user) redirect('/auth/login');
  
  return <div>{user.name}</div>;
}
```

### 场景 2: Server Action 中要求认证

```typescript
'use server';
import { requireAuth } from '@/lib/auth';

export async function updateProfile(data: any) {
  const user = await requireAuth();
  console.log(`用户 ${user.userId} 更新了信息`);
}
```

### 场景 3: API 路由中检查权限

```typescript
// app/api/user/orders/route.ts
import { requireAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await requireAuth();
    return NextResponse.json({ orders: [] });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
```

### 场景 4: 条件化内容

```typescript
// app/dashboard/page.tsx
import { getCurrentUser } from '@/lib/auth';

export default async function Dashboard() {
  const user = await getCurrentUser();
  
  return (
    <div>
      {user && user.role === 'agent' && (
        <section>代理商专区</section>
      )}
    </div>
  );
}
```

---

## 📁 文件对应关系

| 用途 | 文件 | 使用场景 |
|------|------|--------|
| 核心逻辑 | `/lib/auth.ts` | 服务器端直接调用 |
| API 端点 | `/app/api/auth/*/route.ts` | 客户端调用 |
| 客户端状态 | `/contexts/auth.tsx` | 客户端组件 |
| 登录 Hook | `/hooks/useLogin.ts` | 客户端登录表单 |

---

## 🔄 调用流程

### 客户端登录流程

```
客户端表单
  ↓
useLogin Hook (前端验证/请求)
  ↓
authService.login() (HTTP 请求)
  ↓
POST /api/auth/login
  ↓
verifyAndLogin() (Lib 函数)
  ↓
setAuthCookies() (设置 Cookies)
  ↓
客户端更新 AuthContext
```

### 服务器验证流程

```
Server Component / Server Action
  ↓
getCurrentUser() (Lib 函数)
  ↓
从 Cookies 读取用户信息
  ↓
返回 User 对象
```

---

## 🚀 立即使用

### 1. 验证构建

```bash
npm run build  # ✅ 应该成功显示 0 errors
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 创建一个受保护的页面

```typescript
// app/my-profile/page.tsx
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function MyProfilePage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login?callbackUrl=/my-profile');
  }

  return (
    <div className="p-8">
      <h1>欢迎, {user.name}</h1>
      <div className="mt-4 space-y-2">
        <p><strong>用户ID:</strong> {user.userId}</p>
        <p><strong>手机号:</strong> {user.phone}</p>
        <p><strong>身份:</strong> {user.role}</p>
      </div>
    </div>
  );
}
```

---

## 🎓 Lib 函数完整列表

```typescript
// 导入所有函数
import {
  // 获取用户信息
  getCurrentUser,        // () => Promise<User | null>
  getCurrentAuth,        // () => Promise<{ authenticated, user }>
  requireAuth,          // () => Promise<User> (未登录抛错)
  
  // 检查权限
  hasRole,              // (role: string) => Promise<boolean>
  
  // 认证流程
  sendVerificationCode, // (phone: string) => Promise<{success, error?, code?}>
  verifyAndLogin,       // (phone, code, role) => Promise<{success, user?, error?}>
  
  // Cookie 管理
  setAuthCookies,       // (user: User) => Promise<void>
  clearAuthCookies,     // () => Promise<void>
  generateAuthToken,    // (user: User) => string
  
  // 类型定义
  type User,            // { userId, phone, role, name }
  type AuthResult,      // { authenticated, user }
} from '@/lib/auth';
```

---

## ✨ 改造优势

| 方面 | 优势 |
|------|------|
| **代码复用** | 服务器端可直接调用 Lib，无需 HTTP |
| **性能** | 减少网络往返，加快服务器响应 |
| **可维护性** | 逻辑集中在一个地方，易于修改 |
| **可测试性** | 直接单元测试 Lib 函数，无需 Mock API |
| **类型安全** | 完整的 TypeScript 类型支持 |

---

## 📖 完整文档

- [Lib + API 混合模式完整指南](./LIB_API_HYBRID_GUIDE.md)
- [登录验证完整方案](../LOGIN_VERIFICATION_GUIDE.md)
- [快速认证参考](./auth.examples.ts)

---

**准备就绪！** 🚀

现在可以在服务器端直接使用 `/lib/auth` 中的函数了。
