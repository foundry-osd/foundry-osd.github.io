---
title: Network Configuration
---

# Network configuration

Network settings are authored in `Foundry` and consumed later by `Foundry.Connect`.

:::note[Author once, use later]
These settings are chosen on the admin workstation, but they only become visible when the target device boots into WinPE.
:::

## Wired 802.1X

Enable wired 802.1X when the deployment environment requires authenticated Ethernet before internet access is available.

The current configuration model supports:

- A wired profile template path
- An optional trusted root CA certificate
- Machine-oriented authentication handling for the provisioned profile

If wired 802.1X is enabled, the profile template is required.

If certificate trust is enabled, the certificate file is also required.

:::warning[Required dependency]
Do not enable wired 802.1X without the matching profile template. If you also enable trust validation, provide the certificate file at the same time.
:::

:::info[Suggested screenshot]
Add a capture of the wired 802.1X configuration area with the profile template and trust certificate inputs visible.
:::

## Wi-Fi provisioning

The desktop app separates Wi-Fi into two decisions:

- Whether Wi-Fi support is provisioned into the media
- Whether a specific Wi-Fi network is configured

If Wi-Fi is not provisioned, the rest of the Wi-Fi settings are ignored.

:::tip[Keep this simple]
Only provision Wi-Fi when the deployment environment actually needs wireless connectivity in WinPE.
:::

## Personal Wi-Fi

Use personal Wi-Fi when the target network is:

- Open
- OWE
- WPA2/WPA3 personal

For personal Wi-Fi, the SSID is required. A passphrase is required when the selected security type uses one.

:::info[Suggested screenshot]
Add a capture of the personal Wi-Fi settings with SSID, security type, and passphrase fields visible.
:::

## Enterprise Wi-Fi

Enterprise Wi-Fi requires:

- An SSID
- A profile template
- A matching security type
- An optional trusted root CA certificate when trust is required

The enterprise connection details come from the profile template itself. This screen does not model the full 802.1X exchange field by field.

For WPA3 enterprise variants, the selected security type must match the authentication declared in the profile template.

:::warning[Profile-template alignment matters]
If the selected WPA3 enterprise mode does not match the authentication declared in the profile template, the runtime connection path will not behave predictably.
:::

<details>
<summary>When to include the trust certificate</summary>

Include the root CA certificate when the enterprise profile requires certificate trust validation in WinPE. If the environment does not require it, keep the configuration smaller.

</details>

:::info[Suggested screenshot]
Add a capture of the enterprise Wi-Fi settings with the profile template and optional trust certificate controls visible.
:::

## Why this matters to media creation

When connectivity is part of the planned workflow, `Foundry` can prepare a boot image path that supports the network behavior required by `Foundry.Connect`.

That is why network settings are authored before the target device ever boots.
