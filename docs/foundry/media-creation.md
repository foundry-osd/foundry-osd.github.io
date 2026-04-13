---
title: Media Creation
---

# Media creation in Foundry

`Foundry` is the workstation-side app that creates the deployment media.

## Standard settings

The standard section focuses on the main choices required to produce usable media:

- ISO output path
- USB target disk
- Target architecture
- WinPE language
- Included WinPE driver vendors

:::info[Suggested screenshot]
Add a capture of the standard media creation pane, with ISO path, USB target, architecture, language, and driver vendor selection visible.
:::

## Advanced options

The advanced section exposes the media-level tuning that affects boot behavior and staging:

- CA2023 signature mode
- USB partition style
- USB format mode
- Custom driver directory

These options are part of media authoring, not the live WinPE deployment session.

:::warning[Do not change advanced media options casually]
Only change signature mode, partition style, format mode, or custom driver paths when you have a concrete compatibility requirement.
:::

:::info[Suggested screenshot]
Add a capture of the advanced media options pane with the CA2023, partition, format, and custom driver controls visible.
:::

## ISO vs USB at a glance

| Aspect | ISO | USB |
| --- | --- | --- |
| Final output | Single `.iso` file | Direct provisioning of the selected USB disk |
| Destructive behavior | No | Yes, the target USB disk is erased and repartitioned |
| Media layout | Prepared WinPE workspace turned into one ISO artifact | FAT32 `BOOT` partition plus NTFS `Foundry Cache` partition |
| Runtime behavior after boot | Uses the ISO-backed runtime path in WinPE | Bootstrap prefers the persistent USB cache runtime |
| Cache directories | No dedicated USB-style cache partition | Initializes `Runtime`, `OperatingSystem`, and `DriverPack` directories |
| Best fit | Reusable artifact, VM testing, remote distribution | Field media, repeated deployments, persistent cache-backed workflows |

## What both modes have in common

Before Foundry creates either output type, it prepares the same WinPE workspace:

- resolves ADK tooling
- builds the WinPE workspace
- injects drivers
- applies WinPE language components
- provisions `Foundry.Connect`
- provisions `Foundry.Deploy`
- stages configuration, network assets, and Autopilot profiles

That shared preparation step is why ISO and USB can carry the same deployment logic even though they finish differently.

## How ISO creation works

ISO mode is the simpler packaging path:

1. Foundry prepares the WinPE workspace.
2. Foundry runs `MakeWinPEMedia /ISO` against that prepared workspace.
3. Foundry writes the final `.iso` artifact to the requested destination.

For the operator, that means ISO is best when you want a reusable file artifact instead of immediate removable media provisioning.

<details>
<summary>Deep dive: ISO path handling</summary>

If the workspace path or requested ISO path contains non-ASCII characters, Foundry mirrors the prepared workspace into an ASCII-safe location under `%ProgramData%\Foundry\IsoWorkspace` and uses `%ProgramData%\Foundry\IsoOutputTemp` for the intermediate ISO output before copying the final file back to the requested path.

</details>

## How USB creation works

USB mode is a provisioning workflow, not just a file export:

1. Foundry validates the selected disk identity and confirms it is really a USB target.
2. Foundry warns the operator that the disk will be erased.
3. Foundry repartitions the disk.
4. Foundry formats a `BOOT` partition and a `Foundry Cache` partition.
5. Foundry copies the prepared WinPE media to the boot partition.
6. Foundry initializes cache directories for runtime, operating systems, and driver packs.
7. Foundry preprovisions the `Foundry.Connect` runtime into the cache partition.

:::info[Suggested screenshot]
Add a capture of the final build action area where the operator chooses `Create ISO` or `Create USB`.
:::

<details>
<summary>Deep dive: USB partition layout</summary>

Foundry creates:

- a `BOOT` FAT32 partition sized for WinPE boot media
- a `Foundry Cache` NTFS partition for persistent deployment data

The cache partition is where Foundry initializes:

- `Runtime`
- `OperatingSystem`
- `DriverPack`

At boot time, `FoundryBootstrap.ps1` looks for the `Foundry Cache` volume first. When it exists, bootstrap runs in `Usb` mode and uses that cache-backed runtime root instead of the ISO-backed runtime path.

</details>

## Partition style and format behavior

USB mode exposes options that do not apply to ISO mode:

- **Partition style** controls how the USB disk is provisioned.
- **Format mode** controls whether Foundry uses quick formatting or a full format pass.

ARM64 USB media is more constrained than x64 media. In practice, ARM64 requires GPT in the validation layer.

## When to use ISO

Choose ISO when you want:

- a reusable file you can archive or distribute
- virtualization or lab validation
- remote media mounting workflows
- a non-destructive output path

## When to use USB

Choose USB when you want:

- a bootable device prepared directly by Foundry
- persistent cache-backed deployment media
- local storage for runtime, operating system, and driver-pack content
- an operator-ready stick for repeated field use

## When to switch to expert mode

Use expert mode when you need deterministic control over:

- Network provisioning
- Deployment language visibility and defaults
- Autopilot profile handling
- Machine naming behavior

See [Expert Mode](./expert-mode) for the full breakdown.
