import "dotenv/config"; // 必须在导入 db 之前
// 原代码：import { db } from "@/db/db";
import { db } from "../db/db";
//TypeScript 不允许直接导入带有 .ts 扩展名的文件，而是期望你导入不带扩展名的模块名（例如 import { db } from "../db/db"）

import { users, words, userWordProgress } from "../db/schema";
import fs from "fs";
import csvParser from "csv-parser";
import bcrypt from "bcryptjs";

async function seed() {
  // 【修改】连 users 一起清空（测试用）
  // await db.delete(userWordProgress);
  // await db.delete(words);
  // await db.delete(users);
  // console.log("Old users, words & progress cleared");

  console.log("Starting seed...");

  // 1️⃣ 读取 CSV
  const wordData: any[] = [];
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(__dirname + "/words.csv")
      .pipe(csvParser())
      .on("data", (row) => {
        wordData.push({
          word: row.word,
          symbol: row.symbol || null,
          class: row.class || null,
          meaning: row.meaning,
          example: row.example || null,
          level: row.level,
        });
      })
      .on("end", () => {
        console.log("CSV loaded:", wordData.length, "words");
        resolve();
      })
      .on("error", reject);
  });

  // 2️⃣ 插入单词
  await db.insert(words).values(wordData);
  console.log("Inserted words");

  // 3️⃣ 创建测试用户
  const testUser = {
    id: "test-user-001",
    email: "test@example.com",
    password: await bcrypt.hash("password123", 10),
    created_at: new Date(),
  };
  await db.insert(users).values(testUser);
  console.log("Created test user");

  // 4️⃣ 获取插入的单词 ID
  const insertedWords = await db.select().from(words);

  // 5️⃣ 初始化 progress
  const progressData = insertedWords.map((w) => ({
    userId: testUser.id, // 对应表字段 userId
    wordId: w.id, // 对应表字段 wordId
    status: "new" as const, // 必须是 'new' | 'learning' | 'mastered'
    familiarity: 0, // 初始熟悉度
    lastReviewed: null, // 尚未复习
    nextReview: null, // 尚未安排复习
    rightCount: 0, // 初始答对次数
    wrongCount: 0, // 初始答错次数
  }));

  // 批量插入 progress
  await db.insert(userWordProgress).values(progressData);
  console.log("Initialized user progress for", progressData.length, "words");

  console.log("Seed finished!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
});
