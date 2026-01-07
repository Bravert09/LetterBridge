import { initUserWordProgress } from "@/lib/initUserWordProgress";
import { getCurrentUser } from "@/lib/dal";
import { getTodayWordsAction } from "@/actions/learning";
import WordPage from "../words/page";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    return "Oops! no user to memorize";
  }

  await initUserWordProgress(user.id);

  const words = await getTodayWordsAction(user.id);
  if (!words) {
    return "Oops! no words to memorize";
  }

  return (
    <div>
      DashboardPage
      <WordPage words={words} userId={user.id}/>
    </div>
  );
}
