import { getTodayRecitedWords } from "@/lib/learning/todayAllWords"


export async function showTodayRecitedAction(userId: string) {
    return getTodayRecitedWords(userId)
}

