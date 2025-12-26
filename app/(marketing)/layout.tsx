import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="px-8 py-4 flex items-center justify-between bg-amber-200 ">
        <nav className="flex items-center gap-4">
          <Link href="/" className="bg-white p-1 rounded-full">
            <Image
              src="/logo.svg" // 本地 public 文件夹下的图片
              alt="Logo"
              width={40} // 必须指定宽
              height={40} // 必须指定高
              className="mx-auto "
            />
          </Link>

          <div className="flex gap-6">
            <Link href="/features">攻略</Link>
            <Link href="/price">目标</Link>
            <Link href="FAQ">联系</Link>
          </div>
        </nav>

        <div className="flex">
          <div className="mr-2">
            <Link href="/signin">
              <Button variant="outline">Sign in</Button>
            </Link>
          </div>
          <div>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-140 bg-amber-100">footer</footer>
    </div>
  );
}
