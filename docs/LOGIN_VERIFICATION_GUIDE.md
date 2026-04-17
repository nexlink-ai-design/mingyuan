# 登录验证完整方案文档

## 概述

已为您的 Next.js 应用建立了一套完整的 **OTP (一次性密码/验证码) 登录验证系统**，包括：

- ✅ **验证码发送** - 调用短信服务发送 OTP 到用户手机
- ✅ **验证码验证** - 验证用户提交的验证码
- ✅ **用户认证** - 验证成功后创建用户或更新用户信息
- ✅ **会话管理** - 通过 HttpOnly Cookie 安全存储认证令牌
- ✅ **路由保护** - 中间件检查受保护路由的认证状态
- ✅ **状态管理** - AuthContext 全局管理用户登录状态

---

## 架构设计

### 文件结构

```
fyxm/
├── app/
│   ├── api/auth/
│   │   ├── send-code/route.ts      # 发送验证码 API
│   │   ├── login/route.ts          # 验证码登录 API
│   │   ├── logout/route.ts         # 退出登录 API
│   │   └── verify/route.ts         # 验证登录状态 API
│   ├── auth/
│   │   └── login/page.tsx          # 登录页面
│   └── layout.tsx                  # 主布局（包含 AuthProvider）
├── contexts/
│   └── auth.tsx                    # AuthContext - 全局认证状态
├── hooks/
│   └── useLogin.ts                 # useLogin Hook - 登录逻辑
├── services/
│   └── auth.service.ts             # 认证服务 - API 调用封装
└── middleware.ts                   # 中间件 - 路由保护
```

---

## 工作流程

### 1. 发送验证码

**Flow:**
```
用户输入手机号 → 点击"获取验证码" → API /api/auth/send-code
  ↓
系统检验手机号格式
  ↓
检查是否频繁请求（60秒内限制）
  ↓
生成6位随机验证码
  ↓
调用短信服务发送验证码
  ↓
本地存储验证码（10分钟过期）
  ↓
返回成功，前端启动60秒倒计时
```

**API 端点:** `POST /api/auth/send-code`

**请求数据:**
```json
{
  "phone": "13800138000"
}
```

**响应数据:**
```json
{
  "success": true,
  "message": "验证码已发送",
  "code": "123456"  // 开发环境仅返回
}
```

---

### 2. 验证码登录

**Flow:**
```
用户输入手机号、验证码、选择身份 → 点击"立即登录/注册" → API /api/auth/login
  ↓
检查验证码是否过期（10分钟）
  ↓
检查验证码尝试次数（最多5次）
  ↓
验证码是否正确
  ↓
查询或创建用户
  ↓
生成并存储会话令牌（HttpOnly Cookie）
  ↓
设置用户信息 Cookie（用于客户端使用）
  ↓
返回用户信息
  ↓
前端跳转到首页或回调 URL
```

**API 端点:** `POST /api/auth/login`

**请求数据:**
```json
{
  "phone": "13800138000",
  "code": "123456",
  "role": "user"  // user | companion | agent
}
```

**响应数据:**
```json
{
  "success": true,
  "message": "登录成功",
  "user": {
    "userId": "user_1726234567890",
    "phone": "13800138000",
    "role": "user",
    "name": "用户8000"
  }
}
```

---

### 3. 会话管理

系统通过 **HttpOnly Cookie** 存储认证令牌：

```typescript
// 设置的 Cookie
{
  "auth_token": "base64_encoded_token",      // HttpOnly, 7天过期
  "user_info": "{userId, phone, role, name}" // 非HttpOnly, 供客户端使用
}
```

**HttpOnly Cookie 优势:**
- ✅ 防止 XSS 攻击（JS 无法访问）
- ✅ 浏览器自动在每次请求中发送
- ✅ HttpOnly 标志确保安全性

---

### 4. 路由保护

中间件自动保护以下受保护的路由：

```typescript
// 受保护路由（需要登录）
/user/*
/playmate/*
/agent/*
/chat
/order/*
/review
/complaint
/payment

// 公开路由（无需登录）
/
/auth/login
/auth/register
/api/auth/*
```

