import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

const config: ReturnType<typeof defineConfig> = defineConfig({
    out: "src/rollups.ts",
    plugins: [
        foundry({
            project: "node_modules/@cartesi/rollups",
            forge: { build: false },
            include: ["Inputs.sol/**", "Outputs.sol/**"],
        }),
    ],
});

export default config;
