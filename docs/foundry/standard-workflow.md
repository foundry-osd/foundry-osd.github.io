---
title: Standard Workflow
---

# Standard workflow

This is the main operator path for everyday usage of Foundry.

:::tip[Use this flow first]
If your environment does not require advanced preconfiguration, stay in the standard path and only open expert settings when you hit a real need.
:::

## Use this page when

- you want to create boot media without diving into every advanced setting
- you need a quick mental model for the normal flow
- you want to know when expert mode is actually necessary

## The normal flow

1. Open `Foundry OSD` on the admin workstation.
2. If Foundry OSD shows the ADK banner, use the built-in `Install ADK` or `Upgrade ADK` action and wait for verification to finish.
3. Choose the output:
   - ISO
   - USB
4. Select the architecture and WinPE language.
5. Include any WinPE driver vendors you need.
6. Build the media.
7. Boot the target device from that media.
8. Let `Foundry.Connect` validate the runtime network state.
9. Continue into `Foundry.Deploy` and run the deployment.

:::info[Suggested screenshot]
Add a capture of the standard `Foundry OSD` workflow before media creation, with output, architecture, language, and driver choices visible.
:::

## Stay in standard mode by default

For many users, standard mode is enough.

You only need expert mode when you want to define things such as:

- pre-provisioned wired 802.1X
- pre-provisioned Wi-Fi
- localization defaults
- Autopilot profiles
- machine naming rules

<details>
<summary>What standard mode still stages for you</summary>

Even in the standard path, `Foundry OSD` still handles ADK-aware media preparation, builds the WinPE image, and stages the handoff into `Foundry.Connect` and `Foundry.Deploy`.

</details>

:::info[Suggested screenshot]
Add a capture of the first runtime screen after boot, so the reader can connect the workstation workflow to the WinPE handoff.
:::

## What to open next

- Need more detail about media creation: [Create Boot Media](./media-creation)
- Need advanced settings: [Expert Mode](./expert-mode)
- Need the shortest end-to-end checklist: [Quick Start](../getting-started/quick-start)
