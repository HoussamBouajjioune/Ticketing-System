import { useAuth } from "../../store/auth";
import LogoutButton from "../common/LogoutButton";
export default function DashboardLayout({ children, title = 'Dashboard' }) {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen font-sans">
      <aside className="w-55 bg-slate-900 text-white p-5 flex flex-col justify-between hover:cursor-default">
        <div>
          <h2 className="m-0 text-lg">Ticketing</h2>
          <nav className="mt-5">
            <div className="mt-5">
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>ID:</strong> {user.id}</p>
            </div>
          </nav>
        </div>

        <div className="mt-5">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 bg-slate-50 p-6">
        <header className="mb-5 flex justify-between items-center">
          <h1 className="m-0">{title}</h1>
        </header>
        <section>
          {children}
        </section>
      </main>
    </div>
  );
}