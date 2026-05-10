---
title: Quick Start
---

# Quick start

This is the fastest path from an empty workstation to a completed deployment.

## What this page helps you do

Use this page when you want the shortest route to your first successful deployment without reading the internal architecture first.

:::tip[Stay in standard mode unless you need more control]
Use expert mode only when you must predefine network, localization, Autopilot, or machine naming behavior.
:::

## 1. Prepare the admin workstation

- Install the Windows ADK and WinPE add-on, or let Foundry OSD install or upgrade them from the main window if the ADK banner is shown.
- Download the latest `Foundry OSD` release.
- Make sure the workstation has internet access.

## 2. Launch Foundry OSD

Open `Foundry OSD` on the workstation that will build the media.

If Foundry OSD shows an ADK warning banner:

- use `Install ADK` when no compatible ADK is present
- use `Upgrade ADK` when the installed version is incompatible
- wait until the ADK verification step finishes before continuing

In the main window you can choose:

- ISO output path
- USB target disk
- Architecture
- WinPE language
- Included WinPE driver vendors

:::info[Suggested screenshot]
Add a capture of the main `Foundry OSD` window right after launch, with the standard output controls visible.
:::

## 3. Decide between standard and expert mode

Use **standard mode** when you just want to build media quickly.

Use **expert mode** when you need to define:

- Wired 802.1X
- Wi-Fi provisioning
- Deployment language visibility and defaults
- Autopilot profiles
- Machine naming rules

:::note[Need the full configuration surface?]
Open [Expert Mode](../foundry/expert-mode) only after you know which extra controls you actually need.
:::

## 4. Build the media

Choose one of the two output paths:

| Output | Use it when |
| --- | --- |
| **Create ISO** | You want a reusable artifact for VMs, remote media, or later USB writing |
| **Create USB** | You want Foundry OSD to prepare the bootable device directly, including its cache partition |

During this stage, Foundry OSD prepares the WinPE image and stages the runtime assets for `Foundry.Connect` and `Foundry.Deploy`.

:::info[Suggested screenshot]
Add a capture of the output section with both the ISO and USB actions visible.
:::

<details>
<summary>What happens behind the scenes</summary>

Both output modes start from the same prepared WinPE workspace, but they finish differently:

- ISO produces a single `.iso` artifact from the prepared workspace.
- USB provisions and formats the target disk, copies the boot media, and initializes a persistent `Foundry Cache` partition for runtime, operating system, and driver-pack data.

</details>

## 5. Boot the target device

Start the target device from the media you created.

The WinPE bootstrap then follows this sequence:

1. `Foundry.Connect`
2. `Foundry.Deploy`

## 6. Validate connectivity

If your workflow requires network access, `Foundry.Connect` confirms that the target environment is ready before bootstrap continues.

This is where wired 802.1X or Wi-Fi provisioning matters.

## 7. Run deployment

Inside `Foundry.Deploy`:

- load the catalogs
- choose the target disk
- choose the operating system
- review driver pack behavior
- apply deployment options
- start the deployment workflow

:::info[Suggested screenshot]
Add a capture of the first `Foundry.Deploy` wizard page after catalogs and runtime context are loaded.
:::

## Recommended follow-up reading

- [Download and Requirements](./requirements)
- [Standard Workflow](../foundry/standard-workflow)
- [Architecture overview](../architecture/overview)
- [Media creation in Foundry OSD](../foundry/media-creation)
- [Network configuration](../configuration/network)
