---
title: Network Configuration
description: Configure wired 802.1X and Wi-Fi settings in Foundry OSD for Foundry Connect.
---

# Network configuration

Network settings are authored in Foundry OSD and used later by Foundry Connect in WinPE.

:::note[Configure before boot]
Network settings are selected on the admin workstation, but they are validated on the target device after boot.
:::

## Wired 802.1X

Enable wired 802.1X when Ethernet requires authentication before the device can reach deployment resources.

Provide:

- Wired profile template
- Trusted root CA certificate when certificate trust is required

:::warning[Profile required]
Do not enable wired 802.1X without the matching profile template.
:::

:::info[Screenshot placeholder]
Capture the wired 802.1X settings with the profile template and trust certificate controls visible.
:::

## Wi-Fi provisioning

Enable Wi-Fi provisioning only when the target device needs wireless connectivity in WinPE.

Foundry OSD separates two decisions:

- Provision Wi-Fi support into the media.
- Configure a specific Wi-Fi network.

If Wi-Fi support is not provisioned, the remaining Wi-Fi settings are ignored.

## Personal Wi-Fi

Use personal Wi-Fi for:

- Open networks
- OWE networks
- WPA2/WPA3 personal networks

Provide the SSID. Provide a passphrase when the selected security type requires one.

:::info[Screenshot placeholder]
Capture the personal Wi-Fi settings with SSID, security type, and passphrase controls visible.
:::

## Enterprise Wi-Fi

Use enterprise Wi-Fi when the deployment network requires an enterprise profile.

Provide:

- SSID
- Enterprise profile template
- Matching security type
- Trusted root CA certificate when required

:::warning[Match the profile and security type]
The selected enterprise security type must match the authentication declared in the profile template.
:::

:::info[Screenshot placeholder]
Capture the enterprise Wi-Fi settings with profile template and trust certificate controls visible.
:::

## Next step

Open [Network Readiness](../connect/network-readiness) to understand how these settings are used after boot.
