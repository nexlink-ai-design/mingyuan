# 中间件用户缓存使用指南

> 通过中间件在 cookies 中缓存用户信息，避免在每个 Server Action/Component 中重复调用认证函数

## 概述

### 工作流程

```
请求进入
    ↓
[proxy.ts] 拦截
    ↓
调用 getCurrentAuth() 获取用户信息
    ↓
将用户信息缓存到 user_cache cookie：
  - userId
  - phone
  - role
  - name
  - timestamp
    ↓
请求继续到 Page/API/Action
    ↓
组件/路由从 user_cache cookie 读取用户信息
```

### 核心文件

| 文件 | 用途 |
|------|------|
| `/proxy.ts` | 拦截所有请求，验证用户并缓存到 cookies |
| `/lib/auth.ts` | 核心认证逻辑 |
| `/lib/auth-headers.ts` | **推荐使用** - 便利函数，从 cookies 读取缓存用户信息 |

### 缓存机制的优势

- ✅ **无需传递请求头** - 用户信息直接存在 cookie 中
- ✅ **自动同步** - 所有服务器端代码都能访问相同的用户数据
- ✅ **安全可靠** - HttpOnly cookies，防止 XSS 攻击
- ✅ **异步友好** - 任何地方都可以读取，无需上下文
- ✅ **减少重复认证** - 中间件一次认证，后续直接读缓存



## 快速开始

### 1. Server Action 中使用

```typescript
// app/api/user/profile/route.ts
'use server';
import { getUserFromCache, requireUserFromCache } from '@/lib/auth-headers';

// 方式 1：可选认证（可能返回 null）
export async function getProfile() {
  const user = await getUserFromCache();
  if (!user) {
    return { error: '请先登录' };
  }
  
  return {
    userId: user.userId,
    phone: user.phone,
    role: user.role,
    name: user.name,
  };
}

// 方式 2：必须认证（未登录直接抛错）
export async function updateProfile(data: any) {
  const user = await requireUserFromCache(); // 如果未认证会抛出错误
  
  // 这里保证 user 一定存在
  await db.users.update({ id: user.userId, ...data });
  
  return { success: true };
}
```

### 2. API 路由中使用

```typescript
// app/api/orders/route.ts
import { requireUserFromCache } from '@/lib/auth-headers';

export async function GET(request: Request) {
  try {
    const user = await requireUserFromCache();
    
    // 获取用户订单
    const orders = await db.orders.find({ userId: user.userId });
    
    return Response.json({ orders });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }
}
```

### 3. Server Component 中使用

```typescript
// app/dashboard/page.tsx
import { getUserFromCache } from '@/lib/auth-headers';

export default async function DashboardPage() {
  const user = await getUserFromCache();
  
  if (!user) {
    return <div>未登录</div>;
  }
  
  return (
    <div>
      <h1>欢迎，{user.name}</h1>
      <p>用户 ID: {user.userId}</p>
    </div>
  );
}
```


## 可用的便利函数

### getUserFromCache()

获取完整的用户信息对象（异步函数）

```typescript
import { getUserFromCache } from '@/lib/auth-headers';

const user = await getUserFromCache();
// user = {
//   userId: '123',
//   phone: '13800138000',
//   role: 'user',
//   name: 'John'
// } | null
```

**返回值**: `Promise<User | null>`

---

### requireUserFromCache()

获取用户信息，如果未认证则抛出错误（异步函数）

```typescript
import { requireUserFromCache } from '@/lib/auth-headers';

const user = await requireUserFromCache(); // 未认证时抛出 Error
// 这里 user 一定存在
```

**返回值**: `Promise<User>`

**抛出**: `Error` - 如果未认证或 session 已过期

---

### getUserIdFromCache()

仅获取用户 ID（异步函数）

```typescript
import { getUserIdFromCache } from '@/lib/auth-headers';

const userId = await getUserIdFromCache();
// userId = '123' | null
```

**返回值**: `Promise<string | null>`

---

### isAuthenticatedFromCache()

快速检查认证状态（异步函数）

```typescript
import { isAuthenticatedFromCache } from '@/lib/auth-headers';

if (await isAuthenticatedFromCache()) {
  console.log('用户已登录');
} else {
  console.log('用户未登录');
}
```

**返回值**: `Promise<boolean>`

---

### hasRoleFromCache(role)

检查用户是否具有指定角色（异步函数）

```typescript
import { hasRoleFromCache } from '@/lib/auth-headers';

if (await hasRoleFromCache('admin')) {
  // 管理员操作
}
```

**参数**: `role: string` - 要检查的角色

**返回值**: `Promise<boolean>`

