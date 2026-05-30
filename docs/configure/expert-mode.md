---
title: Expert Mode
description: Use expert mode in Foundry OSD when deployment media needs predefined network, localization, Autopilot, or customization behavior.
---

# Expert mode

Expert mode turns Foundry OSD into a configuration authoring surface.

Use it only when the standard workflow is not enough.

:::note[Do not start here by default]
Create media with the standard workflow first unless the deployment environment requires predefined runtime behavior.
:::

## Expert sections

| Section | What it controls |
| --- | --- |
| General | Media output, architecture, language, WinPE drivers, and advanced media options |
| Network | Wired 802.1X and Wi-Fi settings for Foundry Connect |
| Localization | Visible languages, default language, and time zone |
| Autopilot | JSON profile injection, zero-touch hardware hash upload, or interactive hardware hash upload settings |
| Customization | Machine naming rules, Windows OOBE defaults, AI component removal, and provisioned AppX removal used later in Foundry Deploy |

:::info[Screenshot placeholder]
Capture the expert-mode shell with all section tabs visible.
:::

## Runtime configuration handoff

Expert mode settings are saved into the Foundry OSD configuration and staged automatically during media creation.

When you build ISO or USB media, Foundry OSD generates the runtime configuration files needed by:

- Foundry Connect, for network readiness behavior.
- Foundry Deploy, for deployment-time preferences.

Those files are written into the boot image during media creation. No operator action is required to create the Foundry Connect or Foundry Deploy runtime configuration files.

## Staged deployment preferences

Use expert mode when the WinPE deployment session should start with predefined preferences for:

- Localization
- Autopilot
- Machine naming
- Windows OOBE defaults
- AI component removal
- Provisioned AppX removal

:::info[Screenshot placeholder]
Capture the expert-mode sections that control generated runtime configuration.
:::

## Next steps

- Open [Network Configuration](./network) for wired and Wi-Fi settings.
- Open [Localization](./localization) for language and time zone behavior.
- Open [Autopilot](../autopilot/overview) for JSON profile injection, zero-touch hardware hash upload, and interactive hardware hash upload configuration.
- Open [Customization](./customization) for machine naming, Windows OOBE behavior, AI component removal, and provisioned AppX removal.
