import { db } from "@/db/db";
import { userDailyLearning } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// Action 1：查询今天是否已经完成
export async function getTodayLearningStatus(userId: string) {
  const today = new Date().toISOString().slice(0, 10);

  const record = await db.query.userDailyLearning.findFirst({
    where: and(
      eq(userDailyLearning.userId, userId),
      eq(userDailyLearning.learningDate, today),
    ),
  });

 
  return record?.status ?? "not_started";
}
// Action 2：开始今天第一组（或点击“再背一组”）
export async function startTodayLearningAction(userId: string) {
  const today = new Date().toISOString().slice(0, 10);

  /**
   * 如果今天已经有记录，就什么都不做
   * 防止刷新页面时重复插入
   */
  const existing = await db.query.userDailyLearning.findFirst({
    where: and(
      eq(userDailyLearning.userId, userId),
      eq(userDailyLearning.learningDate, today),
    ),
  });

   if (existing) return existing

  /**
   * 创建今天的学习记录
   * 默认状态：in_progress
   */
  await db.insert(userDailyLearning).values({
    userId,
    learningDate: today,
    status: 'in_progress',
  })
}

// Action 3：今天这一组背完了（关键）,在客户端调用Reciting.tsx
export async function finishTodayLearning(userId:string) {
     const today = new Date().toISOString().slice(0, 10)

     await db
     .update(userDailyLearning)
     .set({
        status:'finished',
     })
     .where(
        and(
            eq(userDailyLearning.userId,userId),
            eq(userDailyLearning.learningDate,today)
        ),
     )
  
}

export async function restartTodayLearningAction(userId:string){
 const today = new Date().toISOString().slice(0, 10);

  await db
    .update(userDailyLearning)
    .set({ status: "in_progress" })
    .where(
      and(
        eq(userDailyLearning.userId, userId),
        eq(userDailyLearning.learningDate, today)
      )
    );
}