---
title: Architecture Overview
---

# Architecture overview

Foundry is split on purpose. The desktop app that authors media is not the same application as the WinPE runtime that performs deployment.

## Components

| Component | Runs where | Main role |
| --- | --- | --- |
| `Foundry` | Admin workstation | Manages ADK readiness, builds ISO or USB media, and stages runtime assets |
| `Foundry.Connect` | WinPE target device | Validates network readiness before bootstrap continues |
| `Foundry.Deploy` | WinPE target device | Loads catalogs, collects deployment choices, and executes deployment |
| `catalog` | Separate automation repository | Generates XML feeds for OS, driver pack, and WinPE metadata |

## Runtime sequence

The normal flow is:

1. `Foundry` verifies the workstation prerequisites and prepares the media.
2. The target device boots WinPE.
3. The bootstrap launches `Foundry.Connect`.
4. If connectivity and bootstrap conditions are satisfied, the bootstrap launches `Foundry.Deploy`.
5. `Foundry.Deploy` loads catalogs, resolves the deployment plan, and runs the steps in order.

## What Foundry stages into the image

During media creation, `Foundry` can stage:

- Bootstrap scripts
- `Foundry.Connect` configuration and network assets
- Optional `Foundry.Deploy` expert configuration
- Autopilot profiles
- Local runtime overrides for development workflows

## Why the split is useful

- The authoring workstation and the target device have different responsibilities.
- ADK management and media authoring stay in the desktop app.
- Network validation is isolated from the deployment workflow.
- Catalog consumption stays in the deployment runtime where it is needed.
- Development and debugging can target each product separately.

## Next step

Read [Product Boundaries](./product-boundaries) for a more explicit breakdown of what each part does and does not own.
