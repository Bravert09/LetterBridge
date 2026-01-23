"use client";

import { use, useState, useTransition } from "react";
import { submitWordResultAction } from "@/actions/learning";
import { Button } from "./ui/button";
import { useEffect } from "react";


// 把原 WordPage 改名为 Client Component：
export default function WordPageClient({
  words,
  userId,
}: {
  words: any[];
  userId: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [showMeaning, setShowMeaning] = useState(false);

   // 页面加载时从 localStorage 读取上次进度
  useEffect(() => {
    const savedIndex = Number(localStorage.getItem("todayWordIndex") || 0);
    if (savedIndex < words.length) {
      setCurrentIndex(savedIndex);
    } else {
      setCurrentIndex(0);
    }
  }, [words]);

  const currentWord = words[currentIndex];

  // function handleAnswer(isCorrect: boolean) {
  //   submitWordResultAction(userId, currentWord.id, isCorrect);
  //   setCurrentIndex((prev) => prev + 1);
  // }
  function handleAnswer(isCorrect: boolean) {
    startTransition(async () => {
      await submitWordResultAction(userId, currentWord.id, isCorrect);
      setShowMeaning(false);
      
      const newIndex=currentIndex+1
      setCurrentIndex(newIndex);
      localStorage.setItem('todayWordIndex',String(newIndex))
      
    });
  }
  //处理读句猜词，显示词义,toggle 本质就是“取反”
function toggleShowMeaning(){
    setShowMeaning((prev) => !prev);
}
  if (!currentWord) {
    return "Hurray! 今天背完了";
  }

  return (
    <div>
      {currentWord && (
        <section>
          <h2 className="text-2xl font-bold">{currentWord.word}</h2>
          <p className="pb-4">{currentWord.symbol}</p>
          {showMeaning ? (
            <Button className="mb-4" variant='secondary'>{currentWord.meaning}</Button>

          ) : (
            <Button onClick={toggleShowMeaning} className="mb-4" variant='outline' >读句猜词</Button>
          )}

          <p>{currentWord.example}</p>

          <div className="py-4">
            {" "}
            <Button onClick={() => handleAnswer(true)} className="mr-4">
              认识
            </Button>
            <Button onClick={() => handleAnswer(false)} variant="outline">
              不认识
            </Button>
          </div>
        </section>
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

// toggle失败的原因
//变量作用域与持久化：你使用了 let isKnown = false。在 React 中，每次组件重新渲染（比如你点击按钮或切换单词），这个变量都会被重新初始化为 false。
//触发渲染：改变一个普通的 JavaScript 变量（如 let）不会通知 React 重新渲染页面。你需要使用 useState。
