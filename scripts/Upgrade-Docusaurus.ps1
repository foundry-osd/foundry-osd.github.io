param(
    [switch]$SkipValidation
)

$ErrorActionPreference = 'Stop'

$packages = @(
    '@docusaurus/core@latest',
    '@docusaurus/faster@latest',
    '@docusaurus/preset-classic@latest',
    '@docusaurus/module-type-aliases@latest',
    '@docusaurus/types@latest',
    '@docusaurus/tsconfig@latest'
)

Write-Host 'Upgrading Docusaurus packages...'
npm install @packages

if ($SkipValidation) {
    Write-Host 'Upgrade completed. Validation was skipped.'
    exit 0
}

Write-Host 'Running production build...'
npm run build

Write-Host 'Running typecheck...'
npm run typecheck

Write-Host 'Docusaurus upgrade and validation completed.'
