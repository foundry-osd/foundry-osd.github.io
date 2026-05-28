---
title: Autopilot
description: Configure Autopilot JSON profile staging or hardware hash upload from Foundry OSD.
---

# Autopilot

Autopilot settings are managed in Foundry OSD and staged into deployment media for Foundry Deploy.

:::tip[Choose one mode per media build]
Use JSON profile mode when you already have offline Autopilot profiles. Use hardware hash upload when the device should be imported into Windows Autopilot during deployment.
:::

## Provisioning modes

Foundry supports two Autopilot provisioning modes:

| Mode | Use when |
| --- | --- |
| JSON profile | You already have offline Autopilot profile JSON and want Foundry Deploy to stage `AutopilotConfigurationFile.json` into the applied Windows image. |
| Hardware hash upload | You want Foundry Deploy to capture the device hash in WinPE and import the device into Windows Autopilot with Microsoft Graph. |

Open [Autopilot Hardware Hash Upload](../deploy/autopilot-hash-upload) for the operator workflow, media build requirements, deployment behavior, and troubleshooting notes for the hardware hash mode.

## JSON profile actions

For JSON profile mode, Foundry OSD can:

- Enable or disable Autopilot handling.
- Import a profile from JSON.
- Download profiles from the tenant.
- Remove imported profiles.
- Select the default profile.

Only stage profiles that operators should be able to use during deployment.

:::info[Screenshot placeholder]
Capture the Autopilot section with profile list, import action, tenant download action, and default-profile selector visible.
:::

## Hardware hash upload actions

For hardware hash upload mode, Foundry OSD can:

- Connect to the tenant.
- Create or reuse the managed app registration.
- Create Foundry-managed certificates.
- Validate the PFX selected for boot media generation.
- Select an optional default group tag.

The selected PFX and its password are used only to prepare the boot image. Foundry OSD does not persist the private key or PFX password in ProgramData.

Foundry OSD stores only the default group tag preference in the generated Foundry Deploy configuration staged into the boot image. Foundry Deploy discovers the live tenant group tags again when the device boots. If the configured default group tag is no longer available, Deploy selects `None`.

## JSON storage and injection paths

For JSON profile mode, Foundry OSD exposes:

- Boot image storage path inside WinPE.
- Offline injection path for Windows provisioning.

These paths make the handoff between media creation and deployment explicit.

## Default profile

Select a default profile when the deployment workflow should prefer one profile automatically.

Foundry Deploy resolves the selected profile from the staged profile set during deployment.

## Deployment-time behavior

If JSON profile mode is enabled but no usable profile is selected, the deployment workflow should not start until the operator resolves the profile state or disables Autopilot behavior.

If hardware hash upload mode is enabled, Foundry Deploy keeps OS deployment available even when the upload cannot run because of expired certificate metadata or tenant-side Graph failures. Local hash capture prerequisites such as OA3Tool and `PCPKsp.dll` must still be available for the upload workflow to succeed.

## Next step

Open [Deployment Flow](../deploy/deployment-flow) for the deployment-time review sequence.
