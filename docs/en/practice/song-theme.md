# Build the Song-inspired UI theme

English | [中文](/practice/song-theme)

This tutorial adds a visual identity to the dsh Web UI without changing the persisted appearance preference. The result is a client plugin that shades both built-in palettes, unloads cleanly, and can be removed or replaced by a later profile patch.

## Prerequisites

Complete [your first plugin](../basic/index.md) and [services and dependencies](../framework/service.md), then read the [Web UI style reference](https://github.com/deepseek-ai/DeepSeek-Harness/blob/master/docs/web-styling.md). Start from a repository checkout with dependencies installed.

## Choose the extension point

`@deepseek-ai/dsh-client-ui-theme` owns the `light`, `dark`, and `system` preference. Its `ThemeRuntime.overrideTokens(source, tokens)` method adds a named layer over the active palette. Every entry requires a light and dark value, and the returned disposer removes exactly that layer.

A visual identity belongs in this override layer. Registering a fourth persisted preference would mix brand composition with a user's color-scheme choice, while editing the base stylesheet would make the identity difficult to remove. The Song theme remains a separate client plugin and leaves the preference schema unchanged.

## Create the package

The working implementation lives in the standalone [`yunfei07/ui-song-theme`](https://github.com/yunfei07/ui-song-theme) repository. It has a no-op Node entry so Loader can load the package, a browser entry exported as `./client`, and committed build artifacts so dsh can install it directly from GitHub. Its `package.json` declares the browser dependency by package name:

```json
{
  "dsh": {
    "client": {
      "inject": ["@deepseek-ai/dsh-client-ui-theme"],
      "platform": "web"
    }
  }
}
```

The package depends on `@deepseek-ai/dsh-client-ui-theme` as a peer. It ships no React component because the theme service already owns presentation state.

## Define paired semantic tokens

Keep static color decisions in the theme plugin and expose them through existing semantic names. The working package uses warm silk-paper surfaces, warm dark text, celadon interactions, and cinnabar errors. Its dark values use night-ink surfaces and a brighter celadon accent.

```ts ignore-check
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'

const tokens = {
  '--dsw-alias-bg-base': {
    light: 'oklch(0.97 0.012 82)',
    dark: 'oklch(0.18 0.012 75)',
  },
  '--dsw-alias-label-primary': {
    light: 'oklch(0.25 0.018 70)',
    dark: 'oklch(0.9 0.012 82)',
  },
  '--dsw-alias-brand-primary': {
    light: 'oklch(0.43 0.065 174)',
    dark: 'oklch(0.76 0.07 174)',
  },
} satisfies ThemeTokenOverrides
```

Use semantic names instead of introducing component-specific colors. The same celadon value can serve the brand, primary button, active navigation, and focus roles through their separate aliases. Components remain unaware of the palette.

## Mount and release the layer

The browser entry declares the service injection and gives the disposer to Cordis:

```ts ignore-check
import type { Context } from '@deepseek-ai/cordis'
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'

const tokens = {
  '--dsw-alias-bg-base': {
    light: 'oklch(0.97 0.012 82)',
    dark: 'oklch(0.18 0.012 75)',
  },
} satisfies ThemeTokenOverrides

export const inject = ['theme']

export function apply(ctx: Context): void {
  ctx.effect(
    () => ctx.theme.overrideTokens('my-song-theme', tokens),
    'my-song-theme: paired token override',
  )
}
```

The type-only theme import activates Cordis declaration merging without adding a browser value dependency. `inject` delays `apply` until ThemeRuntime exists. When the plugin unloads, the effect disposer removes the named layer and ThemeRuntime republishes the palette below it.

## Add shared geometry and typography roles

Color alone leaves the original visual language intact. The shared theme owner defines `--dsw-font-family-display`, semantic radius variables, and `--dsw-press-scale`. Shared primitives consume those variables, while feature headings opt into the display family. Body copy stays on `--dsw-font-family`, and code stays on `--ds-font-family-code`.

The Song composition uses a restrained hierarchy: display text uses an installed Song or CJK serif face; body text uses the existing sans-serif stack; cards use small radii and borders instead of floating capsules; primary controls move to celadon; error roles use cinnabar. The package does not download a font or add decorative textures, so loading and text rendering remain predictable.

## Install and compose the plugin

Install the GitHub repository as a bundle in the Web profile:

```sh
dsh plugin --profile web add github:yunfei07/ui-song-theme
dsh --profile web
```

Append a commit SHA for a reproducible installation. The bundle patch places the external theme after the base theme; removing the plugin restores the built-in theme:

```sh
dsh plugin --profile web add github:yunfei07/ui-song-theme#<commit-sha>
dsh plugin --profile web remove ui-song-theme
```

## Test the behavior

The focused spec mounts a real `ThemeRuntime`, loads the client plugin, and checks the resolved values in both color schemes. It then disposes the plugin and verifies that the layer disappears. A second assertion iterates the token dictionary and checks that every entry contains both modes.

```sh
git clone https://github.com/yunfei07/ui-song-theme.git
cd ui-song-theme
corepack pnpm@11.21.0 install
pnpm check
pnpm build
pnpm pack:check
```

Use visual review for hierarchy, contrast, focus visibility, narrow-window behavior, and both color schemes. Unit tests can prove composition and cleanup, but they cannot judge whether a display face is readable or whether two warm surfaces are distinguishable.

## Extend the theme safely

Add a semantic token when several components need the same role. Keep a value local when only one component owns it. A later theme plugin may override the same token names; ThemeRuntime applies layers in registration order and restores the previous value when the top layer is removed.

If the visual identity needs user-selectable variants, add a configuration field to this plugin and validate it at load time. Keep `light`, `dark`, and `system` under the base theme service so the operating-system preference continues to work across every identity.