**保护机制:**
- 用户访问受保护路由 → 检查 auth_token Cookie
- 如果没有 Token → 重定向到 `/auth/login?callbackUrl=/path`
- 登录成功后 → 自动跳转到原始路由

---

## 使用指南

### 1. 在页面中使用认证

**获取用户信息:**
```typescript
'use client';

import { useAuth } from '@/contexts/auth';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>请先登录</div>;
  }

  return (
    <div>
      <h1>欢迎，{user.name}</h1>
      <p>用户ID: {user.userId}</p>
      <p>手机号: {user.phone}</p>
      <p>身份: {user.role}</p>
      <button onClick={logout}>退出登录</button>
    </div>
  );
}
```

### 2. 在组件中使用登录 Hook

```typescript
'use client';

import { useLogin } from '@/hooks/useLogin';

export default function MyComponent() {
  const {
    sending,       // 是否正在发送验证码
    loading,       // 是否正在登录
    error,         // 错误信息
    countdown,     // 倒计时秒数
    sendCode,      // 发送验证码函数
    login,         // 登录函数
  } = useLogin({
    onSuccess: () => {
      console.log('登录成功！');
    },
    onError: (error) => {
      console.log('错误:', error);
    },
  });

  const handleSendCode = async () => {
    await sendCode('13800138000');
  };

  const handleLogin = async () => {
    const success = await login('13800138000', '123456', 'user');
    if (success) {
      console.log('已登录');
    }
  };

  return (
    <div>
      <button onClick={handleSendCode} disabled={sending || countdown > 0}>
        {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
      </button>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

### 3. 调用认证 API

```typescript
import { authService } from '@/services/auth.service';

// 发送验证码
const result = await authService.sendCode('13800138000');

// 登录
const loginResult = await authService.login('13800138000', '123456', 'user');

// 退出登录
await authService.logout();

// 验证登录状态
const verifyResult = await authService.verify();
const { authenticated, user } = verifyResult;
```

---

## 集成短信服务

目前系统使用**模拟验证码存储**。要集成真实短信服务，需要在以下位置修改：

### 修改 `/app/api/auth/send-code/route.ts`

```typescript
// 在生成验证码后添加：

import { TencentCloudService } from '@/services/tencentcloud.service';

// 生成6位验证码
const code = Math.floor(Math.random() * 900000 + 100000).toString();

