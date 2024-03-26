import { Command } from "commander";
import { BaseError } from "viem";

import { decodeInputBlob, parseBlob } from "../src";

const program = new Command();

program
    .name("decode-input")
    .version("0.1.0")
    .description("Decodes input blobs")
    .argument("<blob>", "blob", parseBlob)
    .action((blob) => {
        try {
            const input = decodeInputBlob(blob);
            console.log(input);
        } catch (e) {
            if (e instanceof BaseError) {
                console.error(e.shortMessage);
            } else {
                console.error(e);
            }
            process.exit(1);
        }
    });

program.parse();
