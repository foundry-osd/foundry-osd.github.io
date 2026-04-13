---
title: Build from Source
---

# Build from source

This project currently spans multiple repositories in the workspace:

- `foundry`
- `catalog`

## Build the desktop and WinPE applications

From the `foundry` repository:

```powershell
dotnet build .\src\Foundry.slnx
```

Run the desktop app:

```powershell
dotnet run --project .\src\Foundry\Foundry.csproj
```

## When you also need catalog context

The `catalog` repository contains the scripts and generated XML outputs that explain what the deployment runtime will consume. You usually do not need to rebuild those feeds for a UI-only change, but they are important when you are validating deployment data behavior.
