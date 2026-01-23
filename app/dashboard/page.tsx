export const dynamic = "force-dynamic"

import { initUserWordProgress } from "@/lib/initUserWordProgress";
import { getCurrentUser } from "@/lib/dal";
import { getTodayWordsAction } from "@/actions/learning";
import WordPageClient from "../components/pageClient";
import { redirect } from "next/navigation";
import Link from "next/link";
import Allwords from "../components/Allwords";


export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
   redirect('/signin')
    return "Oops! no user to memorize";
  }

  await initUserWordProgress(user.id);

  const words = await getTodayWordsAction(user.id);
  if (!words) {
    return "Oops! no words to memorize";
  }

  return (
    <div>
      <WordPageClient words={words} userId={user.id}/>
      <Allwords words={words} />
    </div>
  );
}
