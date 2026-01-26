export const dynamic = "force-dynamic";

import { showTodayRecitedAction } from "@/app/actions/showTodayRecited"
import { getCurrentUser } from "@/lib/dal";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function WordsPage(){
    const user= await getCurrentUser()
     if (!user) {
       redirect("/signin");
       return "Oops! no user to memorize";
     }  

    const allWords=await showTodayRecitedAction(user.id)
    return (

        <div>
            <Link href='/dashboard'>返回背单词</Link>

         <ul>
            {allWords.map((item)=>(
                <li key={item.id}>
                    {item.word.id}.
                    {item.word.word}
                    {item.word.example}
                </li>
            ))}
         </ul>
        </div>
        
    )
}