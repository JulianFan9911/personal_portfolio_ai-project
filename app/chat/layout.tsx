import Navigation from "@/app/_components/layouts/Navigation";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navigation />
      <div className="pt-20">{children}</div>
    </div>
  );
}
