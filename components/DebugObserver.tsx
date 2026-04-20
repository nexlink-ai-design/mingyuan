"use client";
import { useEffect } from "react";

export default function DebugObserver() {
  useEffect(() => {
    // 只有开发环境且在浏览器端才初始化
    // if (process.env.NODE_ENV === "development") {
      import("eruda").then((eruda) => {
        eruda.default.init();
      });
    // }
  }, []);

  return null;
}
