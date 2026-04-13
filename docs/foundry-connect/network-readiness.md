---
title: Network Readiness
---

# Foundry.Connect network readiness

`Foundry.Connect` is the first runtime app launched in WinPE.

Its job is simple: confirm that bootstrap can continue.

:::warning[Closing the app is not a success path]
If the user closes `Foundry.Connect` before a controlled exit, bootstrap treats that as an abort path.
:::

## Runtime phases

1. Apply the provisioned wired or Wi-Fi settings.
2. Inspect the current network snapshot.
3. Validate internet access.
4. Expose the available connectivity layout to the user.
5. Auto-continue when the required conditions are met.

:::info[Suggested screenshot]
Add a capture of the ready state, where connectivity is valid and the countdown to continue is visible.
:::

## Supported network inputs

The configuration authored in `Foundry` can provide:

- Wired 802.1X profile templates
- Wired trust certificates
- Personal Wi-Fi configuration
- Enterprise Wi-Fi profile templates
- Enterprise Wi-Fi trust certificates

## How it behaves in WinPE

`Foundry.Connect` continuously refreshes the detected network state.

If connectivity is already valid, it can continue automatically after the configured countdown.

:::info[Suggested screenshot]
Add a capture of the not-ready or troubleshooting state, so the docs show what the operator sees when connectivity validation fails.
:::

## Configuration resolution

For normal boot media, `Foundry.Connect` reads the staged configuration prepared by `Foundry`.

For advanced and development scenarios, configuration can also be overridden by:

- `--config <path>`
- `FOUNDRY_CONNECT_CONFIG`

In the normal staged-media flow, bootstrap launches `Foundry.Connect` with an explicit `--config` path that points to the embedded runtime configuration.

<details>
<summary>Why configuration resolution matters</summary>

Most users will only use the staged media configuration. The override paths matter for troubleshooting, local testing, and advanced runtime control.

</details>

## When this page matters most

Read this section carefully if you depend on:

- Wired 802.1X in pre-OS environments
- Enterprise Wi-Fi in WinPE
- Auto-continue behavior after internet validation
- Troubleshooting deployment flows that stop before `Foundry.Deploy`
