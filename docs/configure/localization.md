---
title: Localization
description: Configure language and time zone behavior staged from Foundry OSD into Foundry Deploy.
---

# Localization

Localization settings are authored in Foundry OSD and can be used later by Foundry Deploy.

## Application UI languages

Foundry OSD, Foundry Connect, and Foundry Deploy include UI translations for the Windows ADK WinPE language set:

| Language | Culture |
| --- | --- |
| Arabic (Saudi Arabia) | `ar-SA` |
| Bulgarian (Bulgaria) | `bg-BG` |
| Czech (Czechia) | `cs-CZ` |
| Danish (Denmark) | `da-DK` |
| German (Germany) | `de-DE` |
| Greek (Greece) | `el-GR` |
| English (United Kingdom) | `en-GB` |
| English (United States) | `en-US` |
| Spanish (Spain) | `es-ES` |
| Spanish (Mexico) | `es-MX` |
| Estonian (Estonia) | `et-EE` |
| Finnish (Finland) | `fi-FI` |
| French (Canada) | `fr-CA` |
| French (France) | `fr-FR` |
| Hebrew (Israel) | `he-IL` |
| Croatian (Croatia) | `hr-HR` |
| Hungarian (Hungary) | `hu-HU` |
| Italian (Italy) | `it-IT` |
| Japanese (Japan) | `ja-JP` |
| Korean (Korea) | `ko-KR` |
| Lithuanian (Lithuania) | `lt-LT` |
| Latvian (Latvia) | `lv-LV` |
| Norwegian Bokmal (Norway) | `nb-NO` |
| Dutch (Netherlands) | `nl-NL` |
| Polish (Poland) | `pl-PL` |
| Portuguese (Brazil) | `pt-BR` |
| Portuguese (Portugal) | `pt-PT` |
| Romanian (Romania) | `ro-RO` |
| Russian (Russia) | `ru-RU` |
| Slovak (Slovakia) | `sk-SK` |
| Slovenian (Slovenia) | `sl-SI` |
| Serbian Latin (Serbia) | `sr-Latn-RS` |
| Swedish (Sweden) | `sv-SE` |
| Thai (Thailand) | `th-TH` |
| Turkish (Turkiye) | `tr-TR` |
| Ukrainian (Ukraine) | `uk-UA` |
| Chinese Simplified (China) | `zh-CN` |
| Chinese Traditional (Taiwan) | `zh-TW` |

The application UI culture is separate from the deployment language list below. The WinPE language used for boot media is still constrained by the installed Windows ADK language components.

## Visible languages

Set visible languages to control which languages the deployment runtime can show.

Use a smaller visible set when operators should only choose from approved deployment languages.

## Default language

Set a default language only after selecting the visible language list.

:::note[Default language rule]
The default language must be part of the visible language list.
:::

## Time zone

Choose one of two modes:

- Leave time zone selection automatic.
- Set a specific default time zone.

Foundry OSD stores the time zone identifier used by the deployment runtime.

:::info[Screenshot placeholder]
Capture the localization section with visible languages, default language, and time zone controls visible.
:::

## Next step

Open [Deployment Flow](../deploy/deployment-flow) to see where these settings can affect runtime choices.
