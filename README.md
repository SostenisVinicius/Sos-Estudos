# bb-study-tracker

SPA estática para acompanhar estudos do concurso Banco do Brasil (Escriturário TI), com foco em offline-first e produtividade.

## Stack
- Vite + React + TypeScript
- TailwindCSS
- Recharts
- Zod
- IndexedDB (idb) com fallback localStorage

## Setup local
```bash
npm install
npm run dev
```

## Funcionalidades principais
- Rotas: Dashboard, Diário, Semanas, Caderno de Erros, Redações, Simulados, Configurações.
- Persistência local automática com debounce (400ms) e indicador de "Salvo".
- Backup/restore em JSON com validação de schema e modos **replace** ou **merge**.
- Modo escuro, atalhos (`N`, `/`, `E`) e modo foco no Diário.
- Seed inicial com 3 dias preenchidos.

## Backup / Restore
1. Clique em **Exportar backup** para gerar um JSON único.
2. Clique em **Importar** e selecione o arquivo.
3. Confirme o modo:
   - **Substituir tudo** (`replace`)
   - **Mesclar** (`merge`)

## Deploy no GitHub Pages
1. Suba o projeto para o GitHub.
2. Em **Settings > Pages**, selecione **GitHub Actions** como source.
3. Garanta branch `main` para trigger automática.
4. O workflow `.github/workflows/deploy.yml` fará build e deploy.

> O `vite.config.ts` já está com `base` ajustado para Pages (`/Sos-Estudos/`).
