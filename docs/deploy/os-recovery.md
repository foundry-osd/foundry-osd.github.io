---
title: OS Recovery
description: Recover a machine using a WinRE-first, last-resort deployment flow.
---

# OS Recovery

OS Recovery is the last-resort deployment path when normal provisioning cannot continue.

It uses the Windows Recovery Environment (WinRE) as the entry point and follows a dedicated menu path:

**Troubleshoot > Advanced options > Foundry Recovery**

## What happens in WinRE

When selected, WinRE starts the Foundry recovery image and runs the recovery bootstrap.

- `Foundry.Connect`, the bootstrap script, 7-Zip, time zone data, and minimal sanitized configuration are embedded in the WinRE payload.
- `Foundry.Deploy` is not embedded. It is downloaded during recovery boot, then used to redeploy the OS.
- The recovery partition stays intact.
- The existing Windows partition is replaced during redeployment.
- A Foundry recovery marker is written next to `winre.wim`; recovery startup uses it to identify the provisioned disk and fails closed if the target is ambiguous.

![WinRE OS recovery flow](/img/deploy/os-recovery-winre-flow.png)

## Key limits

- A single custom WinRE recovery tool is supported.
- This is not a root recovery menu replacement.
- No enterprise personalization payloads are applied from WinRE.
- Autopilot payloads, network roaming profiles, certificates, OA3 tools, media secrets, and `Foundry.Deploy` binaries are not embedded in WinRE.
- Network access is required for downloading the deployment payload.
- BitLocker on the previous OS partition does not need to be readable for the recovery flow.

## Validation

Use `scripts/Test-FoundryOsRecoveryWinRe.ps1` to inspect a mounted or extracted WinRE image. The script checks the WinRE tool files, bootstrap, embedded `Foundry.Connect`, minimal configuration, 7-Zip runtime, and excluded payloads. By default it also checks `reagentc /info`; use `-SkipReAgentC` only when validating an offline image on a machine that is not the deployed target.
