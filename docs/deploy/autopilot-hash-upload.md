---
title: Autopilot Hardware Hash Upload
description: Configure and validate Foundry's WinPE Autopilot hardware hash upload workflow.
---

# Autopilot hardware hash upload

Foundry can capture a target device hardware hash near the end of a WinPE deployment and import it into Windows Autopilot with Microsoft Graph.

Use this mode when the device should be registered in Autopilot during the deployment workflow instead of staging an offline `AutopilotConfigurationFile.json`.

:::warning[Best-effort registration path]
Hardware hash upload from WinPE is a Foundry-assisted workflow, not the Microsoft-standard Autopilot registration path. Validate it on your hardware models and tenants before using it for production deployments.
:::

## What this mode does

When hardware hash upload is selected, Foundry:

1. Builds media with the Autopilot hash capture assets required by Foundry Deploy.
2. Stores the selected app certificate PFX and PFX password as encrypted media secrets.
3. Boots the target device into WinPE.
4. Validates network access with Foundry Connect.
5. Applies Windows with Foundry Deploy.
6. Copies `PCPKsp.dll` from the applied Windows image into `X:\Windows\System32`.
7. Runs OA3Tool in WinPE to capture the serial number and hardware hash.
8. Authenticates to Microsoft Graph with the embedded certificate.
9. Imports the hash and waits until the serial number appears in Windows Autopilot devices.

The import wait uses a 10-minute timeout. If the device does not appear before the timeout, Foundry records a warning and continues the deployment completion path.

## Requirements

Prepare these items before creating media:

- Foundry OSD release build for x64 or ARM64.
- Windows ADK and matching Windows PE add-on.
- A test or production Intune tenant.
- A tenant-local app registration managed by Foundry OSD.
- Microsoft Graph application permission `DeviceManagementServiceConfig.ReadWrite.All` with admin consent.
- A valid Foundry-managed certificate credential on the app registration.
- The password-protected PFX for the selected certificate.
- Network access from WinPE to Microsoft Graph and Microsoft Entra token endpoints.

The media target architecture can be x64 or ARM64. The ADK OA3Tool asset and the applied Windows image must match the deployment architecture.

## Security model

WinPE upload uses certificate-based app-only authentication only. Device code flow, client secrets, and brokered upload are not supported in WinPE for this feature.

Generated media is tenant-sensitive because it contains:

- Encrypted PFX bytes.
- An encrypted PFX password.
- The media secret key needed by Foundry Deploy to decrypt those secrets in WinPE.

The encrypted envelope avoids plaintext secret storage and provides integrity protection, but anyone with full access to the boot image can access both the encrypted secret and the decrypt key. Protect generated media like tenant-sensitive deployment media.

Foundry does not persist the private key or PFX password in ProgramData. The operator selects the PFX and enters its password only for the current media generation session.

## Configure Foundry OSD

1. Open **Expert Mode**.
2. Open **Autopilot**.
3. Select the hardware hash upload provisioning mode.
4. Select **Connect tenant**.
5. Complete the Microsoft sign-in and tenant onboarding flow.
6. Confirm the managed app registration is ready.
7. Create or select a Foundry-managed certificate credential.
8. Select the matching password-protected PFX for boot media generation.
9. Enter the PFX password.
10. Select a default group tag, or leave `None` selected.

`None` means Foundry imports the hardware hash without a group tag. If a previously configured default group tag is no longer present in the tenant group tag list, Foundry Deploy falls back to `None`.

## Create media

Create ISO or USB media after the hardware hash upload state is ready.

Foundry OSD stages:

- OA3Tool for the selected media architecture.
- The encrypted Autopilot certificate secrets.
- The media secret key.
- The Foundry Deploy configuration that contains the tenant ID, client ID, active certificate thumbprint, certificate expiration, known group tags, and default group tag.
- WinPE optional components including `WinPE-SecureStartup`.

Foundry does not stage `PCPKsp.dll` into the boot image. Foundry Deploy copies it later from the applied Windows image.

