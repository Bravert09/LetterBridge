'use client'
import { useState } from "react"
import { getTodayWordsAction } from "@/actions/learning"
import { submitWordResultAction } from "@/actions/learning"


export default function StudyPage() {
  const [word, setWord] = useState<any>(null)

  async function handleAnswer(isCorrect: boolean) {
    await submitWordResultAction(
      'test-user-1',
      word.id,
      isCorrect
    )
    
    const next = await getTodayWordsAction('test-user-1')
    console.log(next)
    setWord(next[0])
  }

  return (
    <div>
      <h1>{word?.word}</h1>
      <button onClick={() => handleAnswer(true)}>认识</button>
      <button onClick={() => handleAnswer(false)}>不认识</button>
    </div>
  )
}
