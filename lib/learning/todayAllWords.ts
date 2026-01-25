import { and, eq, gte, lte } from "drizzle-orm"
import { db } from "@/db/db"
import { userWordProgress } from "@/db/schema"

export async function getTodayRecitedWords(userId: string) {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999)
  const todayRecitedWords=await db.query.userWordProgress.findMany({
    where: and(
      eq(userWordProgress.userId, userId),
      gte(userWordProgress.lastReviewed, startOfToday),
      lte(userWordProgress.lastReviewed, endOfToday),
    ),
    with: {
      word: true, // 关联 words 表
    },
    orderBy: (t, { asc }) => asc(t.lastReviewed),
  })

  return todayRecitedWords
}
