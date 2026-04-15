'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Lock, QrCode, Send, Link2, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [qrSessionId, setQrSessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const [qrScanning, setQrScanning] = useState(false);

  const handleUsernameLogin = () => {
    if (!username || !password) {
      toast.error("请填写用户名和密码");
      return;
    }
    if (isRegister && password !== confirmPassword) {
      toast.error("两次密码不一致");
      return;
    }
    // Mock login
    localStorage.setItem("user", JSON.stringify({ username, loginMethod: "username" }));
    toast.success(isRegister ? "注册成功" : "登录成功");
    router.push("/profile");
  };

  const handleTelegramLogin = () => {
    toast.info("正在跳转到 Telegram 授权...");
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ username: "TG用户", loginMethod: "telegram" }));
      toast.success("Telegram 登录成功");
      router.push("/profile");
    }, 1500);
  };

  const handleNexLinkLogin = () => {
    toast.info("正在连接 NexLink...");
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ username: "NexLink用户", loginMethod: "nexlink" }));
      toast.success("NexLink 登录成功");
      router.push("/profile");
    }, 1500);
  };

  const refreshQrCode = () => {
    setQrSessionId(`session_${Date.now()}_${Math.random().toString(36).slice(2)}`);
    setQrScanning(false);
    toast.info("二维码已刷新");
  };

  const simulateQrScan = () => {
    setQrScanning(true);
    toast.info("等待确认登录...");
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ username: "扫码用户", loginMethod: "qrcode" }));
      toast.success("扫码登录成功");
      router.push("/profile");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center h-14 px-4">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-foreground">
            {isRegister ? "注册账号" : "登录"}
          </h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 pt-8 pb-16">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl text-primary-foreground font-bold">悦</span>
          </div>
          <h2 className="text-lg font-bold text-foreground">悦享按摩</h2>
          <p className="text-sm text-muted-foreground mt-1">专业上门按摩服务平台</p>
        </div>

        <Tabs defaultValue="qrcode" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="qrcode" className="text-xs gap-1">
              <QrCode className="w-3.5 h-3.5" />
              扫码
            </TabsTrigger>
            <TabsTrigger value="username" className="text-xs gap-1">
              <User className="w-3.5 h-3.5" />
              账号
            </TabsTrigger>
            <TabsTrigger value="telegram" className="text-xs gap-1">
              <Send className="w-3.5 h-3.5" />
              Telegram
            </TabsTrigger>
          </TabsList>

          {/* QR Code Login */}
          <TabsContent value="qrcode" className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                打开悦享按摩 APP 扫描二维码登录
              </p>
              <div className="inline-block p-4 bg-card border border-border rounded-2xl">
                <div className="w-48 h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm text-foreground">
                  QR Code: {qrSessionId.slice(0, 12)}...
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={refreshQrCode}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  刷新二维码
                </button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={simulateQrScan}
                disabled={qrScanning}
              >
                {qrScanning ? "等待确认..." : "模拟扫码（演示）"}
              </Button>
            </div>
          </TabsContent>

          {/* Username Login */}
          <TabsContent value="username" className="space-y-4">
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="请输入用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              {isRegister && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="请再次输入密码"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}
            </div>
            <Button variant="hero" className="w-full rounded-xl" onClick={handleUsernameLogin}>
              {isRegister ? "注册" : "登录"}
            </Button>
            <div className="text-center">
              <button
                onClick={() => { setIsRegister(!isRegister); setUsername(""); setPassword(""); setConfirmPassword(""); }}
                className="text-sm text-primary hover:underline"
              >
                {isRegister ? "已有账号？去登录" : "没有账号？去注册"}
              </button>
            </div>
          </TabsContent>

          {/* Telegram Login */}
          <TabsContent value="telegram" className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[hsl(200,80%,50%)]/10 rounded-full flex items-center justify-center mx-auto">
                <Send className="w-10 h-10 text-[hsl(200,80%,50%)]" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Telegram 登录</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  使用 Telegram 账号快速登录，安全便捷
                </p>
              </div>
              <Button
                className="w-full rounded-xl"
                onClick={handleTelegramLogin}
              >
                <Send className="w-4 h-4 mr-2" />
                使用 Telegram 登录
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
