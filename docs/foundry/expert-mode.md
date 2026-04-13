---
title: Expert Mode
---

# Expert mode

Expert mode is where `Foundry` becomes a configuration authoring tool instead of just a media builder.

:::note[Do not start here by default]
Open expert mode when you already know that your deployment flow needs predefined network, localization, Autopilot, or customization behavior.
:::

## Expert sections

The desktop app exposes five expert sections:

- General
- Network
- Localization
- Autopilot
- Customization

These sections map directly to the configuration document produced by the app.

| Section | What you configure |
| --- | --- |
| General | Media output, architecture, language, WinPE driver inclusion, and advanced media options |
| Network | Wired 802.1X and Wi-Fi provisioning for the WinPE runtime |
| Localization | Visible language list, default language override, default time zone, and single-language enforcement |
| Autopilot | Importing or downloading profiles and choosing the default profile |
| Customization | Machine naming rules and operator flexibility |

:::info[Suggested screenshot]
Add a capture of the expert-mode shell with the five section tabs visible.
:::

## Import and export

Expert mode supports:

- Importing an expert configuration file
- Exporting an expert configuration file
- Exporting a deploy configuration file

<details>
<summary>Default filenames used by the app</summary>

- `foundry.expert.config.json`
- `foundry.deploy.config.json`

</details>

## What each section controls

Use the dedicated pages for the tab-specific details:

- [Network Configuration](../configuration/network)
- [Localization](../configuration/localization)
- [Autopilot](../configuration/autopilot)
- [Customization](../configuration/customization)

## Why export deploy configuration

The expert deploy configuration is a reduced handoff intended for `Foundry.Deploy`.

It carries the settings that matter at deployment time, especially:

- Localization behavior
- Customization behavior
- Autopilot defaults

:::info[Suggested screenshot]
Add a capture of the import/export actions, including the export path for the deploy configuration handoff.
:::

## Recommended usage

- Keep a reusable expert configuration for repeatable media builds.
- Export deploy configuration when you want a predictable WinPE runtime experience.
- Use standard mode when you do not need those extra controls.
