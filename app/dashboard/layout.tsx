export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>navigation bar侧边栏</h1>
      {children}
    </div>
  );
}
