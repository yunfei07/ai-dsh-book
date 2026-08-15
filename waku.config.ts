import { defineConfig } from "waku/config";
import tailwindcss from "@tailwindcss/vite";
import press from "fumapress/vite";
import mdx from "fumadocs-mdx/vite";
import { defaultLocaleDevPlugin } from "./scripts/default-locale-dev-plugin.mjs";

export default defineConfig({
  vite: {
    plugins: [defaultLocaleDevPlugin("zh"), press(), mdx(), tailwindcss()],
    resolve: {
      external: ["@takumi-rs/core"],
    },
  },
});
