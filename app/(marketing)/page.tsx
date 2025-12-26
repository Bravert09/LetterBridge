import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto text-center m-16 mt-32">
      <h1 className="font-extrabold text-6xl my-4 text-primary">LetterBridge</h1>
      <p className="text-accent-foreground text-xl my-4">Turn Initial Letters into Full Marks</p>
      <Link href='/exercise'>
      <Button size='lg'>Get started</Button>
      </Link>
    </div>
  );
}
