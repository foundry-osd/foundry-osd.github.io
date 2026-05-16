---
title: Post-WinPE Handoff
description: Understand what Foundry stages before reboot and what Windows executes before OOBE.
---

# Post-WinPE handoff

This page is a technical deep dive. It explains what happens after Foundry Deploy finishes in WinPE and the target device boots into the applied Windows image.

## Handoff boundary

Foundry Deploy runs in WinPE. Before reboot, it applies Windows, configures boot files, writes offline configuration artifacts, and stages any first-boot assets required by the selected deployment options.

After reboot, Windows starts from the applied image. Foundry Deploy is no longer running. Windows setup consumes the files that were staged while the image was offline.

## Specialize pass

Computer name and time zone are written to:

`Windows\Panther\unattend.xml`

Windows setup applies those values during the specialize pass before the user reaches OOBE. When OOBE customization is enabled, Foundry also writes OOBE license-term and privacy setup handling into `unattend.xml`, then writes persistent privacy defaults into the offline registry policy hives.

## SetupComplete

Deferred first-boot execution is staged through:

`Windows\Setup\Scripts\SetupComplete.cmd`

`SetupComplete.cmd` runs after Windows setup completes and before the user reaches the desktop. Foundry uses it only as a stable launcher for post-WinPE work that cannot be completed offline.

## Pre-OOBE PowerShell runner

The pre-OOBE runner model keeps `SetupComplete.cmd` small. `SetupComplete.cmd` launches one generated PowerShell runner under:

`Windows\Temp\Foundry\PreOobe`

The runner executes enabled PowerShell scripts in deterministic order:

1. Script priority
2. Script id

Driver provisioning is priority `100` and runs before customization scripts. Customization scripts are registered only when the corresponding Foundry OSD or Foundry Deploy configuration enables them.

## Deferred driver provisioning

Most driver packs are applied offline with DISM. Some packages, such as selected executable or MSI packages, must run after Windows boots. In those cases, Foundry stages the package under:

`Windows\Temp\Foundry\DriverPack\Packages`

The pre-OOBE runner then invokes the driver PowerShell script during first boot.

## Operational artifacts

Foundry stores logs, deployment summaries, staged packages, and pre-OOBE manifests under:

`Windows\Temp\Foundry`

These files exist to make the deployment handoff auditable after WinPE exits.
