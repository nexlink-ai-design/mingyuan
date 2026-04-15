import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "悦享按摩 - 专业上门按摩服务平台",
  description: "全国专业按摩技师展示与服务平台，严选认证技师，极致放松体验",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
