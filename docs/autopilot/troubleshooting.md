---
title: Troubleshooting
description: Diagnose Foundry Autopilot profile injection, zero-touch hardware hash upload, and interactive hardware hash upload.
---

# Autopilot troubleshooting

Use this page to diagnose the three Foundry Autopilot modes.

Start by confirming which mode the media was built with. The generated deploy configuration uses one of these values:

```text
jsonProfile
hardwareHashUpload
interactiveHardwareHashUpload
```

## Common checks

| Check | Why it matters |
| --- | --- |
| Autopilot is enabled in Foundry OSD | Disabled Autopilot means Foundry Deploy skips Autopilot provisioning. |
| The expected provisioning mode is selected | Each mode stages different files and runs at a different time. |
| Foundry Connect reports **Network ready** | Zero-touch upload needs WinPE connectivity; interactive upload needs connectivity later during OOBE. |
| The final deployment summary is retained | It records the mode, state, and diagnostics path. |

## JSON profile injection

### Profile is not available in Foundry Deploy

Check that a default profile was selected before media creation.

JSON mode requires a selected profile. Foundry Deploy should not start the deployment when Autopilot is enabled in JSON mode but no usable profile is selected.

### Windows OOBE does not use the profile

Check the target image for:

```text
<target Windows>\Windows\Provisioning\Autopilot\AutopilotConfigurationFile.json
```

If the file is missing, inspect the deployment log around the Autopilot provisioning step.

## Zero-touch hardware hash upload

### Upload is skipped because the certificate is expired

Create a new Foundry-managed certificate in Foundry OSD, save the new PFX and password, select the new boot media certificate, and rebuild the media.

### Upload is skipped because media metadata is incomplete

Rebuild the media after confirming:

- Tenant ID is present.
- Client ID is present.
- Active certificate key ID is present.
- Active certificate thumbprint is present.
- Active certificate expiration is present.
- PFX and PFX password were selected during media creation.

### Hash capture fails

Check:

- OA3Tool was staged into the media.
- `PCPKsp.dll` exists in the applied Windows image.
- Foundry can copy `PCPKsp.dll` into WinPE before capture.
- `OA3.xml` was generated.
- Serial number and hardware hash are not empty.

Missing or unloadable support-library failures stop the Autopilot provisioning step because Foundry cannot capture a reliable hash. Graph upload or polling failures are recorded as skipped Autopilot upload results and the Windows deployment can continue.

### Device is imported but group tag is wrong

Foundry attempts to reconcile the group tag after the imported device is visible in Windows Autopilot devices.

Check `autopilot-hash-upload-status.json` and `AutopilotUploadResult.json` under:

```text
<target Windows>\Windows\Temp\Foundry\Logs\AutopilotHash
```

If multiple Windows Autopilot devices match the same serial number, Foundry skips group tag reconciliation to avoid updating the wrong device.

## Interactive hardware hash upload

### The assistant does not appear in OOBE

Check:

```text
<target Windows>\Windows\Setup\Scripts\OOBE.cmd
<target Windows>\Windows\Temp\Foundry\AutopilotRegistration
<target Windows>\Windows\Temp\Foundry\Logs\AutopilotRegistration
```

Useful logs:

| File | What to check |
| --- | --- |
| `OOBE.log` | Whether Windows called the Foundry OOBE launcher |
| `oobe-launcher.log` | Whether the waiter was started |
| `oobe-waiter.log` | Active console session detection and ServiceUI launch |
| `oobe-sessiondiag.log` | OOBE process/session diagnostics |
| `foreground.log` | Foreground preparation and assistant launch |

### Authentication fails immediately

Check `registration.log` and `graph.log`.

Common causes:

- No DNS or internet access during OOBE.
- Device-code endpoint blocked.
- Tenant policy blocks delegated Microsoft Graph consent.
- Conditional Access blocks device code flow, requires a compliant device, or blocks the sign-in context.
- The signed-in account does not have Intune Autopilot permissions to import Windows Autopilot devices.

If a device code expires, Foundry requests and displays a new code automatically.

Check Microsoft Entra sign-in logs for the technician account when authentication is blocked after the code is confirmed at `https://microsoft.com/devicelogin`.

### Group tags are missing

The assistant lists existing group tags by reading Windows Autopilot devices from Microsoft Graph. Only group tags already present on devices in the tenant can be discovered.

Use **Custom** when the required group tag is not returned by discovery but should still be applied.

### Upload fails after authentication

Check:

- The signed-in account has Intune **Enrollment programs** permissions to create and read Autopilot devices.
- The signed-in account has update or sync permissions if the selected group tag needs reconciliation.
- The target has internet access during OOBE.
- The device serial number is available.
- The hardware hash can be read from Windows MDM device detail.
- Microsoft Graph import and polling are available.

The final result is written to:

```text
<target Windows>\Windows\Temp\Foundry\AutopilotRegistration\State\registration-result.json
```

## Logs to collect

Collect the relevant folder for the selected mode:

| Mode | Folder |
| --- | --- |
| JSON profile injection | Deployment log and final deployment summary |
| Zero-touch hardware hash upload | `<target Windows>\Windows\Temp\Foundry\Logs\AutopilotHash` |
| Interactive hardware hash upload | `<target Windows>\Windows\Temp\Foundry\Logs\AutopilotRegistration` |

Do not share raw files publicly without checking for tenant identifiers, serial numbers, or other environment-specific data.

## Next steps

- Open [JSON Profile Injection](./json-profile-injection) for expected file staging.
- Open [Zero-touch Hardware Hash Upload](./zero-touch-hardware-hash-upload) for certificate-based upload behavior.
- Open [Interactive Hardware Hash Upload](./interactive-hardware-hash-upload) for OOBE assistant behavior.
