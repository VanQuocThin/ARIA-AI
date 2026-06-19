import { Sidebar } from "@/components/dashboard/Sidebar";
import { getProperty } from "@/lib/supabase/queries";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const property = await getProperty();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar plan={property?.plan ?? "free"} messagesUsed={property?.messages_used ?? 0} messagesQuota={property?.messages_quota ?? 200} />
      <main className="flex-1 ml-60 p-8">{children}</main>
    </div>
  );
}
