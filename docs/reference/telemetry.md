---
title: Telemetry
description: Understand Foundry anonymous usage telemetry, collected events, excluded data, and opt-out behavior.
---

Foundry collects anonymous product telemetry to understand which versions, media creation paths, connectivity modes, and deployment options are used in the field. Telemetry is enabled by default and can be disabled from **Settings > Telemetry** in Foundry OSD.

The telemetry setting is propagated into generated Foundry Connect and Foundry Deploy runtimes. If telemetry is disabled before creating media, Connect and Deploy do not send telemetry from that media.

## Events

Foundry sends a small set of low-cardinality events optimized for monthly event limits:

| Event | Sent by | When |
| --- | --- | --- |
| `app:daily_active` | Foundry OSD | At most once per local day when the desktop application starts. |
| `osd:boot_media_finished` | Foundry OSD | Once when ISO or USB boot media creation finishes, including failed attempts. |
| `connect:session_ready` | Foundry Connect | Once after the Continue action, including automatic continuation after the countdown, when internet connectivity is ready. |
| `deploy:session_finished` | Foundry Deploy | Once when deployment completes, fails, is cancelled, or is rejected because another deployment is already running. |

## Collected Data

Every event includes this common telemetry envelope:

- `telemetry_schema_version`: telemetry payload schema version.
- `app`: stable application identifier, such as `foundry_osd`, `foundry_connect`, or `foundry_deploy`.
- `app_version`: running application version.
- `build_configuration`: build configuration, such as `debug` or `release`.
- `runtime`: runtime category, such as `desktop` or `winpe`.
- `runtime_payload_source`: source of the Connect or Deploy runtime payload.
- `boot_media_target`: `iso`, `usb`, `none`, or `unknown`.
- `runtime_architecture`: process or runtime architecture.
- `locale`: current UI or runtime culture.
- `session_id`: random per-process identifier used to group events from one run.

Foundry does not send IP addresses. PostHog geolocation is enabled so dashboards can aggregate coarse country usage from the ingestion request.

### `app:daily_active`

This event has no event-specific properties. It uses only the common telemetry envelope and is throttled by the local Foundry OSD settings file.

### `osd:boot_media_finished`

Media creation properties include:

- `boot_media_target`: `iso` or `usb`.
- `success`: whether media creation completed successfully.
- `duration_seconds`: total media creation duration.
- `failed_step_name`: failed media creation step name, `unknown`, or empty when media creation succeeded.
- `boot_media_architecture`: selected WinPE architecture.
- `winpe_language`: selected WinPE language.
- `boot_image_source`: selected boot image source.
- `signature_mode`: selected PowerShell signature mode.
- `usb_partition_style`: selected USB partition style, or `none` for ISO media.
- `usb_format_mode`: selected USB format mode, or `none` for ISO media.
- `include_dell_drivers`: whether Dell WinPE drivers were enabled.
- `include_hp_drivers`: whether HP WinPE drivers were enabled.
- `custom_drivers_enabled`: whether custom WinPE drivers were enabled.
- `network_configured`: whether network configuration was ready.
- `connect_configured`: whether Foundry Connect configuration was ready.
- `deploy_configured`: whether Foundry Deploy configuration was ready.
- `connect_runtime_payload_source`: source of the generated Connect runtime payload.
- `deploy_runtime_payload_source`: source of the generated Deploy runtime payload.
- `autopilot_enabled`: whether Autopilot provisioning was enabled.
- `customization_any_enabled`: whether any Customization page setting was enabled.
- `customization_machine_naming_enabled`: whether machine naming customization was enabled.
- `customization_machine_naming_mode`: `disabled`, `manual`, `auto_generated_locked`, or `auto_generated_editable`.
- `customization_machine_naming_prefix_configured`: whether a machine naming prefix was configured.
- `customization_oobe_enabled`: whether Windows OOBE customization was enabled.
- `customization_oobe_skip_license_terms`: whether OOBE license terms are skipped.
- `customization_oobe_diagnostic_data_level`: `required`, `optional`, or `off`.
- `customization_oobe_hide_privacy_setup`: whether the Windows privacy choices page is hidden.
- `customization_oobe_tailored_experiences_enabled`: whether tailored experiences are allowed.
- `customization_oobe_advertising_id_enabled`: whether the Windows advertising ID is allowed.
- `customization_oobe_online_speech_recognition_enabled`: whether online speech recognition is allowed.
- `customization_oobe_inking_typing_diagnostics_enabled`: whether inking and typing diagnostics are allowed.
- `customization_oobe_location_access`: `user_controlled` or `force_off`.

### `connect:session_ready`

Connect properties include:

- `success`: always `true` when this event is sent.
- `connection_type`: `ethernet`, `wifi`, or `unknown`.
- `layout_mode`: `ethernet_only` or `ethernet_wifi`.
- `wifi_security`: `none`, `open`, `owe`, `personal`, `enterprise`, or `unknown`.
- `wifi_source`: `none`, `provisioned`, or `manual`.
- `wired_dot1x_enabled`: whether wired 802.1X settings were provisioned.
- `wifi_provisioned`: whether a Wi-Fi profile was provisioned into the runtime.

### `deploy:session_finished`

Deploy properties include:

- `success`: whether deployment completed successfully.
- `cancelled`: whether deployment was cancelled.
- `duration_seconds`: total deployment orchestration duration.
- `completed_step_count`: number of completed deployment steps.
- `failed_step_name`: failed step name, `operation_busy`, `unknown`, or empty when no step failed.
- `mode`: selected deployment mode.
- `is_dry_run`: whether dry-run mode was enabled.
- `hardware_vendor`: normalized hardware manufacturer.
- `hardware_model`: normalized hardware model.
- `is_virtual_machine`: whether the target hardware is virtualized.
- `os_product`: normalized Windows product family.
- `os_version`: selected Windows release version.
- `os_build`: selected Windows build.
- `os_architecture`: selected Windows architecture.
- `os_language`: selected Windows language.
- `driver_pack_selection_kind`: selected driver pack mode.
- `driver_pack_vendor`: selected driver pack manufacturer, or `none`.
- `driver_pack_model`: selected driver pack model, or `none`.
- `firmware_updates_enabled`: whether firmware updates were enabled.
- `autopilot_enabled`: whether Autopilot provisioning was enabled.

## Excluded Data

Telemetry does not collect:

- User names, domain names, email addresses, computer names, IP addresses, or Wi-Fi SSIDs.
- Machine naming prefixes or generated computer names.
- Disk numbers, disk names, serial numbers, file paths, URLs, passwords, secrets, tokens, or passphrases.
- Autopilot profile names, profile folder names, or deployment logs.
- Raw exceptions or stack traces.

## Transport

Foundry uses PostHog product analytics for telemetry ingestion. Release builds receive the public PostHog project token during CI publishing. Debug builds do not include a project token unless the developer explicitly provides one through the build property or environment used by the build.

The telemetry sender rejects unknown event names and removes properties that are not explicitly allowed for that event before sending the payload.
