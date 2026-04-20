'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

import { registerAction } from './actions';
import { registerFormSchema, type RegisterFormValues } from './schema';

const defaultValues: RegisterFormValues = {
  username: '',
  password: '',
  confirmPassword: '',
  nickname: '',
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const passwordValue = useWatch({
    control: form.control,
    name: 'password',
  });

  const passwordHint = useMemo(() => {
    if (!passwordValue) {
      return '后端要求密码长度为 6 到 255 个字符。';
    }

    return passwordValue.length >= 6 ? '密码长度符合要求。' : '密码长度还不够。';
  }, [passwordValue]);

  const handleSubmit = form.handleSubmit((values) => {
    if (!agreed) {
      toast.error('请先阅读并同意相关协议后再提交。');
      return;
    }

    form.clearErrors();

    startTransition(async () => {
      const { confirmPassword, ...payload } = values;
      void confirmPassword;

      const result = await registerAction(payload);

      if (result.fieldErrors) {
        for (const [fieldName, messages] of Object.entries(result.fieldErrors)) {
          const message = messages?.[0];

          if (message) {
            form.setError(fieldName as keyof RegisterFormValues, {
              type: 'server',
              message,
            });
          }
        }
      }

      if (result.success) {
        toast.success('注册成功', {
          description: result.data
            ? `用户名 ${result.data.username} 已创建，UID ${String(result.data.uid)}。`
            : undefined,
        });
        router.push('/auth/login');
      } else {
        toast.error('注册失败', { description: result.message });
      }
    });
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(224,82,153,0.16),_transparent_32%),linear-gradient(180deg,_#fff7fb_0%,_#ffffff_38%,_#fff5f9_100%)] px-4 py-10 text-[#1C1A17]">
      <main className="mx-auto flex w-full max-w-md flex-col items-center rounded-[32px] border border-[#F3D7E6] bg-white/90 px-6 py-10 shadow-[0_24px_80px_rgba(224,82,153,0.12)] backdrop-blur md:max-w-lg md:px-8">
        <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-[18px] bg-[#E05299] shadow-lg shadow-[#E05299]/30">
          <span className="text-3xl font-bold text-white">名</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">创建账户</h1>
        <p className="mt-2 text-center text-sm text-[#655E58]">
          使用后端注册接口完成开户，字段与接口文档保持一致。
        </p>

        <div className="mt-8 w-full rounded-3xl border border-[#F7DDEB] bg-[#FFF9FC] p-5 text-sm text-[#655E58]">
          <p className="font-semibold text-[#1C1A17]">接口字段</p>
          <p className="mt-2 leading-6">
            必填字段为 <span className="font-semibold text-[#E05299]">username</span>、
            <span className="font-semibold text-[#E05299]">password</span>、
            <span className="font-semibold text-[#E05299]">nickname</span>。
          </p>
        </div>

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
                  <FormDescription className="text-xs text-[#8A7E75]">
                    后端要求用户名长度为 2 到 100 个字符。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1C1A17]">昵称</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="nickname"
                      placeholder="请输入昵称"
                      className="h-12 rounded-2xl border-[#E6D9E0] bg-white px-4 focus-visible:ring-[#E05299]"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-[#8A7E75]">
                    昵称是注册请求中的必填字段。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1C1A17]">密码</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="请设置 6 位以上密码"
                        className="h-12 rounded-2xl border-[#E6D9E0] bg-white px-4 pr-12 focus-visible:ring-[#E05299]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7E75] transition-colors hover:text-[#E05299]"
                        aria-label={showPassword ? '隐藏密码' : '显示密码'}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-[#8A7E75]">{passwordHint}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1C1A17]">确认密码</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="请再次输入密码"
                        className="h-12 rounded-2xl border-[#E6D9E0] bg-white px-4 pr-12 focus-visible:ring-[#E05299]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((value) => !value)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7E75] transition-colors hover:text-[#E05299]"
                        aria-label={showConfirmPassword ? '隐藏确认密码' : '显示确认密码'}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-[#8A7E75]">
                    该字段仅用于前端校验，不会提交给后端接口。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start gap-3 rounded-2xl border border-[#F1E0E8] bg-white px-4 py-4">
              <Checkbox
                id="register-agreement"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-0.5 border-[#D8A8C2] data-[state=checked]:border-[#E05299] data-[state=checked]:bg-[#E05299]"
              />
              <label htmlFor="register-agreement" className="text-xs leading-6 text-[#655E58]">
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
                  正在提交注册
                </>
              ) : (
                '完成注册'
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-8 text-center text-sm text-[#655E58]">
          已有账户？
          <Link href="/auth/login" className="ml-1 font-semibold text-[#E05299]">
            立即登录
          </Link>
        </div>
      </main>
    </div>
  );
}
