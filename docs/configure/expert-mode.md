---
title: Expert Mode Overview
description: Use Foundry OSD expert mode to author configuration that is staged into generated deployment media.
---

# Expert mode overview

Expert mode turns Foundry OSD into a pre-boot media configuration surface.

Use it only when the generated media needs predefined runtime behavior.

:::note[Do not start here by default]
Create media with the standard workflow first unless the deployment environment requires predefined network, deployment, customization, or Autopilot behavior.
:::

## Expert sections

| Section | What it controls |
| --- | --- |
| General | Media output, architecture, language, WinPE drivers, deployment time zone, and advanced media options |
| Network | Wired 802.1X and Wi-Fi settings for Foundry Connect |
| Autopilot | JSON profile injection, zero-touch hardware hash upload, or interactive hardware hash upload settings |
| Customization | Machine naming rules, optional operating system selection defaults and allowed values, Windows OOBE defaults, AI component removal, and provisioned AppX removal used later in Foundry Deploy |

:::info[Screenshot placeholder]
Capture the expert-mode shell with all section tabs visible.
:::

## Runtime configuration handoff

Expert mode settings are saved into the Foundry OSD configuration and staged automatically during media creation.

When you build ISO or USB media, Foundry OSD generates the runtime configuration files needed by:

- Foundry Connect, for network readiness behavior.
- Foundry Deploy, for deployment-time preferences.

Those files are written into the boot image during media creation. No operator action is required to create the Foundry Connect or Foundry Deploy runtime configuration files.

After the target boots, these values are consumed by Foundry Connect, Foundry Deploy, Windows setup, or the Autopilot assistant. They are not edited from the workstation while deployment is running.

## Staged deployment preferences

Use expert mode when the WinPE deployment session should start with predefined preferences for:

- Deployment time zone
- Operating system selection defaults and allowed values, when enabled
- Autopilot
- Machine naming
- Windows OOBE defaults
- AI component removal
- Provisioned AppX removal

:::info[Screenshot placeholder]
Capture the expert-mode sections that control generated runtime configuration.
:::

## Next steps

- Open [General](./general) for media defaults and Windows time zone behavior.
- Open [Network Configuration](./network) for wired and Wi-Fi settings.
- Open [Autopilot](../autopilot/overview) for JSON profile injection, zero-touch hardware hash upload, and interactive hardware hash upload configuration.
- Open [Customization](./customization) for machine naming, operating system selection, Windows OOBE behavior, AI component removal, and provisioned AppX removal.
