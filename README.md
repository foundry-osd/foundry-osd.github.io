# Foundry Website

This repository hosts the Docusaurus documentation and blog for Foundry.

## Local development

```powershell
npm ci
npm start
```

## Production build

```powershell
npm run build
npm run serve
```

## Upgrade Docusaurus

```powershell
npm run upgrade:docusaurus
```

Skip validation if needed:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\Upgrade-Docusaurus.ps1 -SkipValidation
```

## Content structure

- `docs/`: user and developer documentation
- `blog/`: project posts and architecture notes
- `src/`: homepage and theme-level React components
- `static/`: static assets used by the site
