import { z } from 'zod';

export const loginSchema = z
  .object({
    username: z
      .string()
      .min(2, '用户名至少需要 2 个字符')
      .max(100, '用户名不能超过 100 个字符'),
    password: z
      .string()
      .min(6, '密码至少需要 6 个字符')
      .max(255, '密码不能超过 255 个字符'),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;

const uint64Schema = z.union([
  z.number().int().nonnegative(),
  z.string().regex(/^\d+$/, '必须是无符号整数'),
]);

export const loginSuccessBodySchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z
    .object({
      token: z.string().optional(),
      id: uint64Schema.optional(),
      uid: uint64Schema.optional(),
      username: z.string(),
      nickname: z.string(),
    })
    .optional(),
});

export const loginErrorBodySchema = z.object({
  code: z.number(),
  message: z.string(),
  error: z.string().optional(),
});

export type LoginSuccessBody = z.infer<typeof loginSuccessBodySchema>;
