---
title: Overview
description: Start here to understand Foundry Project, install Foundry OSD, and follow the normal deployment workflow.
sidebar_position: 1
---

# Foundry Project overview

Foundry Project helps you create bootable Windows deployment media, validate WinPE networking, and run a guided deployment workflow.

Most users only need this path:

1. Install **Foundry OSD** on an admin workstation.
2. Create ISO or USB deployment media.
3. Boot the target device.
4. Let the bootstrap open **Foundry Connect** to validate networking.
5. Let the bootstrap open **Foundry Deploy** and run the deployment workflow.

:::tip[Start here]
Open [Requirements](./start/requirements) first, then follow [Quick Start](./start/quick-start).
:::

## Application surfaces

| Surface | Runs where | What the user does |
| --- | --- | --- |
| **Foundry OSD** | Admin workstation | Check prerequisites, configure deployment behavior, and create ISO or USB media |
| **Foundry Connect** | WinPE on the target device | Validate or select network connectivity before deployment continues |
| **Foundry Deploy** | WinPE on the target device | Select deployment options and start the Windows deployment |

## Documentation paths

- [Start Here](./start/requirements): install Foundry OSD and complete the first deployment.
- [Build Media](./build-media/standard-workflow): create ISO or USB deployment media.
- [Connect](./connect/network-readiness): validate runtime networking before deployment.
- [Deploy](./deploy/deployment-flow): select deployment options and run the Windows deployment.
- [Configure Deployment](./configure/expert-mode): use expert settings only when the standard path is not enough.
- [Reference](./reference/product-boundaries): review product boundaries and runtime behavior.
- [Technical Deep Dives](./technical): read implementation-level details for advanced troubleshooting and maintainers.

## What to read next

Open [Quick Start](./start/quick-start) for the shortest guided workflow.
