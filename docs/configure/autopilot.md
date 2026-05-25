---
title: Autopilot
description: Stage Autopilot profiles from Foundry OSD for deployment-time use.
---

# Autopilot

Autopilot settings are managed in Foundry OSD and staged into deployment media for Foundry Deploy.

:::tip[Keep profile sets small]
Only stage profiles that operators should be able to use during deployment.
:::

## Provisioning modes

Foundry supports two Autopilot provisioning modes:

| Mode | Use when |
| --- | --- |
| JSON profile | You already have offline Autopilot profile JSON and want Foundry Deploy to stage `AutopilotConfigurationFile.json` into the applied Windows image. |
| Hardware hash upload | You want Foundry Deploy to capture the device hash in WinPE and import the device into Windows Autopilot with Microsoft Graph. |

Open [Autopilot Hardware Hash Upload](../deploy/autopilot-hash-upload) for the operator workflow, security model, failure behavior, and validation checklist for the hardware hash mode.

## JSON profile actions

For JSON profile mode, Foundry OSD can:

- Enable or disable Autopilot handling.
- Import a profile from JSON.
- Download profiles from the tenant.
- Remove imported profiles.
- Select the default profile.

:::info[Screenshot placeholder]
Capture the Autopilot section with profile list, import action, tenant download action, and default-profile selector visible.
:::

## Storage and injection paths

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
