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
| Localization | Visible languages, default language, time zone, and single-language behavior |
| Autopilot | Imported or downloaded Autopilot profiles and the default profile |
| Customization | Machine naming rules used later in Foundry Deploy |

:::info[Screenshot placeholder]
Capture the expert-mode shell with all section tabs visible.
:::

## Import and export

Expert mode supports:

- Importing an expert configuration file.
- Exporting an expert configuration file.
- Exporting a deploy configuration file.

The deploy configuration is a reduced handoff for Foundry Deploy. It carries deployment-time preferences without exposing every workstation-side setting.

## When to export deploy configuration

Export deploy configuration when the WinPE deployment session should start with predefined preferences for:

- Localization
- Autopilot
- Machine naming

:::info[Screenshot placeholder]
Capture the import and export actions, including the deploy configuration export action.
:::

## Next steps

- Open [Network Configuration](./network) for wired and Wi-Fi settings.
- Open [Localization](./localization) for language and time zone behavior.
- Open [Autopilot](./autopilot) for profile handling.
- Open [Customization](./customization) for machine naming behavior.