---

### getUserPhoneFromCache()

仅获取用户电话（异步函数）

```typescript
import { getUserPhoneFromCache } from '@/lib/auth-headers';

const phone = await getUserPhoneFromCache();
// phone = '13800138000' | null
```

**返回值**: `Promise<string | null>`

---

## 常见场景

### 场景 1：获取当前用户订单

```typescript
// app/api/user/orders/route.ts
import { requireUserFromCache } from '@/lib/auth-headers';

export async function GET() {
  const user = await requireUserFromCache();
  
  const orders = await db.orders.find({ userId: user.userId });
  return Response.json({ orders });
}
```

### 场景 2：删除用户资源

```typescript
// app/api/user/avatar/route.ts
import { requireUserFromCache } from '@/lib/auth-headers';

export async function DELETE() {
  const user = await requireUserFromCache();
  
  await db.users.update({ id: user.userId, avatar: null });
  return Response.json({ success: true });
}
```

### 场景 3：Admin 检查

```typescript
// app/api/admin/users/route.ts
import { hasRoleFromCache, requireUserFromCache } from '@/lib/auth-headers';

export async function GET() {
  const user = await requireUserFromCache();
  
  if (!(await hasRoleFromCache('admin'))) {
    return Response.json({ error: 'Access denied' }, { status: 403 });
  }
  
  const users = await db.users.findAll();
  return Response.json({ users });
}
```

### 场景 4：日志记录

```typescript
// app/api/data/update/route.ts
import { getUserIdFromCache } from '@/lib/auth-headers';

export async function POST(request: Request) {
  const userId = await getUserIdFromCache();
  
  const data = await request.json();
  await db.data.update(data);
  
  console.log(`用户 ${userId} 更新了数据`);
  return Response.json({ success: true });
}
```

### 场景 5：可选认证

```typescript
// app/api/public/posts/route.ts
import { getUserIdFromCache } from '@/lib/auth-headers';

export async function GET() {
  const userId = await getUserIdFromCache(); // 可能为 null
  
  // 公开文章
  const posts = await db.posts.find({ visibility: 'public' });
  
  // 如果已登录，可以加载用户相关数据
  if (userId) {
    posts.forEach(post => {
      post.likes = post.likes.includes(userId);
    });
  }
  
  return Response.json({ posts });
}
```

## 重要提示

### ✅ DO - 应该做

```typescript
// ✅ 在 Server Action 中使用
'use server';
import { getUserFromCache } from '@/lib/auth-headers';

export async function myAction() {
  const user = await getUserFromCache();
  // ...
}
```

```typescript
// ✅ 在 API 路由中使用（async 函数自动支持 await）
import { requireUserFromCache } from '@/lib/auth-headers';

export async function POST(request: Request) {
  const user = await requireUserFromCache();
  // ...
}
```

```typescript
// ✅ 在 Server Component 中使用（需要 async component）
import { getUserFromCache } from '@/lib/auth-headers';

export default async function Page() {
  const user = await getUserFromCache();
  // ...
}
```

### ❌ DON'T - 不应该做

```typescript
// ❌ 不要在 Client Component 中使用
'use client';
import { getUserFromCache } from '@/lib/auth-headers'; // 错误！

export default function Component() {
  const user = await getUserFromCache(); // 运行时错误
}
```

```typescript
// ❌ 不要在非 async 的 Server Component 中使用
import { getUserFromCache } from '@/lib/auth-headers';

// 这是同步组件，不能 await
export default function Page() {
  const user = await getUserFromCache(); // 错误！
}
```

```typescript
// ❌ 不要在每个组件中重复认证检查
// 这个问题现在已经解决了，所有检查都在中间件中进行

export default async function Page() {
  // 不需要这样做 ↓
  // const authResult = await getCurrentAuth();
  // if (!authResult.authenticated) { ... }
}
```

## 缓存信息结构

理解 `user_cache` cookie 中缓存的用户信息结构：

| 字段名 | 类型 | 说明 |
|------|------|------|
| `userId` | string | 用户唯一标识 |
| `phone` | string | 用户电话号码 |
| `role` | string | 用户角色（如 'user', 'admin'） |
| `name` | string | 用户名称 |
| `timestamp` | number | 缓存时间戳 |

**示例 Cookie 值**：

```json
{
  "userId": "user_123",
  "phone": "13800138000",
  "role": "user",
  "name": "John Doe",
  "timestamp": 1713360000000
}
```

**Cookie 配置**:
- `httpOnly: true` - 防止 JavaScript 访问（仅服务器可读）
- `secure: true` - HTTPS 环境下才发送
- `sameSite: lax` - CSRF 保护
- `maxAge: 86400` - 24 小时过期

