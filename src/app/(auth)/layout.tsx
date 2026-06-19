export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <main id="main-content" role="main">{children}</main>
    </div>
  );
}
