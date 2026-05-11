---
title: Requirements
description: Download Foundry OSD and prepare the workstation prerequisites required to create deployment media.
---

# Requirements

Use this page to download Foundry OSD and prepare the admin workstation before creating deployment media.

## Download Foundry OSD

Install the latest release that matches the workstation architecture.

| Architecture | Installer | Download |
| --- | --- | --- |
| x64 | `Foundry-win-x64.msi` | [Download x64](https://github.com/foundry-osd/foundry/releases/latest/download/Foundry-win-x64.msi) |
| ARM64 | `Foundry-win-arm64.msi` | [Download ARM64](https://github.com/foundry-osd/foundry/releases/latest/download/Foundry-win-arm64.msi) |

Use [all releases](https://github.com/foundry-osd/foundry/releases) when you need release notes, checksums, or older builds.

:::tip[Use release builds]
Use the MSI release build for normal deployment work. Build from source only when you are contributing to Foundry Project or validating local changes.
:::

## Workstation requirements

Prepare an admin workstation with:

- Windows 10 or Windows 11
- Local administrator rights
- Internet access
- Windows ADK `10.1.26100.2454` or later with the latest servicing patch
- Windows PE add-on for the same ADK release

Foundry OSD can help install or upgrade the ADK components when they are missing or incompatible.

## Runtime dependencies

The MSI installer bootstraps the desktop runtime dependencies required by Foundry OSD:

- .NET Desktop Runtime
- Microsoft Edge WebView2 Runtime
- Microsoft Visual C++ runtime

## ADK readiness

Foundry OSD checks the ADK state before media creation. If the required ADK components are missing or incompatible, the main window shows an action banner.

When the banner appears:

1. Select `Install ADK` when no compatible ADK is installed.
2. Select `Upgrade ADK` when the installed version is incompatible.
3. Wait for verification to finish.
4. Continue only after media creation actions are enabled.

:::warning[Match ADK and WinPE versions]
Use the Windows ADK and Windows PE add-on from the same release. Foundry OSD expects Windows ADK `10.1.26100.2454` or later.
:::

![Foundry OSD requirements ready state](/img/docs/foundry-osd/requirements-ready.png)

## Deployment scope

The current deployment scope is centered on Windows 11:

- Windows 11 `23H2`
- Windows 11 `24H2`
- Windows 11 `25H2`
- x64 and ARM64 deployment media

WinPE driver injection in Foundry OSD currently exposes these media driver vendor options:

- Dell
- HP

Deployment-time driver pack choices are loaded later in Foundry Deploy from the current catalog.

## What each requirement supports

| Requirement | Why it matters |
| --- | --- |
| Windows ADK and WinPE add-on | Required to create and customize WinPE-based media |
| Local administrator rights | Required for ADK management and USB provisioning |
| Internet access | Required for downloads, release assets, and catalog-backed workflows |

## Next step

Continue to [Quick Start](./quick-start).
