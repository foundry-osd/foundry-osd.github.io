---
title: Understanding the Foundry runtime handoff
description: A short explanation of how Foundry, Foundry.Connect, and Foundry.Deploy fit together.
slug: understanding-the-runtime-handoff
authors: [foundry-team]
tags: [architecture, deployment]
image: /img/foundry-social-preview.png
---

One of the easiest ways to misunderstand Foundry is to treat the whole platform as one application.

It is not.

{/* truncate */}

The project is intentionally split into three runtime responsibilities.

## Foundry

`Foundry` runs on the admin workstation and builds the deployment media.

That includes:

- WinPE customization
- expert configuration authoring
- staging configuration for the two WinPE applications

## Foundry.Connect

`Foundry.Connect` runs first in WinPE and acts as a network gate.

It exists so the deployment workflow does not start before the environment is actually ready.

## Foundry.Deploy

`Foundry.Deploy` is the deployment experience itself.

It loads the catalogs, exposes the deployment wizard, and runs the deployment steps in order.

## Why the handoff matters

This split keeps each product focused:

- authoring stays on the workstation
- connectivity validation stays at bootstrap time
- deployment execution stays in the deployment app

That is the mental model used throughout the documentation site, and it is the right way to think about the platform when you are debugging or extending it.
