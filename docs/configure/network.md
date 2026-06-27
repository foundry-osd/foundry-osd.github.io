---
title: Network Configuration
description: Configure wired 802.1X, Wi-Fi, and Windows profile roaming settings in Foundry OSD.
---

# Network configuration

Network settings are authored in Foundry OSD before media is built. They are used later by Foundry Connect in WinPE and by Foundry Deploy after Windows has been applied.

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

Personal Wi-Fi passphrases are used for media provisioning and are not persisted in the saved Foundry OSD settings.

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

## Windows profile roaming

Enable **Roam network profiles to Windows** when the same deployment connectivity should be available after WinPE exits and Windows enters OOBE.

When enabled, Foundry Connect captures eligible Foundry-managed profiles during WinPE and Foundry Deploy imports them during the pre-OOBE first-boot sequence:

- Wired 802.1X profile templates
- Provisioned Wi-Fi profiles staged by Foundry OSD
- Manual Wi-Fi connections made in Foundry Connect
- Trusted root CA certificates used by configured wired or enterprise Wi-Fi profiles

Enable **Include private-key certificate material** only when EAP-TLS or another certificate-based profile requires a client certificate with a private key. Foundry stages the selected PFX and encrypted password on the generated media, decrypts the password only during deployment staging, imports the PFX into `LocalMachine\My`, and removes the temporary pre-OOBE staging files after import.

:::note[Profile scope]
Profile roaming imports the captured profile material into Windows. Personal Wi-Fi profiles that can connect before OOBE are marked for automatic connection and Foundry asks Windows to connect them during the pre-OOBE handoff. User-only enterprise authentication can still require user credentials during OOBE or first sign-in.
:::

## Next step

Open [Network Readiness](../runtime/network-readiness) to understand how these settings are used after boot.
