import { defineConfig } from "vocs";

export default defineConfig({
    title: "cmioc — Cartesi Machine Input/Output Codec",
    titleTemplate: "%s — cmioc Documentation",
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
                    text: "Encoding",
                    items: [
                        {
                            text: "Inputs",
                            link: "/docs/cli/encoding/inputs",
                        },
                        {
                            text: "Notices",
                            link: "/docs/cli/encoding/notices",
                        },
                        {
                            text: "Vouchers",
                            link: "/docs/cli/encoding/vouchers",
                        },
                        {
                            text: "DELEGATECALL Vouchers",
                            link: "/docs/cli/encoding/delegatecall-vouchers",
                        },
                    ],
                },
                {
                    text: "Decoding",
                    items: [
                        {
                            text: "Inputs",
                            link: "/docs/cli/decoding/inputs",
                        },
                        {
                            text: "Outputs",
                            link: "/docs/cli/decoding/outputs",
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
                    text: "Encoding",
                    items: [
                        {
                            text: "Inputs",
                            link: "/docs/ts/encoding/inputs",
                        },
                        {
                            text: "Notices",
                            link: "/docs/ts/encoding/notices",
                        },
                        {
                            text: "Vouchers",
                            link: "/docs/ts/encoding/vouchers",
                        },
                        {
                            text: "DELEGATECALL Vouchers",
                            link: "/docs/ts/encoding/delegatecall-vouchers",
                        },
                    ],
                },
                {
                    text: "Decoding",
                    items: [
                        {
                            text: "Inputs",
                            link: "/docs/ts/decoding/inputs",
                        },
                        {
                            text: "Outputs",
                            link: "/docs/ts/decoding/outputs",
                        },
                    ],
                },
            ],
        },
    ],
    editLink: {
        pattern:
            "https://github.com/guidanoli/cmioc/edit/main/docs/pages/:path",
        text: "Edit on GitHub",
    },
    iconUrl: {
        dark: "/up-and-down-arrows-white.svg",
        light: "/up-and-down-arrows-black.svg",
    },
    logoUrl: {
        dark: "/up-and-down-arrows-white.svg",
        light: "/up-and-down-arrows-black.svg",
    },
});
