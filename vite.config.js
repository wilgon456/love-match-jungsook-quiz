import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getBasePath() {
  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];

  if (!repository) {
    return "/";
  }

  if (repository.endsWith(".github.io")) {
    return "/";
  }

  return `/${repository}/`;
}

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? getBasePath() : "/"
});
