export default function DashboardLayout({ children, title = 'Dashboard' }) {
  return (
    <div className="flex min-h-screen font-sans">
      <aside className="w-55 bg-slate-900 text-white p-5">
        <h2 className="m-0 text-lg">Ticketing</h2>
        <nav className="mt-5">
          <div className="my-2.5">
            <a className="text-slate-300 no-underline"
            //  href="/support"
             >Support</a>
          </div>
          <div className="my-2.5">
            <a className="text-slate-300 no-underline" 
            // href="/admin"
            >Admin</a>
          </div>
        </nav>
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