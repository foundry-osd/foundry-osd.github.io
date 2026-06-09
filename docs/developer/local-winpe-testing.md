---
title: Debug WinPE Testing
description: Use debug WinPE provisioning helpers to validate Foundry Connect and Foundry Deploy from local builds.
---

# Debug WinPE testing

This page is for contributors validating Foundry Connect and Foundry Deploy from local builds.

The repository includes helper scripts and debug provisioning support for testing the WinPE applications from a development environment.

## Publish helpers

The `foundry/scripts` directory includes:

- `Publish-FoundryConnect.ps1`
- `Publish-FoundryDeploy.ps1`

These scripts publish self-contained single-file builds for:

- `win-x64`
- `win-arm64`

## Debug override flow

The repository also includes `Enable-LocalWinPeDeploy.ps1`, which is intended for development workflows where the desktop app should embed or reference debug WinPE application builds instead of normal release assets.

## Runtime override contract

Foundry's media staging code reads these debug runtime override variables:

- `FOUNDRY_WINPE_DEBUG_CONNECT=1`
- `FOUNDRY_WINPE_DEBUG_CONNECT_PROJECT=<repo>\\src\\Foundry.Connect\\Foundry.Connect.csproj`
- `FOUNDRY_WINPE_DEBUG_DEPLOY=1`
- `FOUNDRY_WINPE_DEBUG_DEPLOY_PROJECT=<repo>\\src\\Foundry.Deploy\\Foundry.Deploy.csproj`

If you use archive paths instead of project publishing, set these optional overrides:

- `FOUNDRY_WINPE_DEBUG_CONNECT_ARCHIVE`
- `FOUNDRY_WINPE_DEBUG_DEPLOY_ARCHIVE`

Debug testing can be driven from project builds, from prebuilt archives, or from a mix of both. Archive overrides take precedence over project paths for the matching runtime.

:::warning[Helper script variable mismatch]
The current `Enable-LocalWinPeDeploy.ps1` helper exports `FOUNDRY_WINPE_LOCAL_*` variables, while the media staging code reads `FOUNDRY_WINPE_DEBUG_*` variables. Until the app source aligns that helper with the runtime override contract, set the `FOUNDRY_WINPE_DEBUG_*` variables directly in the shell that launches Foundry OSD.
:::

## Script inputs

`Enable-LocalWinPeDeploy.ps1` supports these parameters:

- `-ArchivePath` to reuse the same archive path for deploy when a deploy-specific path is not provided
- `-ConnectArchivePath` for a specific Foundry Connect archive
- `-DeployArchivePath` for a specific Foundry Deploy archive
- `-RunFoundry` to launch the desktop app after the environment variables are set

:::note[What this changes]
This helper does not change the normal release workflow. It only changes how the current shell session prepares debug WinPE payloads for development and validation.
:::

## Why this matters

This debug flow is useful when you are changing:

- Foundry Connect
- Foundry Deploy
- The WinPE bootstrap behavior
- The media staging logic in `Foundry`

## Scope of the debug flow

The debug override path exists for development and validation. It is not the normal user workflow and should not be confused with the release-based media creation path.
