import Image from "next/image";

export default function PricePage() {
  return (
    <div className="m-16">
      <Image 
        src="/win.webp" // 本地 public 文件夹下的图片
        alt="Logo"
        width={600} // 必须指定宽
        height={100} // 必须指定高
        className="mx-auto "
      />
    </div>
  );
}
