import NavBar from "../components/Navigation";
export const dynamic = "force-dynamic"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <main className="pl-16 md:pl-64 min-h-screen ">
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div></main>
    </div>
  );
}
