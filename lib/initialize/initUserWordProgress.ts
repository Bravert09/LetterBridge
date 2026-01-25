import { db } from "@/db/db";
import {words,userWordProgress} from '@/db/schema'
import {eq} from 'drizzle-orm'

const initWordCount=999 //初始给用户多少词

export async function initUserWordProgress(userId:string){
//1.是否已经初始化过
const existing=await db
.select({id:userWordProgress.id}) //SELECT,要查哪些列
.from(userWordProgress) //FROM 哪张表
.where(eq(userWordProgress.userId,userId)) //WHERE 过滤条件
.limit(1) //最多只要一条,我不是为了拿数据,只是为了 判断是否存在

if(existing.length>0){
    return {initialized:false}
}

//2.按照words表中，id顺序取词
const baseWords=await db
.select({id:words.id})
.from(words)
.orderBy(words.id)//默认升序 ASC
.limit(initWordCount)

if(baseWords.length===0){
    throw new Error('No words found to initialize')
}
//3.组装批量插入数据
const rows=baseWords.map(w=>({ 
    userId,
    wordId:w.id,
    status:'new' as const,
    familarity:0,
    rightCount:0,
    wrongCount:0,
    lastReview:null,
    nextReview:null,
}))
 //4.批量插入
 await db.insert(userWordProgress).values(rows)

 return {
    initialized:true,
    count:rows.length,
 }
}

