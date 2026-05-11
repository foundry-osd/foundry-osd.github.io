---
title: Media Creation
description: Compare ISO and USB output and create deployment media with Foundry OSD.
---

# Media creation

Foundry OSD creates the boot media used to start the target device.

## Standard media settings

Set the standard media options before starting the build:

- ISO output path
- USB target disk
- Target architecture
- WinPE language
- WinPE driver vendors

:::info[Screenshot placeholder]
Capture the standard media creation section with ISO path, USB target, architecture, language, and driver vendor selection visible.
:::

## ISO and USB comparison

| Aspect | ISO | USB |
| --- | --- | --- |
| Output | Single `.iso` file | Bootable physical USB device |
| Destructive behavior | Non-destructive | Erases and repartitions the selected USB disk |
| Best fit | VM testing, remote mounting, archival, controlled distribution | Field media, repeated deployments, persistent cache-backed workflows |
| Runtime storage | ISO-backed runtime path | Persistent `Foundry Cache` partition |
| Cache directories | No dedicated USB cache partition | Initializes `Runtime`, `OperatingSystem`, and `DriverPack` directories |
| Operational tradeoff | Easy to store and distribute, but not a prepared physical device | Ready to boot directly, but tied to the selected USB disk |

Choose ISO when you need a reusable artifact. Choose USB when you need a physical deployment device prepared directly by Foundry OSD.

## Shared preparation

Before either output is created, Foundry OSD prepares the same WinPE workspace:

1. Resolve ADK tooling.
2. Build the WinPE workspace.
3. Inject selected drivers.
4. Apply WinPE language components.
5. Stage Foundry Connect.
6. Stage Foundry Deploy.
7. Stage configuration, network assets, and Autopilot profiles when configured.

## Create ISO

ISO creation packages the prepared WinPE workspace into a reusable file.

1. Select the ISO output path.
2. Confirm the target architecture and WinPE language.
3. Select the driver vendors to include.
4. Start ISO creation.
5. Wait for the final `.iso` file to be written.

:::info[Screenshot placeholder]
Capture the ISO output path and ISO creation action in Foundry OSD.
:::

## Create USB

USB creation provisions the selected disk directly.

1. Select the USB target disk.
2. Confirm that the selected disk is the intended removable device.
3. Select the target architecture and WinPE language.
4. Select the driver vendors to include.
5. Start USB creation.
6. Confirm the destructive action when prompted.

:::warning[Confirm the USB target]
USB creation erases and repartitions the selected disk. Do not continue until the target disk is confirmed.
:::

:::info[Screenshot placeholder]
Capture the USB target selection and final USB creation confirmation in Foundry OSD.
:::

## Advanced media options

Advanced media options affect boot behavior and staging:

- CA2023 signature mode
- USB partition style
- USB format mode
- Custom driver directory

Change these only when a deployment environment requires them.

:::info[Screenshot placeholder]
Capture the advanced media options section with CA2023, partition style, format mode, and custom driver controls visible.
:::

## Next steps

- Open [Network Readiness](../connect/network-readiness) to understand what happens after the target boots.
- Open [Expert Mode](../configure/expert-mode) when media should include predefined deployment behavior.
