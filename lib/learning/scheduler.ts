// ← 今日单词逻辑

import { db } from "@/db/db";
import { userWordProgress, words } from "@/db/schema";
import { and, eq, lte, isNull } from "drizzle-orm";
import { getSession } from "../auth";

const DAILY_LIMIT = 30;

// 定义一个通用的选择字段，保证复习词和新词结构一致
const wordFields = {
  id: words.id,
  word: words.word,
  meaning: words.meaning,
  example: words.example,
  level: words.level,
  symbol: words.symbol,
  class: words.class,
  status: userWordProgress.status, // 包含进度状态
};

export default async function getTodayWords() {
  const session = await getSession();
  if (!session) return null;
  const userId = session.userId;

  const now = new Date();

  //先找需要复习的
  const reviewWords = await db
    .select(wordFields)
    .from(userWordProgress)
    .innerJoin(words, eq(userWordProgress.wordId, words.id)) // 关联原词表
    .where(
      and(
        eq(userWordProgress.userId, userId),
        lte(userWordProgress.nextReview, now) //lte = less than or equal
      )
    )
    .orderBy(userWordProgress.nextReview) // 优先展示最该复习的
    .limit(DAILY_LIMIT);

  if (reviewWords.length >= DAILY_LIMIT) {
    return reviewWords;
  }
  //不够，补新词
  const need = DAILY_LIMIT - reviewWords.length;

  const newWords = await db
    .select(wordFields)
    .from(userWordProgress)
    .innerJoin(words, eq(userWordProgress.wordId, words.id))
    .where(
      and(
        eq(userWordProgress.userId, userId),
        eq(userWordProgress.status, "new")
      )
    )
    .limit(need);
    
    // const testResult=[...reviewWords, ...newWords]
    // console.log(testResult)
  return [...reviewWords, ...newWords];
}
