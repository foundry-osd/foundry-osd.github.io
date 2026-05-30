---
title: JSON Profile Injection
description: Stage an offline AutopilotConfigurationFile.json profile into the applied Windows image.
---

# JSON profile injection

JSON profile injection stages an offline Autopilot profile into the deployed Windows image.

Use this mode when Autopilot profiles are already exported or can be downloaded before media creation, and the target device should consume `AutopilotConfigurationFile.json` during Windows OOBE.

## What this mode does

Foundry OSD stages selected profile JSON files into the boot image. During deployment, Foundry Deploy copies the selected profile to:

```text
<target Windows>\Windows\Provisioning\Autopilot\AutopilotConfigurationFile.json
```

No hardware hash is captured. No Microsoft Graph upload is performed during deployment.

## Requirements

You need:

- Foundry OSD with Autopilot enabled.
- One or more valid offline Autopilot profile JSON files.
- A selected default profile before media creation.

Tenant sign-in in Foundry OSD is optional. Use it only when you want Foundry OSD to download profiles from the tenant instead of importing JSON files manually.

## Configure Foundry OSD

1. Open **Foundry OSD**.
2. Select **Expert Mode** in the navigation menu.
3. Select **Autopilot**.
4. Enable Autopilot.
5. Select **JSON profile injection**.
6. Import a profile JSON file or download profiles from the tenant.
7. Select the default profile that Foundry Deploy should use.

:::info[Screenshot needed]
Add a screenshot of the Autopilot page with JSON profile injection selected and the profile list visible.
:::

## Build the media

Build ISO or USB media normally.

Foundry OSD stages the profile set into the boot image under the Foundry configuration area. The generated deploy configuration carries the selected profile folder name, not the full profile JSON payload.

## Deploy the device

1. Boot the target device into Foundry media.
2. Wait for Foundry Connect to report **Network ready**.
3. Continue to Foundry Deploy.
4. Review the **Target** page.
5. Confirm that the Autopilot mode is JSON profile injection and that the selected profile is correct.
6. Complete the normal deployment workflow.

:::info[Screenshot needed]
Add a Foundry Deploy target page screenshot showing JSON profile injection and the selected Autopilot profile.
:::

## What happens during deployment

Near the end of the deployment pipeline, Foundry Deploy:

1. Validates that a profile is selected.
2. Resolves the staged profile file from the boot image.
3. Creates the target Windows Autopilot provisioning folder.
4. Copies the selected profile as `AutopilotConfigurationFile.json`.
5. Records the staged profile path in the deployment summary.

If Autopilot is enabled in JSON mode but no usable profile is selected, Foundry Deploy blocks the deployment start until the operator fixes the profile selection or disables Autopilot.

## Expected final result

After the device restarts into Windows OOBE, Windows reads the staged Autopilot profile from:

```text
Windows\Provisioning\Autopilot\AutopilotConfigurationFile.json
```

The device follows the behavior defined by that offline profile.

## Logs and validation

Check the final deployment summary and deployment log from the retained Foundry logs on the deployed Windows image.

The main validation point is the presence of:

```text
<target Windows>\Windows\Provisioning\Autopilot\AutopilotConfigurationFile.json
```

## Next steps

- Open [Autopilot Overview](./overview) to compare modes.
- Open [Troubleshooting](./troubleshooting) if the selected profile is missing or OOBE does not consume the profile.
