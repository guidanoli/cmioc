import { readFileSync } from "fs";
import { Command, InvalidArgumentError } from "@commander-js/extra-typings";
import { Address, BaseError, Hex, isAddress, isHex } from "viem";

import { encodeInputBlob, encodeOutputBlob, decodeInputBlob, decodeOutputBlob } from "../src";

const program = new Command();

const handleError = (e: any) => {
    if (e instanceof BaseError) {
        console.error(e.shortMessage);
    } else {
        console.error(e);
    }
    process.exit(1);
};

const parseBigInt = (value: string): bigint => {
    try {
        return BigInt(value);
    } catch (e) {
        if (e instanceof SyntaxError) {
            throw new InvalidArgumentError("Not a valid integer");
        } else {
            throw e;
        }
    }
};

const parseAddress = (value: string): Address => {
    if (isAddress(value)) {
        return value;
    } else {
        throw new InvalidArgumentError("Not an address");
    }
};

const parseHex = (blob: string): Hex => {
    if (isHex(blob)) {
        return blob;
    } else {
        throw new InvalidArgumentError("Not a hexstring");
    }
};

const stringifyBigInt = (_k: any, v: any): string => {
    return typeof v === 'bigint' ? v.toString() : v;
}

program.name("cmioc").version("0.1.0").description("Cartesi Machine I/O Codec");

const encodeCommand = program.command("encode");

encodeCommand.description("Encodes a blob")

encodeCommand
    .command("input")
    .description("Encodes an input blob")
    .requiredOption("--chain-id <uint256>", "the chain ID", parseBigInt)
    .requiredOption("--app-contract <address>", "the application contract address", parseAddress)
    .requiredOption("--msg-sender <address>", "the address of who sent the input", parseAddress)
    .requiredOption("--block-number <uint256>", "the number of the block", parseBigInt)
    .requiredOption("--block-timestamp <uint256>", "the timestamp of the block", parseBigInt)
    .requiredOption("--index <uint256>", "the index of the input in the input box", parseBigInt)
    .requiredOption("--payload <bytes>", "the payload of the input", parseHex)
    .action((input) => {
        console.log(encodeInputBlob(input));
    });

encodeCommand
    .command("voucher")
    .description("Encodes a voucher blob")
    .requiredOption("--destination <address>", "the destination address", parseAddress)
    .requiredOption("--value <uint256>", "the amount of Wei to be passed along the call", parseBigInt)
    .requiredOption("--payload <bytes>", "the destination address", parseHex)
    .action((voucher) => {
        console.log(encodeOutputBlob({
            type: "voucher",
            ...voucher
        }));
    });

encodeCommand
    .command("notice")
    .description("Encodes a notice blob")
    .requiredOption("--payload <bytes>", "the destination address", parseHex)
    .action((notice) => {
        console.log(encodeOutputBlob({
            type: "notice",
            ...notice
        }));
    });

const decodeCommand = program.command("decode");

decodeCommand.description("Decodes a blob");

decodeCommand
    .command("input")
    .description("Decodes an input blob")
    .argument("[blob]", "blob", parseHex)
    .action((blob) => {
        try {
            const input = decodeInputBlob(blob ?? parseHex(readFileSync(0, "utf8").trim()));
            console.log(JSON.stringify(input, stringifyBigInt, 4));
        } catch (e) {
            handleError(e);
        }
    });

decodeCommand
    .command("output")
    .description("Decodes an output blob")
    .argument("[blob]", "blob", parseHex)
    .action((blob) => {
        try {
            const output = decodeOutputBlob(blob ?? parseHex(readFileSync(0, "utf8").trim()));
            console.log(JSON.stringify(output, stringifyBigInt, 4));
        } catch (e) {
            handleError(e);
        }
    });

program.parse();
