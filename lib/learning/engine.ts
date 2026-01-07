//← 核心学习引擎（纯函数）
//submitWordResult(userId, wordId, result)更新：familiarityright / wrongnextReviewstatus

import { db } from "@/db/db";
import { userWordProgress } from "@/db/schema";
import { and, eq, lte, asc } from "drizzle-orm";

//Step1：常量，学习规则配置

const reviewIntervalMap: Record<number, number> = {
  1: 0, //L1:当天
  2: 0, //L2:当天
  3: 1, //L3:第二天
  4: 1, // L4: 第三天
  5: 3, //R1
  6: 7, //R2
  7: 14, //R3
};

//根据familiarity计算下次复习时间
function calcNextReview(familiarity: number) {
  const days = reviewIntervalMap[familiarity] ?? 30;
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next;
}

//Step2: 获取今日学习单词

//Step3: 提交学习结果（状态机核心）
export async function submitWordResult(params: {
  userId: string;
  wordId: number;
  isCorrect: boolean;
}) {
  const { userId, wordId, isCorrect } = params;

  console.log("[submitwordresult] input:", userId, wordId);

  const record = await db.query.userWordProgress.findFirst({
    where: and(
      eq(userWordProgress.userId, userId),
      eq(userWordProgress.wordId, wordId)
    ),
  });
  console.log("[submitwordresult] db record:", record);

  if (!record) {
    throw new Error("Word progress not found");
  }

  const now = new Date();
  if (isCorrect) {
    const newFamiliarity = record.familiarity + 1;
    let newStatus = record.status;

    //new-learning
    if (record.status === "new") {
      newStatus = "learning";
    }
    if (newFamiliarity >= 4) {
      newStatus = "review";
    }
    if (newFamiliarity >= 8) {
      newStatus = "mastered";
    }
    await db
      .update(userWordProgress)
      .set({
        status: newStatus,
        familiarity: newFamiliarity,
        rightCount: record.rightCount + 1,
        lastReviewed: now,
        nextReview: calcNextReview(newFamiliarity),
      })
      .where(eq(userWordProgress.id, record.id));
    return;
  }
  await db
    .update(userWordProgress)
    .set({
      familiarity: Math.max(1, record.familiarity - 1),
      //Math.max(a, b) 是 JavaScript 的标准函数，作用是返回两个数中较大的那一个。
      wrongCount: record.wrongCount + 1,
      lastReviewed: now,
      nextReview: calcNextReview(Math.max(1, record.familiarity - 1)),
    })
    .where(eq(userWordProgress.id, record.id));
}

// Notes
// ?? 被称为 空值合并运算符 (Nullish Coalescing Operator)。
// 它的作用非常简单：“如果左边的值是 null 或 undefined，就取右边的值。”
