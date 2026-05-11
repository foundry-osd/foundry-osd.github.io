---
title: Debug WinPE Testing
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

## What the helper script actually sets

When you run `Enable-LocalWinPeDeploy.ps1`, it enables debug runtime overrides and sets the project paths that `Foundry` uses later during media staging:

- `FOUNDRY_WINPE_DEBUG_CONNECT=1`
- `FOUNDRY_WINPE_DEBUG_CONNECT_PROJECT=<repo>\\src\\Foundry.Connect\\Foundry.Connect.csproj`
- `FOUNDRY_WINPE_DEBUG_DEPLOY=1`
- `FOUNDRY_WINPE_DEBUG_DEPLOY_PROJECT=<repo>\\src\\Foundry.Deploy\\Foundry.Deploy.csproj`

If you also provide archive paths, the script sets these optional overrides:

- `FOUNDRY_WINPE_DEBUG_CONNECT_ARCHIVE`
- `FOUNDRY_WINPE_DEBUG_DEPLOY_ARCHIVE`

That means debug testing can be driven from project builds, from prebuilt archives, or from a mix of both.

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

:::info[Screenshot placeholder]
Add a capture of the terminal after `Enable-LocalWinPeDeploy.ps1` runs, with the debug override environment variables visible.
:::
