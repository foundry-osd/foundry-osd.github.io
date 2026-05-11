---
title: Welcome to the Foundry documentation site
description: Why this site exists and how the documentation is organized.
slug: welcome-to-foundry-docs
authors: [foundry-team]
tags: [docs]
image: /img/social-preview.png
---

The Foundry project now has a dedicated Docusaurus site for both documentation and blog content.

{/* truncate */}

The goal is simple:

- keep the product split clear
- make onboarding easier
- give contributors a stable place for architecture notes and workflow guidance

The documentation is organized around the actual runtime flow:

1. `Foundry` builds the media.
2. `Foundry.Connect` validates network readiness in WinPE.
3. `Foundry.Deploy` loads catalogs and runs the deployment workflow.

That separation matters because each product has a different runtime, a different responsibility, and different configuration concerns.

This first version of the site focuses on:

- getting started
- architecture and product boundaries
- configuration guidance
- developer workflows

Expect future posts to cover release notes, catalog changes, and deeper implementation details.
