---
title: Download and Requirements
---

# Download and requirements

Foundry has two common entry points:

- Use a published release to build deployment media.
- Build from source only if you are contributing or validating local changes.

:::tip[Default path]
If you want to create deployment media and deploy devices, use the latest release build. Source builds are for contributors and validation work.
:::

## Use a release

For normal usage, start with the latest release from the main repository:

- Releases: `https://github.com/foundry-osd/foundry/releases`

If your goal is to create boot media and deploy devices, use the release build first. Source builds belong in the developer section.

## Foundry manages the ADK state

Foundry does not only depend on a preinstalled ADK. The desktop app actively checks whether the required ADK components are installed and compatible before it allows ISO or USB creation.

When Foundry detects that the ADK is missing or incompatible:

- it shows a banner in the main window
- it offers the correct action directly in the UI
- it keeps media creation disabled until the ADK state is compatible

In practice, that means the normal operator flow is:

1. Open Foundry.
2. Check whether the ADK banner is shown.
3. Use `Install ADK` or `Upgrade ADK` from inside Foundry if required.
4. Wait for the verification step to complete.
5. Continue with ISO or USB creation.

:::warning[Match the ADK components]
Foundry targets the Windows 11 24H2 ADK baseline and expects the WinPE add-on from the same release.
:::

:::info[Suggested screenshot]
Add a capture of the ADK banner in Foundry, showing the install or upgrade action in the main window.
:::

<details>
<summary>What Foundry checks behind the scenes</summary>

Foundry validates the `KitsRoot10` installation path, checks that both `Deployment Tools` and `Windows Preinstallation Environment` are present, resolves the installed version, and verifies compatibility against the supported 24H2 ADK baseline.

Foundry also caches the ADK installers under `%ProgramData%\Foundry\Installers`, so download, install, uninstall, and upgrade operations can be managed from the app.

</details>

## Release prerequisites

Prepare an admin workstation with:

- Windows 10 or Windows 11
- Local administrator rights for ADK management and media creation workflows
- Internet access for downloads and catalog-backed workflows
- Windows ADK 11 `24H2`
- Windows PE add-on for the same ADK release

## Deployment scope

The current project scope is centered on Windows 11 deployment:

- Windows 11 `23H2`
- Windows 11 `24H2`
- Windows 11 `25H2`
- `x64` and `ARM64`

Catalog-driven driver workflows currently cover:

- Dell
- HP
- Lenovo
- Microsoft Surface

## What the prerequisites are used for

| Requirement | Why it matters |
| --- | --- |
| Windows ADK + WinPE add-on | Required by Foundry to build and customize WinPE-based media |
| Local administrator rights | Needed for ADK management, media creation, and USB provisioning workflows |
| Internet access | Needed for catalog-backed downloads and runtime validation |

## Build from source

Only use the source-build path when you need to modify or validate the application itself.

- Follow [Build from Source](../developer/build-from-source) for the contributor workflow.
- Return to this page if you need the release prerequisites again.

:::info[Suggested screenshot]
Add a capture of the GitHub release page with the correct Foundry asset highlighted.
:::

## Next step

Continue to [Quick Start](./quick-start) for the shortest end-to-end walkthrough.
