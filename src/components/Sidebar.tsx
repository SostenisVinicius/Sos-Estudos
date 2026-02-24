import { NavLink } from 'react-router-dom';

const links = [
  ['Dashboard', '/dashboard'],
  ['Diário', '/diario'],
  ['Semanas', '/semanas'],
  ['Caderno de Erros', '/erros'],
  ['Redações', '/redacoes'],
  ['Simulados', '/simulados'],
  ['Configurações', '/configuracoes'],
];

export const Sidebar = () => (
  <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-900 p-4 md:flex">
    <h1 className="mb-6 text-lg font-bold">bb-study-tracker</h1>
    <p className="mb-3 text-xs text-zinc-400">🔥 Streak: 4 dias</p>
    <nav className="space-y-2">
      {links.map(([label, path]) => (
        <NavLink key={path} to={path} className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-600' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);
