# Lib + API 混合模式 - 完整改造说明

## 📋 改造完成

已将原有的认证系统改造为 **Lib + API 的混合模式**。

---

## 🏗️ 新的架构

```
┌─────────────────────────────────────────┐
│         客户端 (Client Components)       │
├─────────────────────────────────────────┤
│ useAuth Hook (contexts/auth.tsx)        │
│ + useLogin Hook (hooks/useLogin.ts)     │
│ + authService (services/auth.service.ts)│
│      ↓                                   │
│  调用 API Route                          │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│      API 路由层 (API Routes)            │
├─────────────────────────────────────────┤
│ /api/auth/send-code                     │
│ /api/auth/login                         │
│ /api/auth/logout                        │
│ /api/auth/verify                        │
│      ↓                                   │
│  调用 Lib 函数                           │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│      核心逻辑层 (Lib)                   │
├─────────────────────────────────────────┤
│ /lib/auth.ts                            │
│ ├─ sendVerificationCode()               │
│ ├─ verifyAndLogin()                     │
│ ├─ setAuthCookies()                     │
│ ├─ getCurrentAuth()                     │
│ ├─ getCurrentUser()                     │
│ ├─ requireAuth()                        │
│ ├─ hasRole()                            │
│ └─ clearAuthCookies()                   │
│      ↓                                   │
│  数据存储 (Map/Database)                 │
└─────────────────────────────────────────┘
```

---

## 📂 文件结构

### 新创建
- **`/lib/auth.ts`** - 核心认证逻辑库（所有认证函数）

### 已改造
- **`/app/api/auth/send-code/route.ts`** - 现在调用 `sendVerificationCode()`
- **`/app/api/auth/login/route.ts`** - 现在调用 `verifyAndLogin()` + `setAuthCookies()`
- **`/app/api/auth/logout/route.ts`** - 现在调用 `clearAuthCookies()`
- **`/app/api/auth/verify/route.ts`** - 现在调用 `getCurrentAuth()`

### 保持不变
- `/contexts/auth.tsx` - 客户端认证状态管理
- `/hooks/useLogin.ts` - 登录逻辑 Hook
- `/services/auth.service.ts` - API 调用包装
- `/app/auth/login/page.tsx` - 登录页面
- `/middleware.ts` - 路由保护

---

## 🎯 核心函数列表

### 客户端可用（通过 API）

```typescript
// 发送验证码
POST /api/auth/send-code
{ phone: string }

// 验证码登录
POST /api/auth/login
{ phone, code, role }

// 退出登录
POST /api/auth/logout

// 验证登录状态
GET /api/auth/verify
```

### 服务器端直接调用

```typescript
import { 
  getCurrentUser,      // 获取当前用户
  requireAuth,         // 要求已登录
  getCurrentAuth,      // 获取认证状态
  hasRole,             // 检查用户角色
  sendVerificationCode,// 发送验证码
  verifyAndLogin,      // 验证码登录
  setAuthCookies,      // 设置 Cookies
  clearAuthCookies,    // 清除 Cookies
  generateAuthToken,   // 生成令牌
} from '@/lib/auth';
```

---

## 💡 使用示例

### 1️⃣ 在服务器组件中检查登录状态

```typescript
// app/user/profile/page.tsx
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div>
      <h1>欢迎, {user.name}</h1>
      <p>用户ID: {user.userId}</p>
      <p>身份: {user.role}</p>
    </div>
  );
}
```

### 2️⃣ 在 Server Action 中要求认证

```typescript
// app/actions.ts
'use server';

import { requireAuth } from '@/lib/auth';

export async function updateProfile(formData: FormData) {
  const user = await requireAuth(); // 未登录会抛出错误

  const name = formData.get('name') as string;
  
  console.log(`用户 ${user.userId} 更新了信息`);
  
  return { success: true, message: '更新成功' };
}
```

### 3️⃣ 在 API 路由中使用

```typescript
// app/api/user/profile/route.ts
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const user = await requireAuth();

    return NextResponse.json({
      user,
      message: '已获取用户信息',
    });
  } catch (error) {
    return NextResponse.json(
      { error: '未授权' },
      { status: 401 }
    );
  }
}
```

### 4️⃣ 条件化内容渲染

```typescript
// app/dashboard/page.tsx
import { getCurrentUser, hasRole } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>请先登录</div>;
  }

  const isAgent = user.role === 'agent';

  return (
    <div>
      <h1>仪表板 - {user.name}</h1>

      {isAgent && (
        <section className="bg-blue-50 p-4 rounded">
          <h2>代理商专区</h2>
          {/* 仅代理商可见内容 */}
        </section>
      )}
    </div>
  );
}
```

