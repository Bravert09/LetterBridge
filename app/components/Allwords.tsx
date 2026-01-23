export default function Allwords({ words }: { words: any[] }) {
  return (
    <div>
      <h2>今日单词</h2>
      <ul>
        {words.map((word) => (
          <li key={word.id}>{word.id}.{word.word}</li>
        ))}
      </ul>
    </div>
  );
}
