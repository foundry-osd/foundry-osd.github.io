---
title: Architecture Overview
description: Review the high-level runtime sequence behind Foundry OSD, Foundry Connect, and Foundry Deploy.
---

# Architecture overview

This page is reference material. Start with [Quick Start](../start/quick-start) when the goal is to deploy a device.

## Components

| Component | Runs where | Role |
| --- | --- | --- |
| Foundry OSD | Admin workstation | Checks prerequisites, builds media, and stages the Foundry Connect runtime |
| Foundry Connect | WinPE target device | Validates network readiness before deployment continues |
| Foundry Deploy | WinPE target device | Loads catalogs, collects deployment choices, and executes deployment |
| catalog | Separate automation repository | Generates XML feeds for operating system, driver pack, and WinPE metadata |

## Runtime sequence

1. Foundry OSD prepares ISO or USB media and provisions Foundry Connect for the selected architecture.
2. The target device boots WinPE.
3. Bootstrap launches Foundry Connect.
4. Foundry Connect validates network readiness.
5. Bootstrap resolves Foundry Deploy from release assets.
6. Foundry Deploy loads catalogs and runs the deployment workflow.

## Why the split exists

- Media authoring belongs on the admin workstation.
- Network readiness is validated before deployment starts.
- Deployment choices happen on the target device.
- Catalog data is produced independently and consumed by the runtime.

## Next step

Open [Product Boundaries](./product-boundaries) for a responsibility breakdown.
