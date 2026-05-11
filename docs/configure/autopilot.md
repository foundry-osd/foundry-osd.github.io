---
title: Autopilot
description: Stage Autopilot profiles from Foundry OSD for deployment-time use.
---

# Autopilot

Autopilot settings are managed in Foundry OSD and staged into deployment media for Foundry Deploy.

:::tip[Keep profile sets small]
Only stage profiles that operators should be able to use during deployment.
:::

## Supported actions

Foundry OSD can:

- Enable or disable Autopilot handling.
- Import a profile from JSON.
- Download profiles from the tenant.
- Remove imported profiles.
- Select the default profile.

:::info[Screenshot placeholder]
Capture the Autopilot section with profile list, import action, tenant download action, and default-profile selector visible.
:::

## Storage and injection paths

Foundry OSD exposes:

- Boot image storage path inside WinPE.
- Offline injection path for Windows provisioning.

These paths make the handoff between media creation and deployment explicit.

## Default profile

Select a default profile when the deployment workflow should prefer one profile automatically.

Foundry Deploy resolves the selected profile from the staged profile set during deployment.

## Deployment-time behavior

If Autopilot is enabled but no usable profile is selected, the deployment workflow should not start until the operator resolves the profile state or disables Autopilot behavior.

## Next step

Open [Deployment Flow](../deploy/deployment-flow) for the deployment-time review sequence.
