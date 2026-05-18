---
title: Deployment Flow
description: Follow the Foundry Deploy wizard sequence and understand the user choices made during deployment.
---

# Deployment flow

Foundry Deploy is opened by the WinPE bootstrap after Foundry Connect has validated the runtime network state.

This is the execution phase. The user is no longer authoring media; the user is choosing how the target device will be deployed.

:::warning[Review before starting deployment]
Deployment choices affect the target disk and operating system installation. Review the final page before starting execution.
:::

## Wizard sequence

Follow the wizard in order:

1. Target
2. Operating System Catalog
3. Driver Pack
4. Summary

If the welcome screen is shown first, select `Start` to open the wizard.

The wizard enables `Next` and `Deploy` only when the required selections for the current step are valid.

## Target

Use the `Target` page to confirm the target machine and deployment options.

Review or set:

- `Computer Name`
- `Target Disk`
- `Firmware: Microsoft Update Catalog update enabled.`
- `Autopilot: Enable offline profile staging.`, when Autopilot profiles are available
- `Autopilot Profile`, when Autopilot is enabled

The computer name must use 1 to 15 characters. Use letters, numbers, and hyphen only. If machine naming was staged by Foundry OSD, the field can be pre-filled, auto-generated, or read-only depending on the staged rule.

Select only the disk that should be erased and receive Windows. Foundry Deploy blocks disks that are not valid deployment targets.

![Foundry Deploy target selection](/img/docs/foundry-deploy/target-selection.png)

## Operating System Catalog

Use the `Operating System Catalog` page to choose the Windows image from the catalog-backed filters.

Review or set:

- `Operating System`
- `Version`
- `Language`
- `License Channel`
- `Edition (Target)`

The available filter values come from the loaded catalog. The language selector can be limited by staged deployment localization settings.

![Foundry Deploy operating system catalog](/img/docs/foundry-deploy/operating-system-catalog.png)

## Driver Pack

Use the `Driver Pack` page to choose how drivers are selected for the target device.

Review or set:

- `Driver Source`
- `Model`
- `Version`

The `Model` and `Version` controls are enabled only when the selected driver source exposes those choices.

OEM driver pack deployment requires a valid model and version selection. Microsoft Update Catalog mode does not require those OEM selections.

![Foundry Deploy driver pack selection](/img/docs/foundry-deploy/driver-pack-selection.png)

## Summary

Use the `Summary` page as the final review before execution.

Verify:

- Target computer name
- Target disk
- Operating system
- Selected driver pack
- Firmware setting
- Autopilot state and profile, when enabled

The `Deploy` command becomes actionable from this page when the required selections are valid.

![Foundry Deploy deployment summary](/img/docs/foundry-deploy/deployment-summary.png)

## Confirm disk erase

After selecting `Deploy`, Foundry Deploy shows `Confirm Disk Erase`.

Review the disk number, model, bus, size, and selected operating system. Continue only when the disk is the intended target.

![Foundry Deploy disk erase confirmation](/img/docs/foundry-deploy/confirm-disk-erase.png)

If the confirmation is cancelled, deployment does not start.

## Deployment progress

During execution, Foundry Deploy shows:

- Computer name
- Network details
- Start time and elapsed time
- Global progress percentage
- Current step name
- Current step progress
- Step counter

The deployment pipeline runs ordered steps for validation, cache resolution, disk layout, operating system download and apply, computer naming, OOBE defaults, recovery configuration, pre-OOBE customization staging, drivers, firmware, Autopilot staging, and final logs. Download steps can be skipped when the required content is already available in cache.

![Foundry Deploy target validation progress](/img/docs/foundry-deploy/progress-validate-target.png)

![Foundry Deploy operating system download progress](/img/docs/foundry-deploy/progress-download-operating-system.png)

![Foundry Deploy operating system apply progress](/img/docs/foundry-deploy/progress-apply-operating-system.png)

![Foundry Deploy driver pack download progress](/img/docs/foundry-deploy/progress-download-driver-pack.png)

![Foundry Deploy driver pack extraction progress](/img/docs/foundry-deploy/progress-extract-driver-pack.png)

![Foundry Deploy driver pack application progress](/img/docs/foundry-deploy/progress-apply-driver-pack.png)

## Completion

When deployment completes successfully, Foundry Deploy shows the completion state, starts the reboot countdown, and offers `Reboot`.

![Foundry Deploy completion state](/img/docs/foundry-deploy/deployment-complete.png)

## Failure state

If deployment fails, Foundry Deploy shows the failed step and error message. Use `Open Log` from the runtime menu to inspect the deployment log before retrying.

## Next steps

- Open [Expert Mode](../configure/expert-mode) to understand which values can be staged from Foundry OSD.
- Open [Catalog Overview](../reference/catalog-overview) to understand where operating system and driver choices come from.