### 5️⃣ 客户端调用

```typescript
'use client';

import { useAuth } from '@/contexts/auth';

export default function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div>
      <span>{user.name}</span>
      <button onClick={logout}>退出</button>
    </div>
  );
}
```

---

## 🔑 关键优势

### 对比改造前

| 方面 | 改造前 | 改造后 |
|------|--------|--------|
| **代码组织** | API 中混杂业务逻辑 | 逻辑集中在 Lib |
| **可复用性** | ❌ 仅 API 能用 | ✅ 服务器端直接调用 |
| **性能** | ❌ 服务器组件需走 HTTP | ✅ Lib 直接调用 |
| **可测试性** | ❌ 需 Mock API | ✅ 直接单元测试 |
| **代码重复** | ❌ API 中重复验证逻辑 | ✅ 逻辑在 Lib 中统一 |

---

## 📊 改造前后对比

### 改造前：API 中硬编码

```typescript
// /app/api/auth/login/route.ts
export async function POST(request: NextRequest) {
  const { phone, code } = await request.json();

  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return NextResponse.json({ error: '无效手机号' }, { status: 400 });
  }

  // ... 重复的验证逻辑
  
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, { /* ... */ });
  
  return NextResponse.json({ user });
}
```

### 改造后：调用 Lib

```typescript
// /app/api/auth/login/route.ts
import { verifyAndLogin, setAuthCookies } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { phone, code, role } = await request.json();

  const result = await verifyAndLogin(phone, code, role);
  
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  await setAuthCookies(result.user!);
  
  return NextResponse.json({ success: true, user: result.user });
}
```

---

## 🚀 下一步优化建议

### 1. 使用数据库替代 Map

```typescript
// 将 verificationCodes Map 改为数据库调用
// export async function sendVerificationCode(phone: string) {
//   const code = generateCode();
//   await db.verificationCodes.create({
//     phone,
//     code: hashCode(code),
//     expiresAt: new Date(Date.now() + 10 * 60 * 1000),
//   });
// }
```

### 2. 实现真实 JWT Token

```typescript
// import jwt from 'jsonwebtoken';
//
// export function generateAuthToken(user: User): string {
//   return jwt.sign({
//     userId: user.userId,
//     phone: user.phone,
//     role: user.role,
//   }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   });
// }
```

### 3. 添加 Refresh Token

```typescript
// export async function refreshAuthToken() {
//   const refreshToken = await cookies().then(c => c.get('refresh_token')?.value);
//   // 验证 refresh token 并发放新的 access token
// }
```

### 4. 实现短信服务集成

```typescript
// import TencentCloud from 'tencentcloud-sdk-nodejs';
//
// export async function sendVerificationCode(phone: string) {
//   const code = generateCode();
//   await smsClient.send({
//     phone,
//     message: `验证码: ${code}, 10分钟有效`,
//   });
// }
```

---

## ✅ 验证改造

### 运行构建测试

```bash
npm run build  # 应该成功，0 errors
```

### 测试流程

1. 访问 `/auth/login`
2. 输入手机号，获取验证码
3. 输入验证码并登录
4. 验证能访问受保护的路由
5. 查看开发工具 Network 选项卡，确认 Cookies 已设置

---

## 📝 文件改造清单

- ✅ 创建 `/lib/auth.ts` - 核心逻辑库
- ✅ 改造 `/app/api/auth/send-code/route.ts` - 调用 sendVerificationCode()
- ✅ 改造 `/app/api/auth/login/route.ts` - 调用 verifyAndLogin()
- ✅ 改造 `/app/api/auth/logout/route.ts` - 调用 clearAuthCookies()
- ✅ 改造 `/app/api/auth/verify/route.ts` - 调用 getCurrentAuth()
- ✅ 创建 `/lib/auth.examples.ts` - 使用示例

---

## 🎯 关键函数快速查询

```typescript
// 获取当前用户（服务器端）
const user = await getCurrentUser();

// 要求必须登录（Server Action）
const user = await requireAuth();

// 检查用户角色
const isAgent = user && user.role === 'agent';

// 检查认证状态
const { authenticated, user } = await getCurrentAuth();

// 发送验证码
const result = await sendVerificationCode(phone);

// 验证并登录
const result = await verifyAndLogin(phone, code, role);

// 设置 Cookies
await setAuthCookies(user);

// 清除 Cookies
await clearAuthCookies();
```

---

**改造完成！系统已准备好使用新的混合模式架构。** ✅
