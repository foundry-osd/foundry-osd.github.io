---
title: Localization
---

# Localization

Localization settings are authored in `Foundry` and can flow into `Foundry.Deploy`.

## Visible languages

The visible language list controls which languages the deployment runtime can present to the operator.

This lets you keep the deployment experience narrow and predictable instead of exposing every catalog language.

## Default language override

You can choose a default language override, but it must be one of the visible languages.

If it is not part of the visible set, the override is ignored.

:::note[Validation rule]
Set the visible languages first, then choose the default language override from that same reduced set.
:::

## Time zone

You can either:

- Leave time zone selection automatic
- Choose a specific default time zone

The desktop app stores the selected time zone identifier rather than a display label.

## Force single visible language

Use this when you want the runtime experience to behave as a single-language deployment flow instead of a multilingual one.

This is useful for highly controlled deployment environments.

:::info[Suggested screenshot]
Add a capture of the localization section with visible languages, default language, time zone, and single-language controls visible.
:::

## Where it is used

These settings matter most in `Foundry.Deploy`, where the operator sees and selects deployment options during the live session.
