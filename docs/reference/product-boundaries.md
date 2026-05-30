---
title: Product Boundaries
description: Understand what Foundry OSD, Foundry Connect, Foundry Deploy, and catalog each own.
---

# Product boundaries

Use this page when you need to understand which part of Foundry Project owns a behavior.

## Responsibility matrix

| Surface | Owns | Does not own |
| --- | --- | --- |
| Foundry OSD | ADK readiness, media creation, WinPE customization, expert settings, Foundry Connect staging, Autopilot mode configuration, and media staging | Live deployment execution on the target device |
| Foundry Connect | Runtime network readiness, provisioned wired and Wi-Fi setup, bootstrap continuation | OS deployment logic, media authoring, or Microsoft Graph upload |
| Foundry Deploy | Catalog loading, target disk selection, OS selection, deployment execution, zero-touch Autopilot hash capture and upload, and interactive Autopilot assistant staging | Building the original ISO or USB media |
| catalog | XML feed generation for operating system, driver, and WinPE metadata | UI, media creation, or deployment execution |

## Practical rule

- If the user is preparing media on a workstation, it belongs to Foundry OSD.
- If the user is proving WinPE networking is ready, it belongs to Foundry Connect.
- If the user is selecting OS, disk, drivers, deployment options, running zero-touch Autopilot hash upload, or staging the interactive Autopilot assistant, it belongs to Foundry Deploy.

## Configuration handoff

Foundry OSD can stage runtime inputs for the other apps:

- Foundry Connect provisioning and network settings.
- Localization, Autopilot, and customization preferences for Foundry Deploy.

Autopilot behavior is mode-specific. Foundry OSD selects and stages the mode, Foundry Connect validates the runtime network path, and Foundry Deploy either stages a JSON profile, runs zero-touch hash upload in WinPE, or stages the interactive OOBE assistant.

:::warning[Best-effort registration paths]
Foundry hardware hash upload modes are best-effort registration paths, not replacements for standard Intune enrollment flows. Upload failures, expired certificates, authentication failures, and Microsoft Graph polling timeouts do not fail the Windows deployment. Local hash capture prerequisites can block only the Autopilot upload step.
:::

## Next step

Open [Architecture Overview](./architecture-overview) for the runtime sequence.
