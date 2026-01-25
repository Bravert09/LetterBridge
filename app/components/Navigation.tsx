import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";
import { Suspense } from "react";

export default async function NavBar() {
  const user = await getCurrentUser();

  return (
    <aside className="fixed left-0 inset-y-0 w-16 bg-amber-50 md:w-64 hidden md:flex flex-col py-4 px-2 md:px-4">
      <div>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className=""
          />
        </Link>
      </div>

      <nav className="flex-1 flex flex-col space-y-1">
        <Link href="/dashboard">dashboard</Link>
        <br />
        <Link href="/words">今日已背单词</Link>
      </nav>

      <div className="pt-4 border-t border-gray-200 dark:border-dark-border-subtle">
        <Suspense
        >{user?.email}</Suspense>
       
        <div>Sign Out</div>
      </div>
    </aside>
  );
}

//flex-1 === flex-grow: 1
//在纵向 Flex 容器中，占用所有“剩余高度”
