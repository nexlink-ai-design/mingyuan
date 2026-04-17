# 中间件改造对比：缓存 vs 请求头

## 改造前后对比

### 问题：原来使用请求头注入

```typescript
// ❌ 旧做法（已改）- 使用 response.headers
response.headers.set('x-user-id', user.userId);
response.headers.set('x-user-phone', user.phone);
response.headers.set('x-user-role', user.role);
response.headers.set('x-user-name', user.name);
response.headers.set('x-authenticated', 'true');
```

**缺点**：
- ❌ 需要手动从 headers 读取
- ❌ 需要导入 `headers()` 函数
- ❌ 需要多个 `headers().get()` 调用
- ❌ 头部信息在网络传输中清晰可见

### 解决方案：改用 Cookies 缓存

```typescript
// ✅ 新做法 - 使用 cookies 缓存
response.cookies.set('user_cache', JSON.stringify(userCache), {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24,
  path: '/',
});
```

**优点**：
- ✅ HttpOnly Cookie，防止 XSS
- ✅ 自动在所有请求中发送
- ✅ 服务器端自动解析
- ✅ 无需手动传递头部
- ✅ 24 小时自动过期

---

## 代码迁移指南

### 中间件层面

**之前**（proxy.ts - 已改）：

```typescript
// ❌ 旧
response.headers.set('x-user-id', user.userId);
response.headers.set('x-user-phone', user.phone);
response.headers.set('x-user-role', user.role);
response.headers.set('x-user-name', user.name);
response.headers.set('x-authenticated', 'true');
```

**现在**（proxy.ts - 新）：

```typescript
// ✅ 新
const userCache = {
  userId: user.userId,
  phone: user.phone,
  role: user.role,
  name: user.name,
  timestamp: Date.now(),
};

response.cookies.set('user_cache', JSON.stringify(userCache), {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24,
  path: '/',
});
```

### API 路由层面

**之前**（auth-headers.ts - 已改）：

```typescript
// ❌ 旧 - 需要导入 headers
import { headers as getHeaders } from 'next/headers';

export function getUserFromHeaders(): User | null {
  const h = getHeaders();
  const isAuthenticated = h.get('x-authenticated') === 'true';
  
  if (!isAuthenticated) {
    return null;
  }

  const user: User = {
    userId: h.get('x-user-id') || '',
    phone: h.get('x-user-phone') || '',
    role: h.get('x-user-role') || '',
    name: h.get('x-user-name') || '',
  };

  return user;
}
```

**现在**（auth-headers.ts - 新）：

```typescript
// ✅ 新 - 需要导入 cookies
import { cookies } from 'next/headers';

export async function getUserFromCache(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCacheStr = cookieStore.get('user_cache')?.value;

    if (!userCacheStr) {
      return null;
    }

    const userCache = JSON.parse(userCacheStr);
    const user: User = {
      userId: userCache.userId || '',
      phone: userCache.phone || '',
      role: userCache.role || '',
      name: userCache.name || '',
    };

    return user;
  } catch (error) {
    console.error('从缓存获取用户信息失败:', error);
    return null;
  }
}
```

### 使用层面

**之前**（API 路由 - 已改）：

```typescript
// ❌ 旧 - 同步调用，无需 await
import { getUserFromHeaders } from '@/lib/auth-headers';

export async function GET(request: Request) {
  const user = getUserFromHeaders();  // 同步
  
  if (!user) {
    return Response.json({ error: '未登录' }, { status: 401 });
  }

  return Response.json({ data: user });
}
```

**现在**（API 路由 - 新）：

```typescript
// ✅ 新 - 异步调用，需要 await
import { getUserFromCache } from '@/lib/auth-headers';

export async function GET(request: Request) {
  const user = await getUserFromCache();  // 异步
  
  if (!user) {
    return Response.json({ error: '未登录' }, { status: 401 });
  }

  return Response.json({ data: user });
}
```

---

## 函数对应关系

### 旧函数 → 新函数

