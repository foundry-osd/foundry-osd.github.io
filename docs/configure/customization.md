---
title: Customization
description: Configure machine naming, Windows OOBE behavior, and provisioned AppX removal in Foundry OSD for Foundry Deploy.
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

## Provisioned AppX removal

Foundry OSD can stage removal of selected Windows 11 provisioned AppX packages before OOBE. This affects packages provisioned for new users; it does not run per-user AppX removal.

Available controls include:

- Enable or disable AppX removal.
- Select all packages.
- Remove all package selections.
- Select one or more profiles from the AppX categories.
- Manually select packages grouped by category.

Profiles are based on the package categories shown in the control. Selecting multiple profiles adds the union of their package lists. Clearing a profile only clears the profile marker; it does not clear the package checkboxes that were already selected. The profile selector shows a category when one complete profile is selected, a profile count when multiple complete profiles are selected, `Custom` when the package selection is mixed or profile markers were cleared, and `None` when no packages are selected. Selecting `Remove all` clears every package and returns the profile state to `None`.

:::caution[Review native utilities before removing them]
Some AppX packages are Windows inbox tools such as Calculator, Notepad, Photos, Paint, Snipping Tool, Terminal, and Quick Assist. Remove native utilities only when the deployment standard intentionally excludes them.
:::

:::info[Screenshot placeholder]
Capture the Customization page with the provisioned AppX removal controls expanded.
:::

## Runtime impact

Machine naming affects the Foundry Deploy wizard. OOBE customization is applied to the offline Windows installation during deployment by writing unattend and policy values.

Provisioned AppX removal is staged as a pre-OOBE PowerShell script. Foundry Deploy writes the selected package list into the pre-OOBE runner, and Windows executes it through `SetupComplete.cmd` before user profiles are created.

Staging this behavior from Foundry OSD makes the live deployment path faster and more consistent.

## Recommended approach

- Use a prefix when devices should share a naming convention.
- Enable automatic generation when operators should move quickly.
- Allow manual suffix editing only when local exceptions are expected.
- Enable OOBE customization when you want a consistent privacy and license-term baseline.
- Keep optional privacy features disabled unless the deployment policy requires them.
- Start AppX removal with one or more category profiles, then use `Custom` only when the deployment standard needs a mixed or partial package set.
- Avoid selecting every native utility unless the image is intentionally locked down.

## Next step

Open [Deployment Flow](../deploy/deployment-flow) to see where customization can affect runtime choices.
