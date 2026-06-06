---
title: General
description: Configure media creation defaults and deployment time zone behavior in Foundry OSD.
---

# General

General settings control media creation defaults and deployment behavior that is not specific to networking, Autopilot, or customization.

## Media defaults

Use General to choose the boot media architecture, WinPE language, boot signature, and WinPE driver options before creating ISO or USB media.

Change these settings only when the deployment environment requires a different media baseline.

## Time zone

Choose one of two modes:

- Leave time zone selection automatic.
- Set a specific default deployment time zone.

Foundry OSD stores the time zone identifier used by Foundry Deploy. During deployment, Foundry Deploy writes the resolved time zone into the offline Windows configuration before OOBE starts.

## Next steps

- Open [Network Configuration](./network) for wired and Wi-Fi settings.
- Open [Customization](./customization) for machine naming, operating system selection, Windows OOBE behavior, AI component removal, and provisioned AppX removal.
- Open [Deployment Flow](../deploy/deployment-flow) to see where these settings affect runtime behavior.
