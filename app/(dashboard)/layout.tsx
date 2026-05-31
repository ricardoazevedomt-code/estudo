import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="dash-root">
      <Sidebar user={session.user} />
      <main className="dash-main">
        <div className="dash-content">{children}</div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
