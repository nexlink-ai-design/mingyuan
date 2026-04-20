'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

import { loginAction } from './actions';
import { loginSchema, type LoginInput } from './schema';

const defaultValues: LoginInput = {
  username: '',
  password: '',
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const handleSubmit = form.handleSubmit((values) => {
    if (!agreed) {
      toast.error('请先阅读并同意相关协议后再提交。');
      return;
    }

    form.clearErrors();

    startTransition(async () => {
      const result = await loginAction(values);

      if (result.fieldErrors) {
        for (const [fieldName, messages] of Object.entries(result.fieldErrors)) {
          const message = messages?.[0];
          if (message) {
            form.setError(fieldName as keyof LoginInput, { type: 'server', message });
          }
        }
      }

      if (result.success) {
        toast.success('登录成功', { description: '正在跳转到首页…' });
        router.push('/');
      } else {
        toast.error('登录失败', { description: result.message });
      }
    });
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(224,82,153,0.16),_transparent_32%),linear-gradient(180deg,_#fff7fb_0%,_#ffffff_38%,_#fff5f9_100%)] px-4 py-10 text-[#1C1A17]">
      <main className="mx-auto flex w-full max-w-md flex-col items-center rounded-[32px] border border-[#F3D7E6] bg-white/90 px-6 py-10 shadow-[0_24px_80px_rgba(224,82,153,0.12)] backdrop-blur md:max-w-lg md:px-8">
        <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-[18px] bg-[#E05299] shadow-lg shadow-[#E05299]/30">
          <span className="text-3xl font-bold text-white">名</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">欢迎回来</h1>
        <p className="mt-2 text-center text-sm text-[#655E58]">开启您的尊贵社交与游戏体验</p>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="mt-8 w-full space-y-5" noValidate>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1C1A17]">用户名</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="username"
                      placeholder="请输入用户名"
                      className="h-12 rounded-2xl border-[#E6D9E0] bg-white px-4 focus-visible:ring-[#E05299]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-[#1C1A17]">密码</FormLabel>
                    <Link href="#" className="text-xs font-medium text-[#E05299]">
                      忘记密码？
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="请输入密码"
                        className="h-12 rounded-2xl border-[#E6D9E0] bg-white px-4 pr-12 focus-visible:ring-[#E05299]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7E75] transition-colors hover:text-[#E05299]"
                        aria-label={showPassword ? '隐藏密码' : '显示密码'}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start gap-3 rounded-2xl border border-[#F1E0E8] bg-white px-4 py-4">
              <Checkbox
                id="login-agreement"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-0.5 border-[#D8A8C2] data-[state=checked]:border-[#E05299] data-[state=checked]:bg-[#E05299]"
              />
              <label htmlFor="login-agreement" className="text-xs leading-6 text-[#655E58]">
                我已阅读并同意
                <Link href="#" className="font-medium text-[#E05299]">
                  《用户服务协议》
                </Link>
                、
                <Link href="#" className="font-medium text-[#E05299]">
                  《隐私保护指引》
                </Link>
                和
                <Link href="#" className="font-medium text-[#E05299]">
                  《支付服务协议》
                </Link>
                。
              </label>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="h-12 w-full rounded-2xl bg-[#E05299] text-base font-semibold text-white shadow-lg shadow-[#E05299]/25 transition hover:bg-[#d4438b]"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  正在登录
                </>
              ) : (
                '立即登录'
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-8 text-center text-sm text-[#655E58]">
          还没有账户？
          <Link href="/auth/register" className="ml-1 font-semibold text-[#E05299]">
            立即注册
          </Link>
        </div>

        <div className="mt-10 w-full">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full h-px bg-[#E3E0DE]" />
            <span className="relative bg-white/90 px-4 text-xs font-medium uppercase tracking-wider text-[#655E58]">
              第三方账号快捷登录
            </span>
          </div>

          <div className="mt-6 flex justify-center gap-8">
            {(['WeChat', 'Apple', 'QQ'] as const).map((item) => (
              <button
                key={item}
                type="button"
                className="flex cursor-not-allowed flex-col items-center gap-2 opacity-60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E3E0DE]">
                  <span className="text-xl font-bold text-[#1C1A17]">{item.charAt(0)}</span>
                </div>
                <span className="text-xs font-medium text-[#655E58]">{item}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
