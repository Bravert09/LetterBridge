export const dynamic = "force-dynamic";

import { initUserWordProgress } from "@/lib/initialize/initUserWordProgress";
import { getCurrentUser } from "@/lib/dal";
import { getTodayWordsAction} from "@/app/actions/learning";
import RecitingCompo from "../components/Reciting";
import { redirect } from "next/navigation";
import { initTodayLearningRecord } from "@/lib/initialize/initTodayLearningRecord";
import {
  getTodayLearningStatus,
  startTodayLearningAction,
  restartTodayLearningAction,
} from "@/lib/learning/batch";
import { Button } from "../components/ui/button";



export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signin");
    return "Oops! no user to memorize";
  }  
  const todayRecord = await getTodayLearningStatus(user.id);
  if (todayRecord=='not_started') {
    await initTodayLearningRecord(user.id);
    await startTodayLearningAction(user.id);

    const words = await getTodayWordsAction(user.id);
    if (!words) {
      return "Oops! no words to memorize";
    }
    return (
      <div>
        <RecitingCompo words={words} userId={user.id} />
     
      </div>
    );
  }

  if (todayRecord === "in_progress") {
    const words = await getTodayWordsAction(user.id);
    if (!words) {
      return "Oops! no words to memorize";
    }
    return (
      <div>
        <RecitingCompo words={words} userId={user.id} />
        
      </div>
    );
  }

  if (todayRecord === "finished") {
    return (
      <div>
        <h2>本组单词已背完</h2>
        {/* 点击后将状态重置为 in_progress，再刷新页面进入背词流程 */}
        <form
          action={async () => {
            "use server";
            await restartTodayLearningAction(user.id);
          }}
        >
          <Button>再背一组</Button>
        </form>
      </div>
    );
  }
}
