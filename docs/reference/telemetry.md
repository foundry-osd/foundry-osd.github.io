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
- `app_runtime`: runtime category, such as `desktop` or `winpe`.
- `app_runtime_architecture`: process or runtime architecture.
- `app_locale`: current UI or runtime culture.
- `session_id`: random per-process identifier used to group events from one run.
- `$process_person_profile`: disabled so events do not create person profiles.
- `$geoip_disable`: disabled so PostHog can aggregate coarse geolocation from ingestion metadata.

Foundry does not send IP addresses. PostHog geolocation is enabled so dashboards can aggregate coarse country usage from the ingestion request.

### `app:daily_active`

This event has no event-specific properties. It uses only the common telemetry envelope and is throttled by the local Foundry OSD settings file.

### `osd:boot_media_finished`

Media creation properties include:

- `boot_media_target`: `iso` or `usb`.
- `boot_media_creation_success`: whether media creation completed successfully.
- `boot_media_creation_duration_seconds`: total media creation duration.
- `boot_media_creation_failed_step_name`: failed media creation step name, `unknown`, or empty when media creation succeeded.
- `boot_media_architecture`: selected WinPE architecture.
- `boot_media_winpe_language`: selected WinPE language.
- `boot_media_boot_image_source`: selected boot image source.
- `boot_media_signature_mode`: selected PowerShell signature mode.
- `boot_media_usb_partition_style`: selected USB partition style, or `none` for ISO media.
- `boot_media_usb_format_mode`: selected USB format mode, or `none` for ISO media.
- `boot_media_drivers_dell_enabled`: whether Dell WinPE drivers were enabled.
- `boot_media_drivers_hp_enabled`: whether HP WinPE drivers were enabled.
- `boot_media_drivers_custom_enabled`: whether custom WinPE drivers were enabled.
- `boot_media_connect_runtime_payload_source`: source of the generated Connect runtime payload.
- `boot_media_deploy_runtime_payload_source`: source of the generated Deploy runtime payload.
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
- `customization_appx_removal_enabled`: whether provisioned AppX removal is enabled with at least one selected package.
- `customization_appx_removal_package_count`: number of selected provisioned AppX packages.
- `customization_appx_removal_profile`: `none`, `custom`, `multiple`, or the selected category profile token.
- `localization_any_enabled`: whether any Localization page setting is configured.
- `localization_visible_languages_count`: number of visible deployment languages selected.
- `localization_default_language_configured`: whether a default deployment language is configured.
- `localization_time_zone_configured`: whether a default deployment time zone is configured.
- `network_any_enabled`: whether any Network page setting is enabled.
- `network_wired_dot1x_enabled`: whether wired 802.1X provisioning is enabled.
- `network_wired_dot1x_profile_configured`: whether a wired 802.1X profile template is configured.
- `network_wired_dot1x_certificate_required`: whether wired 802.1X requires a certificate.
- `network_wired_dot1x_certificate_configured`: whether a wired 802.1X certificate source is configured.
- `network_wifi_provisioning_enabled`: whether Wi-Fi support is provisioned into the media.
- `network_wifi_profile_configured`: whether a Wi-Fi profile is configured.
- `network_wifi_security_type`: `none`, `open`, `owe`, `personal`, `enterprise`, or `unknown`.
- `network_wifi_ssid_configured`: whether an SSID is configured without sending its value.
- `network_wifi_passphrase_configured`: whether a provisioned personal Wi-Fi passphrase is available without sending its value.
- `network_wifi_enterprise_profile_configured`: whether an enterprise Wi-Fi profile template is configured.
- `network_wifi_enterprise_certificate_required`: whether enterprise Wi-Fi requires a certificate.
- `network_wifi_enterprise_certificate_configured`: whether an enterprise Wi-Fi certificate source is configured.

### `connect:session_ready`

Connect properties include:

- `boot_media_target`: `iso`, `usb`, `none`, or `unknown`.
- `connect_runtime_payload_source`: source of the generated Connect runtime payload.
- `connect_network_connection_type`: `ethernet`, `wifi`, or `unknown`.
- `connect_network_layout_mode`: `ethernet_only` or `ethernet_wifi`.
- `connect_ethernet_available`: whether an Ethernet adapter is available.
- `connect_wifi_available`: whether Wi-Fi runtime support and a wireless adapter are available.
- `connect_wifi_security_type`: `none`, `open`, `owe`, `personal`, `enterprise`, or `unknown`.
- `connect_wifi_source`: `none`, `provisioned`, or `manual`.
- `connect_wired_dot1x_enabled`: whether wired 802.1X settings were provisioned.
- `connect_wifi_provisioned`: whether a Wi-Fi profile was provisioned into the runtime.

### `deploy:session_finished`

Deploy properties include:

- `boot_media_target`: `iso`, `usb`, `none`, or `unknown`.
- `deploy_runtime_payload_source`: source of the generated Deploy runtime payload.
- `deploy_session_success`: whether deployment completed successfully.
- `deploy_session_cancelled`: whether deployment was cancelled.
- `deploy_session_duration_seconds`: total deployment orchestration duration.
- `deploy_session_completed_step_count`: number of completed deployment steps.
- `deploy_session_failed_step_name`: failed step name, `operation_busy`, `unknown`, or empty when no step failed.
- `deploy_session_mode`: selected deployment mode.
- `deploy_session_dry_run_enabled`: whether dry-run mode was enabled.
- `deploy_hardware_vendor`: normalized hardware manufacturer.
- `deploy_hardware_model`: normalized hardware model.
- `deploy_hardware_virtual_machine`: whether the target hardware is virtualized.
- `deploy_os_product`: normalized Windows product family.
- `deploy_os_version`: selected Windows release version.
- `deploy_os_build`: selected Windows build.
- `deploy_os_architecture`: selected Windows architecture.
- `deploy_os_language`: selected Windows language.
- `deploy_driver_pack_selection_kind`: selected driver pack mode.
- `deploy_driver_pack_vendor`: selected driver pack manufacturer, or `none`.
- `deploy_driver_pack_model`: selected driver pack model, or `none`.
- `deploy_firmware_updates_enabled`: whether firmware updates were enabled.
- `deploy_autopilot_enabled`: whether Autopilot provisioning was enabled.

## Excluded Data

Telemetry does not collect:

- User names, domain names, email addresses, computer names, IP addresses, or Wi-Fi SSIDs.
- Machine naming prefixes or generated computer names.
- Provisioned AppX package names.
- Disk numbers, disk names, serial numbers, file paths, URLs, file names, hashes, passwords, secrets, tokens, or passphrases.
- Localization values such as selected language codes, default language codes, or Windows time-zone identifiers.
- Network values such as SSIDs, passphrases, certificate paths, profile paths, profile contents, probe URLs, gateway details, adapter names, or Wi-Fi signal strength.
- Autopilot profile names, profile folder names, target computer names, deployment logs, OS image URLs, driver pack URLs, or firmware package URLs.
- Raw exceptions or stack traces.

## Transport

Foundry uses PostHog product analytics for telemetry ingestion. Release builds receive the public PostHog project token during CI publishing. Debug builds do not include a project token unless the developer explicitly provides one through the build property or environment used by the build.

The telemetry sender rejects unknown event names and removes properties that are not explicitly allowed for that event before sending the payload.

This schema is `telemetry_schema_version` 2.

During schema migrations, PostHog dashboards and insights may temporarily exist in old and new versions. The old assets are retained until the migration window ends, then renamed with `(old)`.
