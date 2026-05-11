---
title: Standard Workflow
description: Use the normal Foundry OSD workflow to create deployment media without advanced configuration.
---

# Standard workflow

Use the standard workflow when the deployment does not require predefined network, localization, Autopilot, or machine naming behavior.

## Use this workflow when

- Create boot media without configuring every advanced setting.
- Keep the workstation workflow short.
- Let runtime decisions happen later in Foundry Connect and Foundry Deploy.

## Workflow

1. Open Foundry OSD on the admin workstation.
2. Resolve any ADK banner before continuing.
3. Select the output path:
   - ISO
   - USB
4. Select the target architecture.
5. Select the WinPE language.
6. Select the WinPE driver vendors to include.
7. Create the media.
8. Boot the target device from the media.
9. Let Foundry Connect validate networking.
10. Continue into Foundry Deploy and run the deployment.

:::info[Screenshot placeholder]
Capture the standard Foundry OSD workflow before media creation, with output, architecture, language, and driver vendor choices visible.
:::

## Stay in standard mode by default

Standard mode is the right path when operators can make deployment choices at runtime.

Switch to expert mode only when the media should carry predefined settings for:

- Wired 802.1X
- Wi-Fi
- Localization
- Autopilot
- Machine naming

## What standard mode still prepares

Even without expert configuration, Foundry OSD still:

- Checks ADK readiness.
- Builds the WinPE workspace.
- Injects selected WinPE drivers.
- Stages Foundry Connect.
- Prepares the bootstrap path that resolves Foundry Deploy later in WinPE.

## Next steps

- Open [Media Creation](./media-creation) for ISO and USB details.
- Open [Expert Mode](../configure/expert-mode) for predefined deployment settings.
- Open [Quick Start](../start/quick-start) for the shortest end-to-end guide.
