---
title: Post-WinPE Handoff
description: Understand what Foundry stages before reboot and what Windows executes before OOBE.
---

# Post-WinPE handoff

This page explains what happens after Foundry Deploy finishes in WinPE and the target device boots into the applied Windows image.

## Handoff boundary

Foundry Deploy runs in WinPE. Before reboot, it applies Windows, configures boot files, writes offline configuration artifacts, and stages any first-boot assets required by the selected deployment options.

After reboot, Windows starts from the applied image. Foundry Deploy is no longer running. Windows setup consumes the files that were staged while the image was offline.

## Specialize pass

Computer name and time zone are written to:

`Windows\Panther\unattend.xml`

Windows setup applies those values during the specialize pass before the user reaches OOBE. When OOBE customization is enabled, Foundry also writes OOBE license-term and privacy setup handling into `unattend.xml`, then writes persistent privacy defaults into the offline registry policy hives.

AI policy customization is also applied while Foundry Deploy is still running in WinPE. Foundry loads the target `SOFTWARE`, `SYSTEM`, and `Users\Default\NTUSER.DAT` hives under temporary mount names, writes selected Copilot, Recall, Click to Do, Windows AI service, Edge, Paint, and Notepad policy values, then unloads the hives before reboot. Future-user defaults are written to the offline default user profile hive, not to `HKEY_USERS\.DEFAULT`.

## SetupComplete

Deferred first-boot execution is staged through:

`Windows\Setup\Scripts\SetupComplete.cmd`

`SetupComplete.cmd` runs after Windows setup completes and before the user reaches the desktop. Foundry uses it only as a stable launcher for post-WinPE work that cannot be completed offline.

## Pre-OOBE PowerShell runner

The pre-OOBE runner model keeps `SetupComplete.cmd` small. `SetupComplete.cmd` launches one generated PowerShell runner under:

`Windows\Temp\Foundry\PreOobe`

Generated data files used by the runner are staged under:

`Windows\Temp\Foundry\PreOobe\Data`

The runner executes enabled PowerShell scripts in deterministic order:

1. Script priority
2. Script id

Driver provisioning is priority `100` and runs before network profile import and customization scripts. Network profile import is priority `200`, customization scripts are priority `300`, and cleanup is priority `900`. Customization scripts are registered only when the corresponding Foundry OSD or Foundry Deploy configuration enables them.

Provisioned AppX removal is a customization script. It runs before OOBE and uses online provisioned package removal so new user profiles are created without the selected packages. Foundry stages only supported provisioned package identifiers, such as `Microsoft.BingWeather`, in `Data\Remove-AppX.packages.json`; the script skips packages that are not provisioned in the applied image.

AI component AppX removal is also a customization script when Microsoft Copilot or Copilot+ AI Hub removal is selected. It runs before OOBE and reads selected AppX package identifiers from `Data\Remove-AiComponents.settings.json`. The script removes only the selected Copilot and Copilot+ AI Hub provisioned AppX packages; policy registry values are already applied offline during the WinPE phase.

Network profile roaming is also a pre-OOBE script when enabled. It imports staged public certificates, opted-in PFX client certificates, wired 802.1X profiles, and Wi-Fi profiles before OOBE. Wi-Fi profiles that are expected to work before OOBE are marked for automatic connection and then connected with `netsh wlan connect`; import-only or credential-dependent profiles are staged without forcing a connection.

Foundry writes a launcher log at:

`Windows\Temp\Foundry\Logs\PreOobe\SetupComplete.log`

If the launcher starts successfully, each PowerShell script also writes its own transcript under the same folder, for example:

`Windows\Temp\Foundry\Logs\PreOobe\Remove-AppX.transcript.log`

`Windows\Temp\Foundry\Logs\PreOobe\Remove-AiComponents.transcript.log`

If no Foundry pre-OOBE logs exist after first boot, check Windows setup logging under:

`Windows\Panther\UnattendGC\Setupact.log`

[Microsoft documents](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/add-a-custom-script-to-windows-setup?view=windows-11) that `SetupComplete.cmd` is disabled when an OEM product key is used, except on Enterprise editions and Windows Server operating systems. In that case, Windows setup logs that it skipped `SetupComplete.cmd`.

## Deferred driver provisioning

Most driver packs are applied offline with DISM. Some packages, such as selected executable or MSI packages, must run after Windows boots. In those cases, Foundry stages the package under:

`Windows\Temp\Foundry\DriverPack\Packages`

The pre-OOBE runner then invokes the driver PowerShell script during first boot.

When deferred driver provisioning, network profile roaming, and customization scripts are enabled, Foundry stages one shared pre-OOBE runner. Driver provisioning runs first, network profile import runs next, AppX removal and AI AppX removal run in the customization bucket, and cleanup runs last.

## Operational artifacts

Foundry stores logs, deployment summaries, staged packages, and pre-OOBE manifests under:

`Windows\Temp\Foundry`

These files exist to make the deployment handoff auditable after WinPE exits.

Open [Logs and Artifacts](./logs-and-artifacts) for the operator-facing collection checklist.
