import type { Dispatch, SetStateAction } from 'react';
import type { AppState } from '../App';

export const ConfiguracoesPage = ({ state, setState, onExport }: { state: AppState; setState: Dispatch<SetStateAction<AppState>>; onExport: () => void }) => (
  <div className="card space-y-2">
    <h2 className="font-semibold">Configurações</h2>
    <label className="block text-sm">Meta de questões
      <input className="input" type="number" value={state.settings.dailyQuestionsGoal} onChange={(e) => setState((s) => ({ ...s, settings: { ...s.settings, dailyQuestionsGoal: Number(e.target.value) } }))} />
    </label>
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={state.settings.darkMode} onChange={(e) => setState((s) => ({ ...s, settings: { ...s.settings, darkMode: e.target.checked } }))} />
      Modo escuro
    </label>
    <button className="btn" onClick={onExport}>Exportar backup JSON</button>
    <p className="text-xs text-zinc-400">Atalhos: N (novo), / (busca), E (exportar).</p>
  </div>
);
