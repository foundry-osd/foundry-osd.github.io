---
title: Customization
---

# Customization

The current customization model is intentionally small and focused.

## Machine naming

`Foundry OSD` lets you define machine naming behavior before deployment starts.

Available controls include:

- Enable or disable machine naming
- Define a machine name prefix
- Enable automatic name generation
- Allow or block manual suffix editing

:::tip[Prefer the simplest naming rule that still fits operations]
Use a prefix and automatic suffix generation unless operators genuinely need to make per-device naming adjustments.
:::

:::info[Suggested screenshot]
Add a capture of the machine naming controls with prefix, auto-generation, and manual suffix options visible.
:::

## Why this belongs in expert configuration

Machine naming affects the operator experience during deployment, but the preferred behavior is usually decided earlier on the admin workstation.

That makes it a good fit for the expert configuration handoff from `Foundry OSD` to `Foundry.Deploy`.

## Recommended approach

- Use a prefix when you need naming consistency across devices.
- Enable auto-generation when you want operators to move quickly.
- Keep manual suffix editing available only when local exceptions are expected.
