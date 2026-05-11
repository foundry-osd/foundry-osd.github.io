---
title: Quick Start
description: Follow the shortest workflow from a prepared workstation to a first Windows deployment.
---

# Quick Start

Use this guide for the shortest path from a prepared workstation to a first deployment.

:::tip[Stay in the standard path]
Use expert mode only when the deployment requires predefined network, localization, Autopilot, or machine naming behavior.
:::

## 1. Install Foundry OSD

Install the latest MSI from [Requirements](./requirements).

Open Foundry OSD after installation.

## 2. Confirm ADK readiness

Check the main window before selecting media options.

If Foundry OSD shows an ADK banner:

1. Select `Install ADK` or `Upgrade ADK`.
2. Wait for the verification step to finish.
3. Continue after the media creation actions become available.

![Foundry OSD home screen](/img/docs/foundry-osd/home-screen.png)

## 3. Choose media settings

Select the standard media options:

- ISO output path, USB target disk, or both
- Target architecture
- WinPE language
- WinPE driver vendors to include

Use [Media Creation](../build-media/media-creation) when you need to compare ISO and USB behavior before choosing an output.

## 4. Build the media

Select the build action that matches the output you need.

| Output | Use it when |
| --- | --- |
| ISO | You need a reusable file for VM testing, remote mounting, or later distribution |
| USB | You need Foundry OSD to provision a bootable physical device directly |

:::warning[USB creation is destructive]
USB creation erases and repartitions the selected target disk. Confirm the selected disk before starting.
:::

![Foundry OSD ready to create media](/img/docs/foundry-osd/build-summary.png)

## 5. Boot the target device

Boot the target device from the media.

The runtime sequence is:

1. Foundry Connect
2. Foundry Deploy

## 6. Validate networking

Foundry Connect checks whether the WinPE runtime network state is ready.

If networking is ready, continue into Foundry Deploy. If networking is not ready, resolve the network state before deployment starts.

Read [Network Readiness](../connect/network-readiness) for the runtime behavior.

## 7. Run deployment

In Foundry Deploy, follow the wizard in order:

1. Target
2. Operating System Catalog
3. Driver Pack
4. Summary

The wizard enables forward movement only when the required selections for the current page are valid.

![Foundry Deploy target selection](/img/docs/foundry-deploy/target-selection.png)

## Next steps

- Open [Standard Workflow](../build-media/standard-workflow) for the normal operator path.
- Open [Expert Mode](../configure/expert-mode) when standard mode is not enough.
- Open [Deployment Flow](../deploy/deployment-flow) for the Foundry Deploy wizard sequence.
