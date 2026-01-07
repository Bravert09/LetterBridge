'use client'

import { useState,useTransition } from "react";
import { submitWordResultAction } from "@/actions/learning";
import { Button } from "../components/ui/button";

export default function WordPage({words,userId}:{
  words:any[],
  userId:string,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending,startTransition]=useTransition()

  const currentWord = words[currentIndex];

  // function handleAnswer(isCorrect: boolean) {
  //   submitWordResultAction(userId, currentWord.id, isCorrect);
  //   setCurrentIndex((prev) => prev + 1);
  // }
  function handleAnswer(isCorrect:boolean){
    startTransition(async()=>{
      await submitWordResultAction(userId,currentWord.id,isCorrect)
      setCurrentIndex((prev)=>prev+1)
    })
  }
  if (!currentWord){
    return 'Hurray! 今天背完了'
  }

  return (
    <div>
      {currentWord && (
        <div>
          <h2>{currentWord.word}</h2>
          <p>{currentWord.meaning}</p>

          <Button onClick={() => handleAnswer(true) } className="mr-4">认识</Button>
          <Button onClick={() => handleAnswer(false)}>不认识</Button>
        </div>
      )}
    </div>
  );
}

// 'use client' 组件 ❌ 不能是 async function
// Client Component ❌ 不能直接调用 Server Action（这种方式）
// Client Component ❌ 不应该 import Server Action 并当普通函数调用

// React 官方明确规定：
// 触发 Server Action 的更新，必须是 transition 更新
// useTransition 是 React 提供的一个 Hook，用来把某些状态更新标记为“低优先级的过渡更新（transition）”，
// 从而让 UI 保持响应，同时安全地触发 Server Action。