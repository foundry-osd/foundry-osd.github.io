---
title: Product Boundaries
description: Understand what Foundry OSD, Foundry Connect, Foundry Deploy, and catalog each own.
---

# Product boundaries

Use this page when you need to understand which part of Foundry Project owns a behavior.

## Responsibility matrix

| Surface | Owns | Does not own |
| --- | --- | --- |
| Foundry OSD | ADK readiness, media creation, WinPE customization, expert settings, Foundry Connect staging, Autopilot tenant and media staging | Live deployment execution on the target device |
| Foundry Connect | Runtime network readiness, provisioned wired and Wi-Fi setup, bootstrap continuation | OS deployment logic, media authoring, or Microsoft Graph upload |
| Foundry Deploy | Catalog loading, target disk selection, OS selection, deployment execution, Autopilot hash capture and upload | Building the original ISO or USB media |
| catalog | XML feed generation for operating system, driver, and WinPE metadata | UI, media creation, or deployment execution |

## Practical rule

- If the user is preparing media on a workstation, it belongs to Foundry OSD.
- If the user is proving WinPE networking is ready, it belongs to Foundry Connect.
- If the user is selecting OS, disk, drivers, deployment options, or running Autopilot hash upload, it belongs to Foundry Deploy.

## Configuration handoff

Foundry OSD can stage runtime inputs for the other apps:

- Foundry Connect provisioning and network settings.
- Localization, Autopilot, and customization preferences for Foundry Deploy.

Autopilot hardware hash upload crosses all three runtime surfaces. Foundry OSD stages tenant-bound media assets, Foundry Connect verifies the network path before deployment starts, and Foundry Deploy captures and uploads the hash after Windows has been applied.

:::warning[Best-effort registration path]
Autopilot hardware hash upload is a best-effort WinPE registration path, not a Microsoft-documented replacement for standard Intune enrollment flows. Upload failures, expired certificates, and Microsoft Graph polling timeouts do not fail the Windows deployment. Local hash capture prerequisites can block only the Autopilot upload step.
:::

## Next step

Open [Architecture Overview](./architecture-overview) for the runtime sequence.
