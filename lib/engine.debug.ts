//Node.js 本身完全不支持 @/ 这种路径别名。
type progressRecord = {
  status: 'new' | 'learning' | 'review' | 'mastered'
  familiarity: number
  rightCount: number
  wrongCount: number
}

function applyResult(
  record: progressRecord,
  isCorrect: boolean,
 
):progressRecord {
  // 只处理状态、familiarity、nextReview
  if(isCorrect){
    return{
        ...record,
        familiarity:record.familiarity+1,
        rightCount:record.rightCount+1
    }
  }
return{
    ...record,
    familiarity:Math.max(0,record.familiarity-1),
    wrongCount:record.wrongCount+1,
}
}
const before: progressRecord= {
  status: "learning",
  familiarity: 3,
  rightCount: 2,
  wrongCount: 0,
};

const isCorrect=true
const after=applyResult(before,isCorrect)

console.log('before:',before)
console.log('after:',after)



