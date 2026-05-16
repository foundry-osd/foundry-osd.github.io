---
title: Deployment Orchestrator
description: Understand how Foundry Deploy orders and executes deployment steps inside WinPE.
---

# Deployment orchestrator

This page is a technical deep dive. It describes the internal Foundry Deploy execution pipeline for maintainers and advanced readers.

Foundry Deploy runs in WinPE after Foundry Connect completes successfully. Deployment execution is handled by ordered `IDeploymentStep` instances. The orchestrator sorts steps by `IDeploymentStep.Order`, verifies that the registered step names match the expected workflow, and executes each step against a shared runtime state.

## Ordered steps

The deployment pipeline runs in this order:

1. Gather deployment variables
2. Initialize deployment workspace
3. Validate target configuration
4. Resolve cache strategy
5. Prepare target disk layout
6. Download operating system image
7. Apply operating system image
8. Configure target computer name and time zone through `Windows\Panther\unattend.xml`
9. Configure OOBE settings through `Windows\Panther\unattend.xml` and offline policy hives
10. Configure recovery environment
11. Download driver pack
12. Extract driver pack
13. Apply driver pack or stage deferred first-boot execution
14. Download firmware update
15. Apply firmware update
16. Seal recovery partition
17. Stage Autopilot configuration
18. Finalize deployment and write logs

## Runtime state

Each step reads and updates the deployment runtime state. Runtime state carries target partition paths, selected operating system metadata, OOBE defaults, driver-pack strategy, firmware update paths, Autopilot staging details, pre-OOBE script paths, completed steps, and final artifact locations.

## Offline Windows staging

Foundry Deploy writes several artifacts into the applied Windows image before reboot:

- `Windows\Panther\unattend.xml` for specialize-pass settings such as computer name and time zone, plus OOBE settings such as license-term handling.
- Offline registry hives for OOBE privacy policy defaults such as diagnostic data, privacy setup, advertising ID, speech, typing diagnostics, tailored experiences, and location access.
- `Windows\Setup\Scripts\SetupComplete.cmd` for post-WinPE first-boot execution.
- `Windows\Provisioning\Autopilot\AutopilotConfigurationFile.json` when offline Autopilot profile staging is enabled.
- `Windows\Temp\Foundry` for deployment logs, summaries, staged packages, and pre-OOBE assets.

## Failure behavior

If a step fails, orchestration stops, the failure is logged, and Foundry Deploy reports the failed step to the operator. Logs are rebound to the final Windows target location when the Windows partition is available.
