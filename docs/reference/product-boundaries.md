---
title: Product Boundaries
description: Understand what Foundry OSD, Foundry Connect, Foundry Deploy, and catalog each own.
---

# Product boundaries

Use this page when you need to understand which part of Foundry Project owns a behavior.

## Responsibility matrix

| Surface | Owns | Does not own |
| --- | --- | --- |
| Foundry OSD | ADK readiness, media creation, WinPE customization, expert settings, Foundry Connect staging | Live deployment execution on the target device |
| Foundry Connect | Runtime network readiness, provisioned wired and Wi-Fi setup, bootstrap continuation | OS deployment logic or media authoring |
| Foundry Deploy | Catalog loading, target disk selection, OS selection, deployment execution | Building the original ISO or USB media |
| catalog | XML feed generation for operating system, driver, and WinPE metadata | UI, media creation, or deployment execution |

## Practical rule

- If the user is preparing media on a workstation, it belongs to Foundry OSD.
- If the user is proving WinPE networking is ready, it belongs to Foundry Connect.
- If the user is selecting OS, disk, drivers, or deployment options, it belongs to Foundry Deploy.

## Configuration handoff

Foundry OSD can stage runtime inputs for the other apps:

- Foundry Connect provisioning and network settings.
- Localization, Autopilot, and customization preferences for Foundry Deploy.

## Next step

Open [Architecture Overview](./architecture-overview) for the runtime sequence.
