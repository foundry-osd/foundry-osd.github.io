---
title: Build from Source
---

# Build from source

This page is for contributors and validation work. Normal users should install Foundry OSD from the latest release instead of building from source.

Foundry Project currently spans multiple repositories in the workspace:

- `foundry`
- `catalog`

## Build the desktop and WinPE applications

From the `foundry` repository:

```powershell
dotnet build .\src\Foundry.slnx
```

Run the unit tests:

```powershell
dotnet test .\src\Foundry.slnx
```

Run Foundry OSD:

```powershell
dotnet run --project .\src\Foundry\Foundry.csproj
```

Source runs are for development and validation only. They do not exercise the installed Velopack update path used by release MSI installations.

## Release packaging

Release packaging is handled by GitHub Actions and Velopack. Normal users should install `FoundrySetup-x64.msi` or `FoundrySetup-arm64.msi` from the latest GitHub release instead of building from source.

## When you also need catalog context

The `catalog` repository contains the scripts and generated XML outputs that explain what the deployment runtime will consume. You usually do not need to rebuild those feeds for a UI-only change, but they are important when you are validating deployment data behavior.
