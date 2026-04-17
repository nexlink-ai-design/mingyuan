'use client';
import { useEffect, useState } from 'react';

export default function CookieChecker({ children }) {
  const [isCookieDisabled, setIsCookieDisabled] = useState(false);

  useEffect(() => {
    // 尝试写入一个测试 Cookie
    document.cookie = "testcookie=1";
    const cookieEnabled = document.cookie.indexOf("testcookie") !== -1;
    
    if (!cookieEnabled) {
      setIsCookieDisabled(true);
    }
  }, []);

  if (isCookieDisabled) {
    return (
      <div className="p-4 bg-red-100 text-red-700">
        您的浏览器禁用了 Cookie，请开启后以使用完整功能。
      </div>
    );
  }

  return children;
}
