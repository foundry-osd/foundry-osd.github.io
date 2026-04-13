---
title: Overview
sidebar_position: 1
---

# Foundry overview

Foundry is a Windows deployment platform for building boot media and running guided Windows deployment workflows.

:::info[Start here]
If your goal is to deploy devices, go straight to [Download and Requirements](./getting-started/requirements) and then [Quick Start](./getting-started/quick-start).

If you are contributing code or validating internal behavior, use the **Developer** and **Deep Dives** sections instead.
:::

For most users, the docs should answer four things quickly:

- where to download Foundry
- what you need before you start
- how to create a bootable image
- how to personalize the workflow only when needed

The deeper architecture is still documented, but it is no longer the first thing you need to read.

## What Foundry includes

Foundry is built around three applications and one supporting data repository:

- `Foundry`: the desktop app used on the admin workstation to build deployment media
- `Foundry.Connect`: the WinPE network readiness app that runs first after boot
- `Foundry.Deploy`: the WinPE deployment app that loads catalogs and executes deployment
- `catalog`: the automation repository that generates OS, driver pack, and WinPE XML feeds

## Start with the user path

1. Read [Download and Requirements](./getting-started/requirements).
2. Follow [Quick Start](./getting-started/quick-start).
3. Use [Standard Workflow](./foundry/standard-workflow) for the normal day-to-day operator flow.
4. Open [Create Boot Media](./foundry/media-creation) when you need more detail about ISO or USB output.
5. Use the **Personalize It** section only if you need expert configuration.

## When to use the deep dives

Use the **Deep Dives** section when you need:

- product boundaries
- WinPE runtime details
- catalog internals
- developer and local testing workflows
