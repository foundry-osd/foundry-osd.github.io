---
title: Media Authoring Flow
description: Understand how Foundry OSD turns workstation settings into bootable media consumed by Foundry Connect and Foundry Deploy.
---

# Media authoring flow

Foundry OSD is the media authoring application. It runs on the admin workstation before the target device boots.

The goal of media authoring is to produce ISO or USB media that contains:

- A prepared WinPE boot image.
- Foundry Connect for runtime network readiness.
- Foundry Deploy for the deployment wizard and execution pipeline.
- Generated configuration for networking, deployment defaults, customization, and Autopilot.
- Runtime payload and cache layout needed by the selected media type.

## Authoring sequence

Use this sequence when preparing media:

1. Confirm the workstation meets [Requirements](../start/requirements).
2. Decide whether the standard workflow is enough.
3. Configure expert settings only when the media needs predefined behavior.
4. Select the target architecture, WinPE language, driver vendors, and output type.
5. Select Autopilot mode when the media must stage or upload Autopilot identity.
6. Build ISO, create USB, or update an existing Foundry USB.
7. Boot the target device from the generated media.
8. Let Foundry Connect validate runtime networking.
9. Let Foundry Deploy run the deployment workflow.

:::info[Screenshot placeholder]
Capture Foundry OSD with the media readiness summary visible after requirements, output type, architecture, language, drivers, Connect, Deploy, and Autopilot readiness have been evaluated.
:::

## Standard path

Use [Standard Workflow](./standard-workflow) when the operator only needs normal ISO or USB media.

Standard media still prepares the runtime applications and configuration files needed by Foundry Connect and Foundry Deploy. It avoids predefined deployment restrictions unless the environment requires them.

## Expert path

Use [Configure Media](../configure/expert-mode) when the media must carry predefined behavior.

Expert settings are authored before the media is built. Foundry OSD persists those settings and generates the runtime configuration consumed later by Foundry Connect and Foundry Deploy.

| Authoring page | Runtime consumer | What it influences |
| --- | --- | --- |
| General | Foundry OSD and Foundry Deploy | Media defaults, WinPE language, architecture, deployment time zone |
| Network | Foundry Connect and Foundry Deploy | Wired 802.1X, Wi-Fi provisioning, Windows network profile roaming |
| Customization | Foundry Deploy and Windows first boot | Machine naming, operating system selection policy, OOBE defaults, AI component removal, AppX removal |
| Autopilot | Foundry OSD, Foundry Deploy, Windows OOBE | JSON profile staging, zero-touch hardware hash upload, interactive hardware hash upload |

## Media outputs

Foundry OSD supports three output flows:

- **Create ISO** packages the prepared WinPE workspace into an ISO file.
- **Create USB** partitions and formats the selected USB disk, then copies the prepared media.
- **Update USB** refreshes an existing Foundry USB boot partition and runtime payloads without repartitioning or formatting the cache partition.

Use [Media Creation](./media-creation) for the detailed ISO, USB, and update behavior.

## Runtime boundary

After the target boots, media authoring is finished.

Foundry Connect and Foundry Deploy are runtime applications. They consume what Foundry OSD staged, but they do not return to the workstation authoring flow.

The runtime order is:

1. Foundry Connect validates networking.
2. Foundry Deploy loads the generated deployment configuration.
3. Foundry Deploy lets the operator confirm runtime choices.
4. Foundry Deploy applies Windows and stages any post-WinPE handoff assets.
5. Windows continues through first boot, OOBE, or Autopilot behavior.

## Next steps

- Open [Media Creation](./media-creation) for ISO, USB, and update details.
- Open [Network Readiness](../runtime/network-readiness) for the first runtime step after boot.
- Open [Deployment Flow](../runtime/deployment-flow) for the Foundry Deploy wizard.
