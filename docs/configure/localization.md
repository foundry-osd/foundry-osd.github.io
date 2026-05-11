---
title: Localization
description: Configure language and time zone behavior staged from Foundry OSD into Foundry Deploy.
---

# Localization

Localization settings are authored in Foundry OSD and can be used later by Foundry Deploy.

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

## Single-language behavior

Enable single-language behavior when the deployment flow should not expose language choice to the operator.

:::info[Screenshot placeholder]
Capture the localization section with visible languages, default language, time zone, and single-language controls visible.
:::

## Next step

Open [Deployment Flow](../deploy/deployment-flow) to see where these settings can affect runtime choices.
