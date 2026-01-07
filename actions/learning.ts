'use server'
import { db } from "@/db/db";


// app/actions/getTodayWordsAction 获取今日学习单词
// app/actions/submitWordResultAction 提交一次学习结果（最核心）
// app/actions/getWordProgress.ts 获取某个单词当前状态（用于 debug）

import getTodayWords from "@/lib/learning/scheduler";
import { submitWordResult } from "@/lib/learning/engine";

export async function getTodayWordsAction(userId:string){
    return getTodayWords()
}

export async function submitWordResultAction(
  userId: string,
  wordId: number,
  isCorrect: boolean,
) {
  return submitWordResult({userId, wordId, isCorrect})
}

// submitWordResultAction(userId, wordId, isCorrect),传参错误，应该传对象
// app/actions/getWordProgress.ts

export async function getWordProgressAction(
  userId: string,
  wordId: number
) {
  return db.query.userWordProgress.findFirst({
    where: (t, { eq, and }) =>
      and(eq(t.userId, userId), eq(t.wordId, wordId)),
  })
}

