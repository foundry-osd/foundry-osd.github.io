---
title: Network Readiness
description: Understand the Foundry Connect step that validates WinPE networking before deployment continues.
---

# Network readiness

Foundry Connect runs first after the target device boots into WinPE.

Its role is to validate the runtime network state before deployment continues.

:::warning[Do not close Foundry Connect to continue]
Closing Foundry Connect is treated as an abort path. Continue only through the controlled ready state.
:::

## Runtime order

Foundry Connect follows this runtime sequence:

1. Load the staged network configuration.
2. Apply provisioned wired or Wi-Fi settings when present.
3. Inspect the current network state.
4. Validate internet access when required.
5. Show the readiness state to the operator.
6. Continue to Foundry Deploy when the required conditions are met.

![Foundry Connect network ready state](/img/docs/foundry-connect/network-ready.png)

## User choices

Depending on the staged configuration and current network state, the user may need to:

- Confirm that the correct adapter is active.
- Wait for wired 802.1X to complete.
- Select or confirm Wi-Fi connectivity.
- Stop and fix network prerequisites before deployment continues.

## Inputs staged by Foundry OSD

Foundry OSD can stage:

- Wired 802.1X profile templates
- Wired trust certificates
- Personal Wi-Fi settings
- Enterprise Wi-Fi profile templates
- Enterprise Wi-Fi trust certificates

Read [Network Configuration](../configure/network) for the workstation-side settings.

## Not-ready state

If the runtime network state is not ready, Foundry Connect keeps the deployment workflow gated.

Use the screen state to determine whether the issue is:

- Missing adapter connectivity
- Authentication still in progress
- Wi-Fi not connected
- Internet validation failure

![Foundry Connect waiting for network state](/img/docs/foundry-connect/network-waiting.png)

## Next step

After Foundry Connect reports readiness, continue to [Deployment Flow](../deploy/deployment-flow).
