import { db } from "@/db/db";
import { userDailyLearning } from "@/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * 确保「今天」的学习记录存在
 * - 如果不存在：创建一条
 * - 如果已存在：什么都不做
 */
export async function initTodayLearningRecord(userId: string) {
  // 1️⃣ 只取“日期”，不要时间
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // 2️⃣ 查询今天是否已有记录
  const existing = await db
    .select({ id: userDailyLearning.id })
    .from(userDailyLearning)
    .where(
      and(
        eq(userDailyLearning.userId, userId),
        eq(userDailyLearning.learningDate, today),
      ),
    )
    .limit(1);

  // 3️⃣ 已存在 → 直接返回（幂等）
  if (existing.length > 0) {
    return;
  }

  // 4️⃣ 不存在 → 创建今天的记录
  try {
    await db.insert(userDailyLearning).values({
      userId,
      learningDate: today,
      status: "in_progress",
      batchCount: 1,
    })
     // ⭐ 关键修改点：
    // 如果 (userId, learningDate) 已存在
    // 数据库直接忽略本次插入，不再抛唯一约束错误
    .onConflictDoNothing({
      target: [
        userDailyLearning.userId,
        userDailyLearning.learningDate,
      ],
    });
  } catch (e) {
    console.error("DE ERROR:", e);
    throw e;
  }
}