## 性能考虑

### 1. 单次调用开销

`getUserFromCache()` 的开销非常小：
- 仅从 cookies 中读取和解析 JSON
- 没有数据库查询
- 没有额外的网络请求

### 2. 多次调用没问题

由于是简单的 JSON 解析，多次调用不会显著影响性能：

```typescript
// ✅ 可以多次调用，开销很小
const user = await getUserFromCache();
const userId = await getUserIdFromCache();
const isAuth = await isAuthenticatedFromCache();
const phone = await getUserPhoneFromCache();
```

### 3. 避免重复创建对象

```typescript
// ✅ 好的做法 - 获取一次，多处使用
const user = await getUserFromCache();
console.log(user.userId);
console.log(user.phone);

// ❌ 避免 - 重复调用
const user1 = await getUserFromCache();
const user2 = await getUserFromCache(); // 不必要
```

### 4. 缓存命中率

- 已登录用户：100% 缓存命中
- 未登录用户：自动重定向到登录页（无缓存查询）
- Cookie 有效期：24 小时

## 故障排除

### 问题 1: 始终获得 null 用户

**原因**：cookies 中没有 `user_cache` 或已过期

```typescript
// 调试：检查 cookie 是否存在
const cookieStore = await cookies();
const userCache = cookieStore.get('user_cache');
console.log('user_cache:', userCache);
```

**解决**：
1. 确保用户已登录（中间件会缓存用户信息）
2. 检查 cookie 是否被清除（登出时会删除）
3. 检查中间件是否正常运行

### 问题 2: "No implementation of "headers" available"

**原因**：在客户端组件中使用了异步函数

```typescript
// ❌ 错误
'use client';
import { getUserFromCache } from '@/lib/auth-headers';

export default function Component() {
  const user = await getUserFromCache(); // 错误！
}
```

**解决**：
- 只在 Server Components 或 Server Actions 中使用
- 如需在客户端获取用户信息，使用 AuthContext 替代

### 问题 3: 忘记添加 await

**原因**：这些函数都是异步的，必须 await

```typescript
// ❌ 错误
const user = getUserFromCache();  // 返回 Promise
console.log(user.userId);  // 错误！

// ✅ 正确
const user = await getUserFromCache();
console.log(user.userId);
```

### 问题 4: SyntaxError: await 用在非 async 函数

**原因**：在非 async 的 Server Component 中使用了 await

```typescript
// ❌ 不能这样做
export default function Page() {
  const user = await getUserFromCache();  // 错误！
}

// ✅ 需要标记为 async
export default async function Page() {
  const user = await getUserFromCache();
}
```

## 迁移指南

### 从旧方式迁移

**之前**（请求头方式 - 已过时）：

```typescript
import { getUserFromHeaders } from '@/lib/auth-headers';

export async function myAction() {
  const user = getUserFromHeaders();  // 同步，无 await
  // ...
}
```

**现在**（缓存方式 - 推荐）：

```typescript
import { getUserFromCache } from '@/lib/auth-headers';

export async function myAction() {
  const user = await getUserFromCache();  // 异步，需要 await
  // ...
}
```

**关键变化**：
- ✅ 改用 `await` 调用
- ✅ 函数现在是异步的
- ✅ 通过 cookies 而不是请求头获取

## 总结

| 功能 | 函数 | 返回值 | 异步 |
|------|------|--------|------|
| 获取完整用户信息 | `getUserFromCache()` | `Promise<User \| null>` | ✅ |
| 要求已认证 | `requireUserFromCache()` | `Promise<User>` / 抛错 | ✅ |
| 仅获取 ID | `getUserIdFromCache()` | `Promise<string \| null>` | ✅ |
| 检查认证状态 | `isAuthenticatedFromCache()` | `Promise<boolean>` | ✅ |
| 检查角色 | `hasRoleFromCache(role)` | `Promise<boolean>` | ✅ |
| 获取电话 | `getUserPhoneFromCache()` | `Promise<string \| null>` | ✅ |

---

**工作流总结**：

```
1. 用户登录 → /api/auth/login
2. 中间件验证 → getCurrentAuth()
3. 缓存用户信息到 user_cache cookie
4. 后续请求的组件/API → await getUserFromCache()
5. 获取缓存的用户信息
```

**优势**：
- ✅ 无需通过请求头传递敏感信息
- ✅ 所有服务器端代码都能访问用户信息
- ✅ HttpOnly Cookie，安全可靠
- ✅ 自动过期管理
- ✅ 支持 Server Actions 和 API 路由


