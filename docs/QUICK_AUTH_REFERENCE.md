# 登录验证快速参考

## 🚀 快速开始（5分钟）

### 1. 验证构建
```bash
npm run build  # ✅ 成功
```

### 2. 启动开发服务器
```bash
npm run dev
# 访问 http://localhost:3000/auth/login
```

### 3. 测试登录流程
```
手机号：13800138000
验证码：（自动生成，开发环境下显示在页面）
身份：选择任意一个
同意服务条款：✓
点击"立即登录/注册"
```

---

## 📋 API 快速参考

| API | 方法 | 功能 | 请求 |
|-----|------|------|------|
| `/api/auth/send-code` | POST | 发送验证码 | `{ phone }` |
| `/api/auth/login` | POST | 验证码登录 | `{ phone, code, role }` |
| `/api/auth/logout` | POST | 退出登录 | - |
| `/api/auth/verify` | GET | 验证状态 | - |

---

## 🎯 在代码中使用

### 获取用户信息
```typescript
import { useAuth } from '@/contexts/auth';

const { user, isAuthenticated } = useAuth();
```

### 启动登录流程
```typescript
import { useLogin } from '@/hooks/useLogin';

const { sendCode, login, error, loading } = useLogin({
  onSuccess: () => router.push('/'),
});

await sendCode(phone);  // 发送验证码
await login(phone, code, role);  // 登录
```

### 调用 API
```typescript
import { authService } from '@/services/auth.service';

await authService.sendCode('13800138000');
await authService.login('13800138000', '123456', 'user');
await authService.logout();
```

---

## 🔐 核心概念

| 概念 | 说明 |
|------|------|
| AuthContext | 全局认证状态管理 |
| useAuth Hook | 访问认证状态和方法 |
| Middleware | 保护受限路由 |
| HttpOnly Cookie | 安全存储令牌 |
| OTP Flow | 一次性密码登录流程 |

---

## 📁 关键文件位置

```
🔑 认证逻辑
├── /contexts/auth.tsx          ← 全局状态
├── /hooks/useLogin.ts          ← 登录 Hook
└── /services/auth.service.ts   ← API 调用

🌐 API 路由
├── /app/api/auth/send-code/    ← 发送验证码
├── /app/api/auth/login/        ← 验证码登录
├── /app/api/auth/logout/       ← 退出登录
└── /app/api/auth/verify/       ← 验证状态

🛡️ 保护机制
├── /middleware.ts              ← 路由保护
└── /app/layout.tsx            ← AuthProvider

📱 界面
└── /app/auth/login/page.tsx    ← 登录页面
```

---

## ⚙️ 配置

### 环境变量 (.env.local)
```env
NODE_ENV=development
```

### 时间设置
- 验证码有效期: **10 分钟**
- 验证码倒计时: **60 秒**
- 会话有效期: **7 天**
- 尝试限制: **5 次/验证码**

### 受保护路由
```
/user/*
/playmate/*
/agent/*
/chat
/order/*
/review
/complaint
/payment
```

---

## 🧪 测试用例

### 发送验证码
```bash
curl -X POST http://localhost:3000/api/auth/send-code \
  -H "Content-Type: application/json" \
  -d '{"phone":"13800138000"}'
```

### 验证码登录
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"13800138000","code":"123456","role":"user"}'
```

### 验证登录状态
```bash
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Cookie: auth_token=..."
```

---

## ✅ 工作流检查清单

- [ ] 构建成功 (`npm run build`)
- [ ] 开发服务器启动 (`npm run dev`)
- [ ] 访问登录页面
- [ ] 输入手机号获取验证码
- [ ] 输入验证码并选择身份
- [ ] 同意服务条款并点击登录
- [ ] 成功重定向到首页
- [ ] 页面显示用户信息
- [ ] 能够访问受保护路由
- [ ] 点击退出登录返回登录页

---

## 🐛 故障排除

| 问题 | 解决方案 |
|------|--------|
| 验证码无法发送 | 检查手机号格式，必须 11 位 |
| 验证码总是错误 | 开发环境检查页面下方显示的测试码 |
| 登录后无法访问受保护的路由 | 清除 Cookies 后重新登录 |
| 收不到短信 | 未集成真实短信服务，仅开发环境模拟 |
| 使用 Suspense 警告 | 已在登录页面用 Suspense 包裹 |

---

## 📚 相关文档

- 完整文档: [LOGIN_VERIFICATION_GUIDE.md](./LOGIN_VERIFICATION_GUIDE.md)
- Next.js 认证: https://nextjs.org/docs/app/building-your-application/authentication
- Cookie 安全: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

---

## 🎓 学习路径

1. **基础** - 阅读本快速参考
2. **进阶** - 阅读完整文档 LOGIN_VERIFICATION_GUIDE.md
3. **集成** - 集成真实短信服务
4. **优化** - 实现 JWT、Rate Limiting、数据库存储

---

**准备就绪！开始测试吧！** 🚀
