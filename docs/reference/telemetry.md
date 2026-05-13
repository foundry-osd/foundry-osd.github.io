---
title: Telemetry
description: Understand Foundry anonymous usage telemetry, collected events, excluded data, and opt-out behavior.
---

Foundry collects anonymous product telemetry to understand which versions and deployment paths are used in the field. Telemetry is enabled by default and can be disabled from **Settings > Telemetry** in Foundry OSD.

The telemetry setting is propagated into generated Foundry Connect and Foundry Deploy runtimes. If telemetry is disabled before creating media, Connect and Deploy do not send telemetry from that media.

## Events

Foundry sends a small set of low-cardinality events:

| Event | Sent by | When |
| --- | --- | --- |
| `app_started` | Foundry OSD, Foundry Deploy | Once when the application starts. Foundry Connect uses `connect_network_ready` instead. |
| `boot_media_created` | Foundry OSD | Once when ISO or USB boot media creation finishes, including failed attempts. |
| `connect_network_ready` | Foundry Connect | Once when internet connectivity is confirmed. |
| `deployment_completed` | Foundry Deploy | Once when deployment completes, fails, is cancelled, or is rejected because another deployment is already running. |

## Collected Data

Common properties include:

- Application name and version.
- Build configuration, such as debug or release.
- Runtime category, such as desktop or WinPE.
- Runtime payload source for Connect and Deploy, such as debug or release.
- Process architecture, locale, and an anonymous installation identifier.

Media creation properties include:

- Media target, ISO or USB.
- Success status and duration.
- WinPE architecture, language, boot image source, and signature mode.
- USB partition style and format mode for USB media.
- Whether Dell, HP, or custom drivers were enabled.
- Whether network, Connect, Deploy, and Autopilot configuration were enabled.

Connect properties include:

- Connection type, Ethernet or Wi-Fi.
- Wi-Fi security category, such as open, OWE, personal, or enterprise.
- Whether wired 802.1X or provisioned Wi-Fi settings were present.

Deploy properties include:

- Success, cancellation status, duration, completed step count, and failed step name.
- Deployment mode and dry-run status.
- Hardware manufacturer, hardware model, and virtual machine status.
- Selected Windows release, version, build, architecture, and language.
- Driver pack selection kind, vendor, and model.
- Firmware update and Autopilot enablement.

## Excluded Data

Telemetry does not collect:

- User names, domain names, email addresses, computer names, IP addresses, or Wi-Fi SSIDs.
- Disk numbers, disk names, serial numbers, file paths, URLs, passwords, secrets, tokens, or passphrases.
- Autopilot profile names, profile folder names, or deployment logs.
- Raw exceptions or stack traces.

## Transport

Foundry uses PostHog product analytics for telemetry ingestion. Release builds receive the public PostHog project token during CI publishing. Debug builds do not include a project token unless the developer explicitly provides one through the build property or environment used by the build.
