---
title: Customization
description: Configure machine naming behavior in Foundry OSD for Foundry Deploy.
---

# Customization

Customization settings define deployment-time behavior that should be prepared before the target device boots.

## Machine naming

Foundry OSD can stage machine naming behavior for Foundry Deploy.

Available controls include:

- Enable or disable machine naming.
- Define a machine name prefix.
- Enable automatic name generation.
- Allow or block manual suffix editing.

:::tip[Prefer simple naming rules]
Use a prefix and automatic suffix generation unless operators need per-device naming exceptions.
:::

:::info[Screenshot placeholder]
Capture the machine naming controls with prefix, automatic generation, and manual suffix options visible.
:::

## Runtime impact

Machine naming affects the Foundry Deploy wizard. Staging the behavior from Foundry OSD makes the live deployment path faster and more consistent.

## Recommended approach

- Use a prefix when devices should share a naming convention.
- Enable automatic generation when operators should move quickly.
- Allow manual suffix editing only when local exceptions are expected.

## Next step

Open [Deployment Flow](../deploy/deployment-flow) to see where customization can affect runtime choices.
