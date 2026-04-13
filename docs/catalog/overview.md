---
title: Catalog Overview
---

# Catalog overview

The `catalog` repository is not a UI application. It is an automation repository that produces the XML feeds consumed by the Foundry runtime.

## Main outputs

The most important generated files are:

- `Cache/OS/OperatingSystem.xml`
- `Cache/DriverPack/DriverPack_Unified.xml`
- `Cache/WinPE/WinPE_Unified.xml`

## What these feeds are used for

| Feed | Used by |
| --- | --- |
| Operating system catalog | `Foundry.Deploy` at deployment time, and `Foundry` when preparing the WinRE boot-image path |
| Unified driver pack catalog | `Foundry.Deploy` |
| Unified WinPE catalog | `Foundry` during WinPE asset preparation |

## Why the operating system feed appears in two places

The operating system catalog is primarily a deployment-time feed for `Foundry.Deploy`, where it becomes the selectable OS list for the operator.

`Foundry` also references that feed earlier when it prepares the optional WinRE boot-image path, so the desktop app and the WinPE deployment app stay aligned on supported operating system content.

## Why the repository is separate

Keeping catalog generation separate from the apps has clear benefits:

- Automation can refresh data independently
- UI repositories stay focused on application behavior
- The runtime consumes normalized outputs instead of vendor-specific source formats

## Source coverage

The catalog workflows include operating system metadata and multiple OEM driver pack sources.

That makes the deployment runtime less dependent on hardcoded or stale metadata.
