---
title: Overview
description: Choose the right Foundry Autopilot provisioning mode before building deployment media.
---

# Autopilot overview

Foundry supports three Autopilot provisioning modes. Choose one mode before building ISO or USB media.

Use this page to decide which mode matches the deployment workflow, then open the mode guide for the end-to-end steps.

## Mode comparison

| Mode | Use when | Tenant sign-in in Foundry OSD | Certificate/PFX | Technician sign-in during deployment | Group tag selection |
| --- | --- | --- | --- | --- | --- |
| [JSON profile injection](./json-profile-injection) | You already have offline Autopilot profile JSON files. | Optional, only when downloading profiles from the tenant | No | No | Comes from the profile behavior |
| [Zero-touch hardware hash upload](./zero-touch-hardware-hash-upload) | Devices should be uploaded automatically during WinPE deployment. | Yes | Yes | No | Selected before media creation and reviewed in Foundry Deploy |
| [Interactive hardware hash upload](./interactive-hardware-hash-upload) | Enterprise policy blocks app-registration certificate upload from Foundry OSD, but a technician can authenticate during OOBE. | No | No | Yes | Selected in the OOBE assistant |

:::tip[One mode per media build]
The generated media carries one Autopilot provisioning mode. Build separate media when different device groups require different Autopilot behavior.
:::

## Where each mode runs

| Surface | JSON profile injection | Zero-touch hardware hash upload | Interactive hardware hash upload |
| --- | --- | --- | --- |
| Foundry OSD | Imports or downloads profile JSON and selects the default profile. | Connects the tenant, prepares the app registration, creates certificates, selects the PFX, and sets the default group tag. | Selects the interactive mode only. No tenant connection, certificate, PFX, or group tag is configured in Foundry OSD. |
| Foundry Connect | Only validates networking for the normal deployment flow. | Validates that WinPE networking is ready before Foundry Deploy starts. | Validates networking for deployment. Internet access must also be available later during OOBE. |
| Foundry Deploy | Stages `AutopilotConfigurationFile.json` into the applied Windows image. | Captures the hardware hash in WinPE, imports it with Microsoft Graph, waits for device visibility, and reconciles the group tag. | Stages the OOBE registration assistant into the applied Windows image. |
| Windows OOBE | Windows consumes the staged profile. | Windows continues after Foundry Deploy completes. | The Foundry assistant opens during OOBE, requests Microsoft device-code authentication, uploads the hash, and restarts the device. |

## Quick recommendations

Use **JSON profile injection** for the simplest offline Autopilot path when profile JSON files are already available.

Use **Zero-touch hardware hash upload** when the tenant allows Foundry OSD to create or manage the app registration and certificate used by generated media.

Use **Interactive hardware hash upload** when the tenant does not allow the zero-touch app-registration model, but a technician is allowed to sign in during OOBE with delegated Microsoft Graph permissions.

## Required permissions

Zero-touch hardware hash upload uses application permissions through the Foundry-managed app registration and certificate.

Interactive hardware hash upload uses delegated device-code authentication during OOBE. The signed-in account must be allowed to import Windows Autopilot devices through Microsoft Graph.

## Screenshot placeholders

:::info[Screenshot needed]
Add a Foundry OSD screenshot showing the Autopilot mode selector with all three modes visible.
:::

:::info[Screenshot needed]
Add one final-result screenshot per mode after the mode guides have matching images.
:::

## Next steps

- Open [JSON Profile Injection](./json-profile-injection) for offline profile staging.
- Open [Zero-touch Hardware Hash Upload](./zero-touch-hardware-hash-upload) for certificate-based automatic upload.
- Open [Interactive Hardware Hash Upload](./interactive-hardware-hash-upload) for OOBE technician sign-in.
- Open [Troubleshooting](./troubleshooting) for logs, common failures, and validation checks.