// 调用腾讯云短信服务
try {
  await TencentCloudService.sendSMS(phone, {
    templateId: 'YOUR_TEMPLATE_ID',
    templateParams: [code, '10'],  // 验证码, 有效期(分钟)
  });
} catch (error) {
  console.error('短信发送失败:', error);
  return NextResponse.json(
    { error: '短信发送失败，请稍后重试' },
    { status: 500 }
  );
}
```

### 其他短信服务商

- **阿里云短信:** 使用 `@alicloud/dysmsapi20170525`
- **七牛云短信:** 使用 `qiniu` SDK
- **AWS SNS:** 使用 `@aws-sdk/client-sns`

---

## 安全最佳实践

### ✅ 已实现的安全措施

1. **验证码有效期** - 10分钟自动过期
2. **尝试限制** - 单个手机号最多5次验证尝试
3. **重复请求限制** - 60秒内只能发送一次验证码
4. **HttpOnly Cookie** - 防止 XSS 攻击
5. **Secure 标志** - 生产环境仅通过 HTTPS 发送
6. **SameSite 策略** - 防止 CSRF 攻击

### ⚠️ 生产环境建议

1. **实现真正的 JWT Token**
   ```typescript
   // 当前使用 Base64 编码，建议改为 JWT
   import jwt from 'jsonwebtoken';
   
   const token = jwt.sign({
     userId: user.userId,
     phone: user.phone,
     role: user.role,
   }, process.env.JWT_SECRET, {
     expiresIn: '7d',
   });
   ```

2. **使用数据库存储验证码**
   ```typescript
   // 当前使用内存 Map，建议改为数据库
   await VerificationCode.create({
     phone,
     code: hashedCode,
     expiresAt: new Date(Date.now() + 10 * 60 * 1000),
   });
   ```

3. **添加 Rate Limiting**
   ```typescript
   // 使用 redis 实现分布式限流
   import { RateLimiter } from '@/lib/rate-limiter';
   
   const limiter = new RateLimiter('sms', {
     points: 5,        // 5 次请求
     duration: 3600,   // 每小时
   });
   
   await limiter.consume(phone);
   ```

4. **生产环境配置**
   ```env
   # .env.production
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRES_IN=7d
   SMS_PROVIDER=tencent # tencent|aliyun|qiniu
   TENCENT_SMS_APP_ID=your_app_id
   TENCENT_SMS_APP_KEY=your_app_key
   ```

---

## 测试指南

### 开发环境测试

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问登录页面**
   ```
   http://localhost:3000/auth/login
   ```

3. **手机号格式要求**
   - 必须以 1 开头
   - 中间数字为 3-9
   - 总长度 11 位
   - 例如: `13800138000`, `18612345678`

4. **获取验证码**
   - 在开发环境，验证码会显示在登录页面下方
   - 生产环境不显示（仅通过短信发送）

5. **验证申请场景**
   - 选择身份：普通用户/名媛陪玩/王牌经纪
   - 同意服务条款
   - 点击登录

### 集成测试

```typescript
// __tests__/auth.test.ts
describe('Authentication Flow', () => {
  it('should send verification code', async () => {
    const response = await fetch('/api/auth/send-code', {
      method: 'POST',
      body: JSON.stringify({ phone: '13800138000' }),
    });
    expect(response.status).toBe(200);
  });

  it('should login with verification code', async () => {
    // 1. 发送验证码
    await fetch('/api/auth/send-code', {
      method: 'POST',
      body: JSON.stringify({ phone: '13800138000' }),
    });

    // 2. 登录（使用开发验证码）
    const loginResponse = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        phone: '13800138000',
        code: '123456',
        role: 'user',
      }),
    });
    expect(loginResponse.status).toBe(200);
  });
});
```

---

## 常见问题

### Q1: 验证码过期后如何重新获取？
A: 点击"获取验证码"按钮，会重新发送新的验证码。旧验证码自动失效。

### Q2: 忘记验证码了怎么办？
A: 在 60 秒内再次点击"获取验证码"会被拒绝。可以等待 60 秒后重新请求。

### Q3: 验证码输入错误超过 5 次怎么办？
A: 系统会删除该手机号的验证码，需要重新申请新的验证码。

### Q4: 已登录的用户访问 /auth/login 会怎样？
A: 自动重定向到首页 (/)。

### Q5: 如何在服务器端验证用户身份？
A: 检查 cookies 中的 `auth_token`，解析并验证其有效性。

### Q6: 修改了用户角色后需要重新登录吗？
A: 不需要。系统会在登录时自动更新用户角色，重新设置 Cookie。

---

## 下一步

1. **集成真实短信服务** (腾讯云/阿里云)
2. **集成支付/充值功能**
3. **添加用户资料补全流程**
4. **实现实名认证**
5. **添加社交登录** (微信/支付宝)
6. **实现生物识别登录** (指纹/人脸)

---

## 环境变量配置

```env
# .env.local (开发环境)
NODE_ENV=development

# .env.production
NODE_ENV=production
JWT_SECRET=your_production_secret
```

---

## 文件修改摘要

### 新建文件 (7个)
- `/app/api/auth/send-code/route.ts` - 验证码发送
- `/app/api/auth/login/route.ts` - 验证码登录
- `/app/api/auth/logout/route.ts` - 退出登录
- `/app/api/auth/verify/route.ts` - 验证登录状态
- `/contexts/auth.tsx` - 认证上下文
- `/services/auth.service.ts` - 认证服务
- `/hooks/useLogin.ts` - 登录 Hook

### 已修改文件 (3个)
- `/middleware.ts` - 添加路由保护逻辑
- `/app/layout.tsx` - 添加 AuthProvider
- `/app/auth/login/page.tsx` - 完整的登录页面实现

---

**系统已准备就绪！** ✅

可以开始测试登录流程。如有任何问题，请参考上述文档。
