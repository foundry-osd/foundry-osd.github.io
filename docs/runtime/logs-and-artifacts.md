---
title: Logs and Artifacts
description: Locate the deployment logs, summaries, Autopilot diagnostics, and post-WinPE handoff artifacts written by Foundry runtime components.
---

# Logs and artifacts

Foundry runtime writes evidence to the deployed Windows image so deployment behavior can be reviewed after WinPE exits.

Use this page when a deployment fails, Autopilot upload is skipped, post-WinPE work does not run, or an operator needs to collect support evidence.

## Main location

Foundry stores runtime artifacts under the applied Windows image:

```text
Windows\Temp\Foundry
```

The most important subfolders are:

| Path | Purpose |
| --- | --- |
| `Windows\Temp\Foundry\Logs` | Deployment, Autopilot, and pre-OOBE logs |
| `Windows\Temp\Foundry\PreOobe` | Generated first-boot runner, manifest, scripts, and data |
| `Windows\Temp\Foundry\PreOobe\Data` | JSON data files consumed by pre-OOBE scripts |
| `Windows\Temp\Foundry\DriverPack` | Deferred driver packages when first-boot execution is required |
| `Windows\Temp\Foundry\AutopilotRegistration` | Interactive hardware hash upload assistant assets |

:::info[Screenshot placeholder]
Capture the Foundry Deploy runtime menu or failure screen with the log access action visible.
:::

## Deployment summary

Foundry Deploy writes a deployment summary after execution.

Use the summary to confirm:

- Target disk.
- Selected operating system.
- Selected driver pack.
- Firmware setting.
- Autopilot mode and selected values.
- Final deployment outcome.

If deployment fails after the Windows partition is available, Foundry attempts to rebind logs to the final target location before reporting the failure.

## Deployment logs

Deployment logs are written under:

```text
Windows\Temp\Foundry\Logs
```

Collect these logs when:

- Target disk validation fails.
- Operating system download or apply fails.
- Driver pack download, extraction, or application fails.
- Firmware update handling fails.
- Autopilot provisioning fails or is skipped.
- Final deployment state is unclear.

## Autopilot diagnostics

Zero-touch hardware hash upload writes status and diagnostics under the retained Foundry logs and artifacts.

Useful files include:

| File | Purpose |
| --- | --- |
| `autopilot-hash-upload-status.json` | Final zero-touch hardware hash upload state |
| `AutopilotUploadResult.json` | Microsoft Graph upload result details when available |

Interactive hardware hash upload writes OOBE assistant logs under:

```text
Windows\Temp\Foundry\Logs\AutopilotRegistration
```

Useful files include:

| File | Purpose |
| --- | --- |
| `registration.log` | Main assistant flow |
| `graph.log` | Microsoft Graph request failures |
| `OOBE.log` | Windows OOBE launcher call |
| `oobe-launcher.log` | OOBE launcher startup |
| `oobe-waiter.log` | OOBE session wait and ServiceUI launch |
| `foreground.log` | OOBE foreground preparation |
| `registration-state.json` | Current assistant state |
| `registration-result.json` | Final assistant result |

## Pre-OOBE logs

Post-WinPE first-boot work writes logs under:

```text
Windows\Temp\Foundry\Logs\PreOobe
```

Expected files can include:

| File | Purpose |
| --- | --- |
| `SetupComplete.log` | Launcher log for the generated pre-OOBE runner |
| `Install-DriverPack.transcript.log` | Deferred driver pack installation transcript |
| `Import-NetworkProfiles.transcript.log` | Windows network profile roaming transcript |
| `Remove-AppX.transcript.log` | Provisioned AppX removal transcript |
| `Remove-AiComponents.transcript.log` | AI component AppX removal transcript |
| `Cleanup-PreOobe.transcript.log` | Cleanup transcript |

If no Foundry pre-OOBE logs exist after first boot, check:

```text
Windows\Panther\UnattendGC\Setupact.log
```

Windows can skip `SetupComplete.cmd` for some OEM product key scenarios. When that happens, Windows setup logs the skip reason.

## What not to expect in logs

Retained runtime logs must not contain:

- Access tokens.
- Authorization headers.
- PFX bytes.
- PFX passwords.
- Private key material.
- Media secret keys.
- Raw Microsoft Graph payloads.

## Next steps

- Open [Deployment Flow](./deployment-flow) for the runtime execution sequence.
- Open [Post-WinPE Handoff](./post-winpe-handoff) for first-boot behavior.
- Open [Autopilot Troubleshooting](../autopilot/troubleshooting) for mode-specific failures.
