import { z } from 'zod';

const uint64Schema = z.union([
  z.number().int().nonnegative(),
  z.string().regex(/^\d+$/, '必须是无符号整数'),
]);

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(2, '用户名至少需要 2 个字符')
      .max(100, '用户名不能超过 100 个字符'),
    password: z
      .string()
      .min(6, '密码至少需要 6 个字符')
      .max(255, '密码不能超过 255 个字符'),
    nickname: z
      .string()
      .min(1, '昵称不能为空')
      .max(100, '昵称不能超过 100 个字符'),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerSchema>;

export const registerFormSchema = registerSchema
  .extend({
    confirmPassword: z
      .string()
      .min(6, '请再次输入密码')
      .max(255, '确认密码不能超过 255 个字符'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: '两次输入的密码不一致',
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const registerResponseSchema = z.object({
  id: uint64Schema,
  uid: uint64Schema,
  username: z.string(),
  nickname: z.string(),
});

export const registerSuccessBodySchema = z.object({
  code: z.number(),
  message: z.string(),
  data: registerResponseSchema,
});

export const registerErrorBodySchema = z.object({
  code: z.number(),
  message: z.string(),
  error: z.string().optional(),
  Key: z.string().optional(),
});

export type RegisterSuccessBody = z.infer<typeof registerSuccessBodySchema>;