| 旧函数 | 新函数 | 变化 |
|--------|--------|------|
| `getUserFromHeaders()` | `getUserFromCache()` | 现在是异步 |
| `requireUserFromHeaders()` | `requireUserFromCache()` | 现在是异步 |
| `getUserIdFromHeaders()` | `getUserIdFromCache()` | 现在是异步 |
| `isAuthenticatedFromHeaders()` | `isAuthenticatedFromCache()` | 现在是异步 |
| `hasRoleFromHeaders()` | `hasRoleFromCache()` | 现在是异步 |
| `getUserPhoneFromHeaders()` | `getUserPhoneFromCache()` | 现在是异步 |

### 使用模式变化

```typescript
// ❌ 旧模式 - 同步
const user = getUserFromHeaders();

// ✅ 新模式 - 异步 + await
const user = await getUserFromCache();
```

---

## 迁移检查清单

- [x] `proxy.ts` - 改用 `cookies.set('user_cache', ...)`
- [x] `lib/auth-headers.ts` - 函数改为异步，使用 `cookies()` 代替 `headers()`
- [x] 删除了旧的 `examples.ts` 文件
- [ ] 更新所有 API 路由，加上 `await` 关键字
- [ ] 更新所有 Server Actions，加上 `await` 关键字
- [ ] 更新所有 Server Components，改为 `async` 并加上 `await`
- [ ] 测试所有认证流程

---

## 性能对比

| 指标 | 请求头 | Cookies |
|------|--------|---------|
| 缓存开销 | 在响应头中 | HttpOnly 安全存储 |
| 访问速度 | O(1) - 头部查询 | O(1) - Cookie 查询 |
| 异步 | 否 | 是 |
| 安全性 | 中等 | 高（HttpOnly） |
| XSS 漏洞 | 有风险 | 防护 |
| 显式化 | 需要导入 headers | 需要导入 cookies |

---

## 常见迁移错误

### 错误 1: 忘记 await

```typescript
// ❌ 错误
const user = getUserFromCache();
console.log(user.userId);  // TypeError: user is undefined

// ✅ 正确
const user = await getUserFromCache();
console.log(user.userId);
```

### 错误 2: 在非 async 函数中使用

```typescript
// ❌ 错误 - 同步函数不能 await
export function getUser() {
  const user = await getUserFromCache();  // 语法错误
}

// ✅ 正确 - 必须是 async 函数
export async function getUser() {
  const user = await getUserFromCache();
}
```

### 错误 3: 在客户端组件中使用

```typescript
// ❌ 错误 - 客户端无法使用 cookies
'use client';
const user = await getUserFromCache();

// ✅ 正确 - 只在服务器端使用
// 或发送 API 请求到服务器
```

---

## 安全性提升

### HttpOnly Cookie 的优势

1. **防止 XSS 攻击**
   - 前端 JavaScript 无法访问 cookie
   - 恶意脚本无法窃取用户信息

2. **防止 CSRF 攻击**
   - `sameSite: 'lax'` 限制跨域请求

3. **自动过期**
   - `maxAge: 86400` - 24 小时后自动清除
   - 无需手动管理过期时间

4. **加密传输**
   - `secure: true` - 仅在 HTTPS 下传输
   - 防止中间人监听

### 之前的风险（请求头）

```typescript
// ⚠️ 风险：用户 ID 在 headers 中清晰可见
x-user-id: user_123
x-user-phone: 13800138000
```

### 现在的安全（Cookies）

```typescript
// ✅ 安全：用户信息在 HttpOnly Cookie 中
// 无法通过 JavaScript/XSS 访问
// 自动防止许多常见攻击
```

---

## 总结

| 方面 | 请求头（旧） | Cookies（新） |
|------|------------|-------------|
| **安全性** | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **易用性** | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **异步** | 否 | 是 |
| **自动传递** | 否 | 是 |
| **防 XSS** | ❌ | ✅ |
| **防 CSRF** | 手动 | 自动 |
| **过期管理** | 手动 | 自动 |

---

**建议**：使用新的 Cookies 缓存方案，虽然需要 `await`，但安全性和可维护性都更好。
