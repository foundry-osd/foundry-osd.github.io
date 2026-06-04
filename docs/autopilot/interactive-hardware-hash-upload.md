---
title: Interactive Hardware Hash Upload
description: Upload a Windows Autopilot hardware hash during OOBE with technician device-code sign-in.
---

# Interactive hardware hash upload

Interactive hardware hash upload stages a lightweight OOBE assistant that lets a technician authenticate and upload the device hardware hash after Windows has been applied.

Use this mode when the enterprise blocks the zero-touch app-registration certificate model, but a technician can sign in during OOBE with an account allowed to import Windows Autopilot devices.

## What this mode does

Foundry Deploy does not upload the hash in WinPE. Instead, it stages the registration assistant into the applied Windows image.

When Windows reaches OOBE, the assistant opens automatically. It:

1. Requests a Microsoft device-code sign-in.
2. Displays the device code and countdown.
3. Refreshes the code automatically if it expires.
4. Loads existing group tags visible in the tenant.
5. Lets the technician select **None**, an existing group tag, or **Custom**.
6. Collects the hardware hash from Windows.
7. Uploads the device hardware hash to Microsoft Intune.
8. Waits for device registration.
9. Restarts the device after successful registration.

## Requirements

You need:

- Foundry media configured for **Interactive hardware hash upload**.
- Internet access during Windows OOBE. Ethernet or already-available network connectivity is recommended because the assistant starts before normal OOBE completion.
- An active Intune tenant and license.
- A work or school technician account allowed to import and manage Windows Autopilot devices.
- A tenant administrator who can grant consent for the delegated Microsoft Graph permission `DeviceManagementServiceConfig.ReadWrite.All`.

No tenant connection is required in Foundry OSD for this mode. No certificate, PFX, or group tag is selected in Foundry OSD.

The technician account needs Intune RBAC permissions for Autopilot device management. In custom-role terms, use **Enrollment programs** permissions such as **Create device**, **Read device**, and the update or sync permissions needed when group tag reconciliation is used. The built-in **Policy and Profile Manager** role covers these permissions. **Intune Administrator** also works.

:::info[Device Enrollment Manager]
A Device Enrollment Manager account is not required for the hardware hash upload itself. This flow depends on Microsoft Graph consent and Intune Autopilot RBAC permissions.
:::

:::warning[Conditional Access]
Conditional Access can block the sign-in step. Policies that block device code flow, require a compliant device, or restrict sign-in by location or device state can prevent confirmation at `https://microsoft.com/devicelogin`. Scope any required exception to a dedicated technician account or technician group.
:::

## Configure Foundry OSD

1. Open **Foundry OSD**.
2. In the navigation menu, under **Expert Mode**, select **Autopilot**.
3. Enable Autopilot.
4. Select **Interactive hardware hash upload**.

Confirm that Foundry OSD does not ask for tenant sign-in, certificate creation, PFX selection, or group tag selection for this mode.

:::info[Screenshot needed]
Add a Foundry OSD screenshot showing Interactive hardware hash upload selected and no tenant/PFX/group-tag configuration card.
:::

## Build the media

Build ISO or USB media normally.

The generated deploy configuration uses:

```json
{
  "provisioningMode": "interactiveHardwareHashUpload"
}
```

No PFX secret is required for this mode.

Foundry Deploy stages the OOBE launcher, ServiceUI, foreground wrapper, PowerShell assistant, logo assets, and runtime configuration into the applied Windows image.

## Deploy the device

1. Boot the target device from the generated media.
2. Wait for Foundry Connect to report **Network ready**.
3. Continue to Foundry Deploy.
4. Review the **Target** page.
5. Confirm that the Autopilot mode is interactive hardware hash upload.
6. Complete the normal deployment workflow.

During the Autopilot provisioning step, Foundry Deploy stages the OOBE assistant into the applied Windows image. It does not perform the hardware hash upload in WinPE.

:::info[Screenshot needed]
Add a Foundry Deploy summary screenshot showing the interactive Autopilot mode before deployment starts.
:::

## Sign in during OOBE

When Windows enters OOBE, the Foundry assistant opens automatically. If network connectivity is not ready yet, the assistant waits and retries the Microsoft sign-in code request.

The first screen shows:

- Foundry logo.
- **Foundry OSD - Sign in to Microsoft** header.
- Instructions to open `https://microsoft.com/devicelogin`.
- The current device-code value.
- A countdown showing the remaining code lifetime.

:::info[Screenshot needed]
Add a screenshot of the authentication step with the device code visible. Redact or use a test code if needed.
:::

Sign in on another device with an account allowed to import Windows Autopilot devices.

If the device code expires, Foundry requests a new code and updates the screen automatically.

If the confirmation page accepts the code but sign-in is denied, check Microsoft Entra sign-in logs for Conditional Access blocks against device code flow.

## Choose the group tag and upload

After authentication succeeds, the assistant switches to the upload screen.

The upload screen shows:

- Foundry logo.
- **Foundry OSD - Upload hardware hash** header.
- Group tag selector.
- Disabled custom group tag field until **Custom** is selected.
- Status text.
- Progress bar.
- **Upload** button.

Choose:

- **None** to upload without a group tag.
- An existing group tag discovered from the tenant.
- **Custom** to type a group tag manually.

Then select **Upload**.

:::info[Screenshot needed]
Add a screenshot of the group tag and upload step with a test tenant group tag list.
:::

## What happens after upload

After **Upload**, Foundry disables the controls and runs:

1. Collecting hardware hash.
2. Uploading hardware hash to Microsoft Intune.
3. Waiting for device registration in Microsoft Intune.
4. Updating the group tag if the device already exists or needs reconciliation.
5. Registration completed.
6. Restarting countdown.

After the countdown reaches zero, Foundry restarts the device.

## Expected final result

In Microsoft Intune admin center, open **Devices** > **Enrollment** > **Windows Autopilot devices**.

Confirm that the device serial number appears and that the selected group tag is applied.

After restart, Windows returns to the normal OOBE flow.

## Logs and validation

The assistant is staged under:

```text
<target Windows>\Windows\Temp\Foundry\AutopilotRegistration
```

Logs are written under:

```text
<target Windows>\Windows\Temp\Foundry\Logs\AutopilotRegistration
```

Useful files include:

| File | Use |
| --- | --- |
| `registration.log` | Main assistant flow |
| `graph.log` | Microsoft Graph request failures |
| `OOBE.log` | Windows OOBE launcher call |
| `oobe-launcher.log` | OOBE launcher startup |
| `oobe-waiter.log` | OOBE session wait and ServiceUI launch |
| `oobe-sessiondiag.log` | Session and process diagnostics |
| `foreground.log` | OOBE foreground preparation |
| `launcher.log` | Manual recovery launcher flow, when used |
| `registration-state.json` | Current assistant state |
| `registration-result.json` | Final assistant result |

## Next steps

- Open [Troubleshooting](./troubleshooting) if the assistant does not appear, authentication fails, group tags are missing, or upload fails.
- Open [Zero-touch Hardware Hash Upload](./zero-touch-hardware-hash-upload) when you want upload without technician sign-in.
