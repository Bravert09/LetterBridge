import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core'

// ------------------
// Users table
// ------------------
export const users = pgTable('users', {
  id: text('id').primaryKey(), // ✅ 自增整数
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ------------------
// Words table
// ------------------
export const words = pgTable('words', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 100 }).notNull(),
  symbol: varchar('symbol', { length: 50 }),             // 音标，可为空
  class: varchar('class', { length: 20 }),               // 词性，可为空
  meaning: text('meaning').notNull(),
  example: text('example'),
  level: integer('level').notNull().default(1),
})

// ------------------
// User Word Progress table
// ------------------
export const userWordProgress = pgTable('user_word_progress', {
  id: serial('id').primaryKey(),

  // 外键，必须和 users.id 类型一致（integer）
  userId: text('user_id')
    .notNull()
    .references(() => users.id),

  // 外键，必须和 words.id 类型一致（integer）
  wordId: integer('word_id')
    .notNull()
    .references(() => words.id),

  status: varchar('status', { length: 20 })
    .$type<'new' | 'learning' | 'review' |'mastered'>()
    .notNull()
    .default('new'),

  familiarity: integer('familiarity').notNull().default(0),

  lastReviewed: timestamp('last_reviewed'),

  nextReview: timestamp('next_review'),

  rightCount: integer('right_count').notNull().default(0),

  wrongCount: integer('wrong_count').notNull().default(0),
})


// 外键 = 约束 + 关联:保证数据一致性
// 在你的背单词工具里，保证每条学习进度都对应真实用户和真实单词

//因为 $type<...>() 只作用于 TypeScript 类型系统，
//不会生成任何 SQL、不会修改表结构、不会影响 migration，