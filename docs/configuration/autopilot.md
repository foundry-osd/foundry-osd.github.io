---
title: Autopilot
---

# Autopilot

Autopilot settings are managed in the `Foundry OSD` desktop app and then staged into the media for deployment-time use.

:::tip[Keep only the profiles you actually need]
The cleaner the profile set is on the workstation side, the easier it is for operators to get the right result during deployment.
:::

## What the desktop app supports

- Enable or disable Autopilot handling
- Import a profile from JSON
- Download profiles from the tenant
- Remove imported profiles
- Choose the default profile

:::info[Suggested screenshot]
Add a capture of the Autopilot section with the profile list, import action, tenant download action, and default-profile selector visible.
:::

## Storage and injection paths

The app exposes two important paths:

- Boot image storage path inside the WinPE image
- Offline injection path for Windows provisioning

These values exist to make the handoff between media creation and deployment explicit.

## Default profile behavior

When expert deploy configuration is generated, the selected default profile is reduced to the folder name that `Foundry.Deploy` needs later.

That keeps the deployment handoff small while still allowing the desktop app to manage a richer set of imported profiles.

:::note[Why the value is reduced]
`Foundry.Deploy` does not need the full workstation-side profile metadata. It only needs the deployment-time identifier that points to the selected profile content.
:::

## Deployment-time behavior

When `Foundry.Deploy` loads, it resolves the selected default profile by folder name from the staged Autopilot profile set.

If Autopilot is enabled but no usable profile is selected, deployment start is blocked until the operator either selects a profile or disables Autopilot.

## Recommended usage

- Import local JSON when you already have curated profiles.
- Download from the tenant when you want the workstation to pull the current set directly.
- Pick a default profile only when the deployment workflow should prefer one profile automatically.
