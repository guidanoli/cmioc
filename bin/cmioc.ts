import { Command } from "commander";
import { BaseError } from "viem";

import { decodeInputBlob, decodeOutputBlob, parseBlob } from "../src";

const program = new Command();

const handleError = (e : any) => {
    if (e instanceof BaseError) {
        console.error(e.shortMessage);
    } else {
        console.error(e);
    }
    process.exit(1);
}

program
    .name("cmioc")
    .version("0.1.0")
    .description("Cartesi Machine I/O Codec");

const decodeCommand = program.command("decode");

decodeCommand
    .description("Decodes a blob");

decodeCommand
    .command("input")
    .description("Decodes an input blob")
    .argument("<blob>", "blob", parseBlob)
    .action((blob) => {
        try {
            const input = decodeInputBlob(blob);
            console.log(input);
        } catch (e) {
            handleError(e);
        }
    });

decodeCommand
    .command("output")
    .description("Decodes an output blob")
    .argument("<blob>", "blob", parseBlob)
    .action((blob) => {
        try {
            const output = decodeOutputBlob(blob);
            console.log(output);
        } catch (e) {
            handleError(e);
        }
    });

program.parse();
