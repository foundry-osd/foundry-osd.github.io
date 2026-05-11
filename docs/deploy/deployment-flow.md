---
title: Deployment Flow
description: Follow the Foundry Deploy wizard sequence and understand the user choices made during deployment.
---

# Deployment flow

Foundry Deploy runs in WinPE after Foundry Connect has validated the runtime network state.

This is the execution phase. The user is no longer authoring media; the user is choosing how the target device will be deployed.

:::warning[Review before starting deployment]
Deployment choices affect the target disk and operating system installation. Review the final page before starting execution.
:::

## Wizard sequence

Follow the wizard in order:

1. Review runtime context.
2. Load catalog data.
3. Select the target disk.
4. Select the operating system.
5. Review driver behavior.
6. Review Autopilot and customization behavior when staged.
7. Confirm the final deployment summary.
8. Start deployment.

## Runtime context

Foundry Deploy starts by resolving the runtime context:

- Boot mode
- Runtime path
- Available cache locations
- Staged configuration
- Staged Autopilot profiles

This context determines which options can be shown later in the wizard.

## Catalog data

Foundry Deploy loads catalog-backed data for:

- Operating systems
- Driver packs

The catalog data defines the selectable operating system and driver choices shown to the user.

## Target disk selection

Select the disk that should receive the Windows deployment.

:::info[Screenshot placeholder]
Capture the target disk selection page with available disks and the selected target visible.
:::

## Operating system selection

Select the operating system from the catalog-backed list.

:::info[Screenshot placeholder]
Capture the operating system selection page with catalog-backed choices visible.
:::

## Deployment options

Review the remaining options before execution:

- Driver pack strategy
- Firmware update intent
- Autopilot profile behavior
- Language and time zone behavior
- Machine naming behavior

Some values can come from expert configuration staged by Foundry OSD. The user should still review the final choices before starting deployment.

## Start deployment

Start deployment only after the final summary matches the intended target state.

Foundry Deploy then runs the deployment sequence and reports progress, success, or failure.

:::info[Screenshot placeholder]
Capture the final review or start page before deployment execution begins.
:::

## Next steps

- Open [Expert Mode](../configure/expert-mode) to understand which values can be staged from Foundry OSD.
- Open [Catalog Overview](../reference/catalog-overview) to understand where operating system and driver choices come from.
