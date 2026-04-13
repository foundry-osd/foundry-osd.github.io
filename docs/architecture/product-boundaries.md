---
title: Product Boundaries
---

# Product boundaries

The most important distinction in this project is the split between authoring, bootstrap gating, and deployment execution.

## Responsibility matrix

| Product | Runs on | Owns | Does not own |
| --- | --- | --- | --- |
| `Foundry` | Admin workstation | ADK lifecycle management, media creation, WinPE customization, expert settings, staging of runtime assets | The live deployment UI on the target device |
| `Foundry.Connect` | WinPE target device | Network readiness, provisioned wired and Wi-Fi setup, bootstrap continuation | OS deployment logic or media authoring |
| `Foundry.Deploy` | WinPE target device | Catalog loading, target disk selection, OS selection, deployment orchestration | Building the original ISO or USB media |
| `catalog` | Separate automation repo | XML feed generation for OS, driver, and WinPE metadata | UI, media creation, or deployment execution |

## Practical rule of thumb

- If the user is preparing media on a workstation, it belongs to `Foundry`.
- If the user is still proving the device can continue in WinPE, it belongs to `Foundry.Connect`.
- If the user is selecting the OS and starting the actual deployment, it belongs to `Foundry.Deploy`.

## Configuration handoff

`Foundry` produces the runtime inputs for the other apps:

- Network settings become `Foundry.Connect` configuration and supporting assets.
- Localization, customization, and Autopilot preferences become optional `Foundry.Deploy` expert configuration.

That handoff is why the desktop app matters even though deployment later runs in WinPE.

## Runtime order

`Foundry.Connect` comes first for a reason:

- It validates internet access and runtime network state.
- It can connect provisioned profiles before deployment starts.
- It can stop bootstrap if the user aborts or a required condition fails.

Only after that handoff does `Foundry.Deploy` continue.
