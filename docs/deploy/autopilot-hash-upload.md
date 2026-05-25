---
title: Autopilot Hardware Hash Upload
description: Configure Foundry OSD to capture and upload Windows Autopilot hardware hashes during deployment.
---

# Autopilot hardware hash upload

Foundry can capture the device hardware hash during deployment and upload it to Windows Autopilot with Microsoft Graph.

Use this mode when you want Foundry Deploy to register the device in Autopilot instead of staging an offline `AutopilotConfigurationFile.json`.

:::warning[Validate before production]
Hardware hash upload from WinPE is a Foundry-assisted workflow. Test it on your hardware models and tenant before using it for production deployments.
:::

## Before you start

You need:

- Foundry OSD with the Expert Mode section available.
- Windows ADK and Windows PE add-on installed.
- An Intune tenant where you can create or manage an app registration.
- Admin consent for the Microsoft Graph application permission `DeviceManagementServiceConfig.ReadWrite.All`.
- Network access from WinPE to Microsoft Graph and Microsoft Entra.
- A generated PFX file and its password. Foundry shows the password once when the certificate is created.

:::tip[PFX handling]
Foundry does not save the PFX or its password in ProgramData. Keep the generated PFX and password somewhere secure. You must select them again when you build new media.
:::

## 1. Select hardware hash upload

In Foundry OSD, go to the **Expert Mode** section, then select **Autopilot**.

Enable Autopilot and select **Hardware hash upload** as the provisioning mode.

![Foundry OSD Autopilot hardware hash mode](/img/docs/autopilot-hash-upload/osd-autopilot-hash-mode.svg)

The Autopilot page now shows the tenant connection, managed app registration, certificates, boot media certificate, and default group tag configuration.

## 2. Connect the tenant

Select **Connect tenant** and complete the Microsoft sign-in flow.

Foundry checks the tenant and prepares the managed app registration named:

```text
Foundry OSD Autopilot Registration
```

After connection, confirm that the tenant readiness state is **Ready**.

![Foundry OSD tenant connection ready](/img/docs/autopilot-hash-upload/osd-tenant-ready.svg)

If the tenant is not ready, review the permission and admin consent state shown on the page, then reconnect after fixing the tenant configuration.

## 3. Create a certificate

In the certificate section, create a Foundry-managed certificate.

Foundry adds the public certificate to the managed app registration and creates a password-protected PFX file locally.

When the certificate is created:

1. Save the PFX file.
2. Save the generated password.
3. Close the dialog only after both values are stored securely.

![Foundry OSD certificate created dialog](/img/docs/autopilot-hash-upload/osd-certificate-created.svg)

You can keep multiple Foundry certificates in the tenant. Foundry does not remove unrelated app registration certificates.

## 4. Select the boot media PFX

In **Boot media certificate**, select the PFX file that matches one of the Foundry-managed certificates in the tenant.

Enter the PFX password. Foundry validates the thumbprint and expiration.

![Foundry OSD boot media certificate ready](/img/docs/autopilot-hash-upload/osd-boot-media-certificate-ready.svg)

The Autopilot configuration is ready only when the selected PFX matches the active certificate in the tenant and is not expired.

## 5. Choose a default group tag

Select the default group tag to use during deployment, or leave **None** selected.

![Foundry OSD default group tag](/img/docs/autopilot-hash-upload/osd-default-group-tag.svg)

Use **None** when the device should be uploaded without a group tag.

Foundry Deploy checks the live tenant group tags again when the device boots. If the configured default group tag no longer exists, Deploy automatically selects **None**.

## 6. Build the boot media

Open the media creation page and build an ISO or USB media.

Foundry stages the required hash upload assets into the boot image:

- OA3Tool for the selected architecture.
- Encrypted PFX bytes.
- Encrypted PFX password.
- Media secret key.
- Deploy configuration.
- WinPE optional components, including `WinPE-SecureStartup`.

![Foundry OSD media ready for hardware hash upload](/img/docs/autopilot-hash-upload/osd-media-ready.svg)

Generated media is tenant-sensitive. Anyone with full access to the boot image can access the encrypted certificate material and the media secret key used by Foundry Deploy.

## 7. Deploy the device

Boot the device from the generated media.

Wait for Foundry Connect to report **Network ready**, then continue to Foundry Deploy.

On the target page, confirm:

- Target disk.
- Operating system.
- Driver pack.
- Autopilot state.
- Group tag.

![Foundry Deploy target page with Autopilot hash upload](/img/docs/autopilot-hash-upload/deploy-target-autopilot-hash.svg)

Select **Deploy** when the summary is correct.

## 8. Wait for Autopilot upload

Near the end of deployment, Foundry Deploy runs the Autopilot step.

It:

1. Copies `PCPKsp.dll` from the applied Windows image to `X:\Windows\System32`.
2. Captures the hardware hash with OA3Tool.
3. Uploads the hash to Microsoft Graph.
4. Waits until the device appears in Windows Autopilot devices.
5. Updates or clears the group tag if the device already exists.

![Foundry Deploy Autopilot upload progress](/img/docs/autopilot-hash-upload/deploy-autopilot-upload-progress.svg)

The wait can last up to 10 minutes. The countdown updates every second.

If the device does not appear before the timeout, Foundry records a warning and continues the Windows deployment.

## Check the result in Intune

In Microsoft Intune admin center, open **Devices** > **Enrollment** > **Windows Autopilot devices**.

Confirm that the device serial number appears and that the group tag matches the Deploy selection.

![Intune Windows Autopilot device uploaded by Foundry](/img/docs/autopilot-hash-upload/intune-autopilot-device.svg)

## Troubleshooting

Foundry keeps diagnostics on the deployed Windows image:

```text
<target Windows>\Windows\Temp\Foundry\Logs\AutopilotHash
```

Useful files:

| File | Use |
| --- | --- |
| `OA3.xml` | OA3Tool hardware hash report |
| `OA3.log` | OA3Tool capture log |
| `AutopilotHWID.csv` | Captured serial number and hardware hash |
| `AutopilotUploadResult.json` | Sanitized Graph upload result |
| `autopilot-hash-upload-status.json` | Final Foundry Deploy Autopilot state |

The retained files are sanitized. They must not contain access tokens, authorization headers, PFX bytes, PFX passwords, private key material, media secret keys, or raw Graph payloads.

## Failure behavior

These issues stop only the Autopilot upload step because Foundry cannot capture a valid hash:

- OA3Tool missing or failing.
- `PCPKsp.dll` missing from the applied Windows image.
- `PCPKsp.dll` copy or load failure.
- Missing `OA3.xml`.
- Empty serial number or hardware hash.

These issues do not stop the Windows deployment:

- Expired embedded certificate.
- Token or Graph authentication failure.
- Missing Graph permission or admin consent.
- Intune or Graph availability issue.
- Import timeout.
- Device visibility timeout.
- Duplicate import result.

If hardware hash upload is not suitable for a device, register it with the normal tenant Autopilot process or register it after Windows is running.
