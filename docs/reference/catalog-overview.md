---
title: Catalog Overview
description: Understand the catalog feeds used by Foundry OSD and Foundry Deploy.
---

# Catalog overview

The `catalog` repository produces XML feeds consumed by Foundry Project.

## Main outputs

| Feed | Used by |
| --- | --- |
| `Cache/OS/OperatingSystem.xml` | Foundry Deploy and some Foundry OSD preparation paths |
| `Cache/DriverPack/DriverPack_Unified.xml` | Foundry Deploy |
| `Cache/WinPE/WinPE_Unified.xml` | Foundry OSD |

## What the feeds support

- Operating system choices in Foundry Deploy.
- Driver pack choices in Foundry Deploy.
- WinPE asset preparation in Foundry OSD.

## Why catalog is separate

Keeping catalog generation separate allows metadata to be refreshed independently from the UI applications.

The runtime consumes normalized XML outputs instead of hardcoding vendor-specific metadata.

## Next step

Open [Deployment Flow](../deploy/deployment-flow) to see where catalog-backed choices appear.
