import { defineConfig } from "vocs";

export default defineConfig({
    title: "cmioc — Cartesi Machine Input/Output Codec",
    titleTemplate: "%s — cmioc Documentation",
    rootDir: ".",
    sidebar: [
        {
            text: "Getting Started",
            link: "/docs/getting-started",
        },
        {
            text: "CLI",
            items: [
                {
                    text: "Installation",
                    link: "/docs/cli/installation",
                },
                {
                    text: "Commands",
                    items: [
                        {
                            text: "encode input",
                            link: "/docs/cli/cmd/encode/input",
                        },
                        {
                            text: "encode notice",
                            link: "/docs/cli/cmd/encode/notice",
                        },
                        {
                            text: "encode voucher",
                            link: "/docs/cli/cmd/encode/voucher",
                        },
                        {
                            text: "encode delegatecallvoucher",
                            link: "/docs/cli/cmd/encode/delegatecallvoucher",
                        },
                        {
                            text: "decode input",
                            link: "/docs/cli/cmd/decode/input",
                        },
                        {
                            text: "decode output",
                            link: "/docs/cli/cmd/decode/output",
                        },
                    ],
                },
            ],
        },
        {
            text: "TypeScript",
            items: [
                {
                    text: "Installation",
                    link: "/docs/ts/installation",
                },
                {
                    text: "Types",
                    items: [
                        {
                            text: "Input",
                            link: "/docs/ts/types/input",
                        },
                        {
                            text: "Output",
                            link: "/docs/ts/types/output",
                        },
                    ],
                },
            ],
        },
    ],
    socials: [
        {
            icon: "discord",
            link: "https://discord.gg/pfXMwXDDfW",
        },
        {
            icon: "github",
            link: "https://github.com/guidanoli/cmioc",
        },
        {
            icon: "warpcast",
            link: "https://warpcast.com/cartesi",
        },
        {
            icon: "x",
            link: "https://www.x.com/cartesiproject",
        },
    ],
    editLink: {
        pattern:
            "https://github.com/guidanoli/cmioc/edit/main/site/pages/:path",
        text: "Edit on GitHub",
    },
    iconUrl: {
        dark: "/icon-white.svg",
        light: "/icon-black.svg",
    },
    logoUrl: {
        dark: "/logo-white.svg",
        light: "/logo-black.svg",
    },
});
