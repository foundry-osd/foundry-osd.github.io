---
title: Deployment Flow
---

# Foundry.Deploy deployment flow

`Foundry.Deploy` is the WinPE deployment application for Foundry.

It is responsible for the actual deployment session on the target device.

:::warning[This is the execution phase]
By the time the workflow reaches `Foundry.Deploy`, the operator is no longer authoring media. The focus is now disk, OS, driver, and deployment decisions on the target device.
:::

## Runtime flow

1. Resolve the runtime context and load the deployment inputs.
2. Load the catalog-backed operating system and driver data.
3. Apply any staged expert deploy configuration.
4. Walk the operator through the deployment wizard.
5. Start the ordered deployment orchestration and report progress.

## Startup responsibilities

At startup the app resolves its runtime context and loads the information needed to drive the deployment wizard:

- Target environment details
- Disk information
- Catalog data
- Optional expert deploy configuration
- Autopilot profiles

## Catalog-backed workflow

`Foundry.Deploy` consumes the XML feeds produced by the separate `catalog` repository.

That includes:

- Operating system metadata
- Driver pack metadata

Those feeds are part of the normal startup experience rather than an afterthought.

## Wizard responsibilities

The deployment wizard is where the operator confirms the inputs that matter for the current device:

- Target disk
- Operating system
- Driver pack strategy
- Firmware update intent
- Autopilot behavior
- Machine naming and localization behavior inherited from expert configuration

:::info[Suggested screenshot]
Add a capture of the disk selection page, where the operator confirms the target storage device.
:::

:::info[Suggested screenshot]
Add a capture of the operating system selection page, with the catalog-backed choices visible.
:::

## Expert configuration handoff

If `Foundry` staged `foundry.deploy.config.json`, `Foundry.Deploy` loads it from the WinPE workspace and uses it as an optional preference layer.

That keeps the workstation authoring decisions aligned with the target-device deployment flow.

<details>
<summary>What the handoff is supposed to do</summary>

The deploy configuration is not meant to replace operator choice entirely. It is there to reduce repeated decisions and keep the target-device workflow aligned with the media authoring intent.

</details>

## Execution model

When deployment starts, the app moves into an ordered orchestration path with:

- Explicit step sequencing
- Progress reporting
- Success and failure pages
- Logging throughout the run

This separation keeps the media authoring phase and the deployment execution phase cleanly isolated.

:::info[Suggested screenshot]
Add a capture of the final review or start page, where the operator confirms the deployment before execution begins.
:::
