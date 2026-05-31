---
title: Customization
description: Configure machine naming, operating system selection, Windows OOBE behavior, AI component removal, and provisioned AppX removal in Foundry OSD for Foundry Deploy.
---

# Customization

Customization settings define deployment-time behavior that should be prepared before the target device boots.

## Machine naming

Foundry OSD can stage machine naming behavior for Foundry Deploy.

Available controls include:

- Enable or disable machine naming.
- Define a machine name prefix.
- Enable automatic name generation.
- Allow or block manual suffix editing.

:::tip[Prefer simple naming rules]
Use a prefix and automatic suffix generation unless operators need per-device naming exceptions.
:::

:::info[Screenshot placeholder]
Capture the Customization page with the machine naming controls expanded.
:::

## Operating system selection

Foundry OSD can stage the Operating System Catalog choices shown later in Foundry Deploy.

Available controls include:

- Allowed OS versions.
- Default OS version.
- Allowed OS languages.
- Default OS language.
- Allowed license channels.
- Default license channel.
- Allowed editions.
- Default edition.

Allowed lists restrict what Foundry Deploy operators can see. Leave an allowed list empty to keep every supported catalog option available.

Default values only preselect a value. They do not add that value back if it is outside the matching allowed list.

When an allowed list contains exactly one valid value for the current catalog scope, Foundry Deploy preselects that value and disables the selector.

License channel and edition values use English catalog labels in Foundry Deploy. `RET` is shown as `Retail`, `VOL` is shown as `Volume`, and edition names such as `Pro` and `Enterprise` remain English.

:::info[Screenshot placeholder]
Capture the Customization page with the operating system selection controls expanded.
:::

## Windows OOBE

Foundry OSD can stage Windows 11 first-run defaults before the target device reaches OOBE.

Available controls include:

- Enable or disable OOBE customization.
- Skip the Microsoft Software License Terms page.
- Set the Windows diagnostic data level to required, optional, or off.
- Hide the Windows privacy choices page.
- Allow or block tailored experiences, advertising ID, online speech recognition, and inking or typing diagnostics.
- Leave location access user-controlled or force it off.

:::note[Diagnostic data off depends on edition]
Windows accepts the off setting only on editions that support it, such as Enterprise and Education. Unsupported Windows 11 editions can fall back to the required diagnostic data level.
:::

:::tip[Keep OOBE predictable]
Use OOBE customization when deployment media should produce the same first-run privacy baseline across operators and sites.
:::

:::info[Screenshot placeholder]
Capture the Customization page with the Windows OOBE controls expanded.
:::

## AI component removal

Foundry OSD can stage removal or policy-based disablement of selected Windows AI components before OOBE.

Available controls include:

- Enable or disable AI component removal with one switch.
- Remove the Microsoft Copilot provisioned AppX package and turn off Windows Copilot policies.
- Remove the Copilot+ AI Hub provisioned AppX package.
- Disable Windows Recall.
- Disable Click to Do.
- Prevent the Windows AI service from starting automatically.
- Disable AI features in Microsoft Edge.
- Disable AI features in Paint.
- Disable AI features in Notepad.

Turning on the main switch selects every AI option. You can then turn individual options off when the deployment standard needs a smaller scope. Turning off the last child option disables the main switch.

Copilot and Windows AI Hub are managed from this control instead of the generic AppX package catalog so AI-related changes remain auditable in one place.

:::info[Screenshot placeholder]
Capture the Customization page with the AI component removal controls expanded.
:::

## Provisioned AppX removal

Foundry OSD can stage removal of selected Windows 11 provisioned AppX packages before OOBE. This affects packages provisioned for new users; it does not run per-user AppX removal.

Available controls include:

- Enable or disable AppX removal.
- Select all packages.
- Remove all package selections.
- Select one or more profiles from the AppX categories.
- Manually select packages grouped by category.

Profiles are based on the package categories shown in the control. Selecting multiple profiles applies the union of their package lists. Clearing a profile clears that category's package checkboxes. The profile selector shows a category when one complete profile is selected, a profile count when multiple complete profiles are selected, `Custom` when the package selection is mixed or partial, and `None` when no packages are selected. Selecting `Remove all` clears every package and returns the profile state to `None`.

:::caution[Review native utilities before removing them]
Some AppX packages are Windows inbox tools such as Calculator, Notepad, Photos, Paint, Snipping Tool, Terminal, and Quick Assist. Remove native utilities only when the deployment standard intentionally excludes them.
:::

:::info[Screenshot placeholder]
Capture the Customization page with the provisioned AppX removal controls expanded.
:::

## Runtime impact

Machine naming affects the Foundry Deploy wizard. OOBE customization is applied to the offline Windows installation during deployment by writing unattend and policy values.

Operating system selection affects the Foundry Deploy Operating System Catalog page. Allowed values restrict the version, language, license channel, and edition choices available to the deployment operator. Default values preselect choices only when those values are valid in the current catalog scope.

AI component removal is split across the deployment phases. Foundry Deploy writes AI policy values into the offline target registry hives while it is still running in WinPE. Machine-wide policies are written through the offline `SOFTWARE` and `SYSTEM` hives, and future-user defaults are written by loading `Users\Default\NTUSER.DAT` under a temporary `HKU\FoundryDefault` mount. Foundry does not write these defaults through `HKEY_USERS\.DEFAULT`.

Provisioned AppX removal is staged as a pre-OOBE PowerShell script. Foundry Deploy writes the selected package list into `Windows\Temp\Foundry\PreOobe\Data\Remove-AppX.packages.json`, and Windows executes the script through `SetupComplete.cmd` before user profiles are created.

When Copilot or Windows AI Hub removal is selected, Foundry also stages `Windows\Temp\Foundry\PreOobe\Data\Remove-AiComponents.settings.json`. That pre-OOBE script only removes the selected AI provisioned AppX packages; AI policy registry values are already applied offline in WinPE.

Staging this behavior from Foundry OSD makes the live deployment path faster and more consistent.

## Recommended approach

- Use a prefix when devices should share a naming convention.
- Enable automatic generation when operators should move quickly.
- Allow manual suffix editing only when local exceptions are expected.
- Use operating system selection when media should guide operators toward approved Windows versions, languages, license channels, or editions.
- Enable OOBE customization when you want a consistent privacy and license-term baseline.
- Keep optional privacy features disabled unless the deployment policy requires them.
- Use AI component removal when Windows AI features should be removed or disabled before the first user profile is created.
- Start AppX removal with one or more category profiles, then use `Custom` only when the deployment standard needs a mixed or partial package set.
- Avoid selecting every native utility unless the image is intentionally locked down.

## Next step

Open [Deployment Flow](../deploy/deployment-flow) to see where customization can affect runtime choices.