## Deploy the target

1. Boot the target from the generated media.
2. Wait for Foundry Connect to report **Network ready**.
3. Continue to Foundry Deploy.
4. Review the target disk, operating system, driver pack, firmware, and Autopilot state.
5. Confirm the group tag selection on the Target page if hardware hash upload is enabled.
6. Start deployment.

Autopilot hash upload runs after the Windows image has been applied and before the final deployment completion/reboot path.

During upload, Foundry Deploy shows progress while it:

- Captures the hardware hash.
- Imports the device identity into Microsoft Graph.
- Polls the import state.
- Polls Windows Autopilot devices until the serial number appears.

## Failure behavior

Foundry separates local capture prerequisites from tenant and Graph failures.

Blocking local prerequisites:

- OA3Tool missing or failing.
- `PCPKsp.dll` missing from the applied Windows image.
- `PCPKsp.dll` copy failure.
- Missing or invalid OA3 XML output.
- Empty serial number or hardware hash.

These failures stop the Autopilot hash upload workflow because Foundry cannot produce a valid hash.

Non-blocking upload failures:

- Expired embedded certificate.
- Missing or invalid encrypted certificate material.
- Token acquisition failure.
- Missing permission or admin consent.
- Conditional Access or tenant policy blocking app-only auth.
- Intune or Graph availability failure.
- Duplicate device/import errors.
- Import timeout.
- Device visibility timeout after import completion.

For non-blocking upload failures, Foundry Deploy records an Autopilot warning and continues the OS deployment completion path.

## Retained diagnostics

Foundry retains Autopilot troubleshooting files under:

```text
<target Windows>\Windows\Temp\Foundry\Logs\AutopilotHash
```

Expected files include:

- `OA3.xml`
- `OA3.log`
- `AutopilotHWID.csv`
- `AutopilotUploadResult.json`
- `autopilot-hash-upload-status.json`

`AutopilotUploadResult.json` is sanitized. It can include timestamps, serial number, group tag, import ID, Graph state, certificate thumbprint, and operator-facing error text. It must not include access tokens, authorization headers, raw Graph request or response bodies, PFX bytes, PFX passwords, private key material, media secret keys, or full certificate data.

Remove retained diagnostics after troubleshooting if they are no longer needed.

## Unsupported or risky scenarios

Do not treat this workflow as validated for:

- Autopilot self-deploying mode.
- Autopilot pre-provisioning.
- Hardware where TPM visibility from WinPE is not confirmed.
- Production rollout without model-specific x64 or ARM64 validation.

When Autopilot registration fails or is not suitable for the target scenario, use the tenant's normal Autopilot registration process or register the device after Windows is running.

## Manual validation checklist

Before production use, validate the workflow in a test tenant:

- Import one clean x64 device.
- Import one clean ARM64 device when ARM64 media is in scope.
- Validate Ethernet upload.
- Validate Wi-Fi upload when Wi-Fi media is in scope.
- Confirm the selected group tag appears in Intune.
- Confirm Foundry Deploy waits until the device appears in Windows Autopilot devices.
- Confirm a 10-minute visibility timeout records a warning and continues deployment.
- Confirm duplicate-device behavior is clear and does not trigger automatic cleanup.
- Confirm retained diagnostics are present and sanitized.

## Microsoft Graph references

- [importedWindowsAutopilotDeviceIdentity resource type](https://learn.microsoft.com/graph/api/resources/intune-enrollment-importedwindowsautopilotdeviceidentity)
- [import action](https://learn.microsoft.com/graph/api/intune-enrollment-importedwindowsautopilotdeviceidentity-import)
- [windowsAutopilotDeviceIdentity list](https://learn.microsoft.com/graph/api/intune-enrollment-windowsautopilotdeviceidentity-list)
- [Microsoft identity platform certificate credentials](https://learn.microsoft.com/entra/identity-platform/certificate-credentials)
