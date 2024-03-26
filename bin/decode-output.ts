import { Command } from "commander";
import { BaseError } from "viem";

import { decodeOutputBlob, parseBlob } from "../src";

const program = new Command();

program
    .name("decode-output")
    .version("0.1.0")
    .description("Decodes output blobs")
    .argument("<blob>", "blob", parseBlob)
    .action((blob) => {
        try {
            const output = decodeOutputBlob(blob);
            console.log(output);
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
