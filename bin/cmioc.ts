import { Command, InvalidArgumentError } from "@commander-js/extra-typings";
import {
    Address,
    BaseError,
    Hex,
    hexToBytes,
    isAddress,
    isHex,
    toHex,
} from "viem";

import {
    encodeInputBlob,
    encodeOutputBlob,
    decodeInputBlob,
    decodeOutputBlob,
    Input,
    Notice,
    Voucher,
} from "../src";

import { version } from "../package.json";

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
            throw new InvalidArgumentError(`Not an integer: ${value}`);
        } else {
            throw e;
        }
    }
};

const parseAddress = (value: string): Address => {
    if (isAddress(value)) {
        return value;
    } else {
        throw new InvalidArgumentError(`Not an address: ${value}`);
    }
};

const parseHex = (value: string): Hex => {
    if (isHex(value)) {
        return value;
    } else {
        throw new InvalidArgumentError(`Not a hexstring: ${value}`);
    }
};

const readFromStdin = (): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        let inputData: Buffer[] = [];

        process.stdin.on("data", (chunk) => {
            inputData.push(chunk);
        });

        process.stdin.on("end", () => {
            const inputBuffer = Buffer.concat(inputData);
            resolve(inputBuffer);
        });

        process.stdin.on("error", (err) => {
            reject(err);
        });
    });
};

const readHexFromStdin = async (binary: boolean): Promise<Hex> => {
    const buffer = await readFromStdin();
    if (binary) {
        return toHex(buffer);
    } else {
        return parseHex(buffer.toString().trim());
    }
};

const writeHexToStdout = (hex: Hex, binary: boolean) => {
    if (binary) {
        process.stdout.write(hexToBytes(hex));
    } else {
        process.stdout.write(hex + "\n");
    }
};

const stringifyBigInt = (_k: any, v: any): string => {
    return typeof v === "bigint" ? v.toString() : v;
};

const toJSON = (value: any): string => {
    return JSON.stringify(value, stringifyBigInt, 4);
};

program.name("cmioc").version(version).description("Cartesi Machine I/O Codec");

const encodeCommand = program.command("encode");

encodeCommand.description("Encodes a blob");

encodeCommand
    .command("input")
    .description("Encodes an input blob")
    .requiredOption("--chain-id <uint256>", "the chain ID", parseBigInt)
    .requiredOption(
        "--app-contract <address>",
        "the application contract address",
        parseAddress,
    )
    .requiredOption(
        "--msg-sender <address>",
        "the address of who sent the input",
        parseAddress,
    )
    .requiredOption(
        "--block-number <uint256>",
        "the number of the block",
        parseBigInt,
    )
    .requiredOption(
        "--block-timestamp <uint256>",
        "the timestamp of the block",
        parseBigInt,
    )
    .requiredOption(
        "--index <uint256>",
        "the index of the input in the input box",
        parseBigInt,
    )
    .requiredOption("--payload <bytes>", "the payload of the input", parseHex)
    .option("-b, --binary", "write to stdout as binary data", false)
    .action((options) => {
        const input: Input = { ...options };
        const { binary } = options;
        writeHexToStdout(encodeInputBlob(input), binary);
    });

encodeCommand
    .command("voucher")
    .description("Encodes a voucher blob")
    .requiredOption(
        "--destination <address>",
        "the destination address",
        parseAddress,
    )
    .requiredOption(
        "--value <uint256>",
        "the amount of Wei to be passed along the call",
        parseBigInt,
    )
    .requiredOption("--payload <bytes>", "the destination address", parseHex)
    .option("-b, --binary", "write to stdout as binary data", false)
    .action((options) => {
        const voucher: Voucher = { type: "voucher", ...options };
        const { binary } = options;
        writeHexToStdout(encodeOutputBlob(voucher), binary);
    });

encodeCommand
    .command("notice")
    .description("Encodes a notice blob")
    .requiredOption("--payload <bytes>", "the destination address", parseHex)
    .option("-b, --binary", "write to stdout as binary data", false)
    .action((options) => {
        const notice: Notice = { type: "notice", ...options };
        const { binary } = options;
        writeHexToStdout(encodeOutputBlob(notice), binary);
    });

const decodeCommand = program.command("decode");

decodeCommand.description("Decodes a blob");

decodeCommand
    .command("input")
    .description("Decodes an input blob")
    .argument("[blob]", "blob (if absent, reads from stdin)", parseHex)
    .option("-b, --binary", "read from stdin as binary data", false)
    .action(async (blob, { binary }) => {
        try {
            const input = decodeInputBlob(
                blob ?? (await readHexFromStdin(binary)),
            );
            console.log(toJSON(input));
        } catch (e) {
            handleError(e);
        }
    });

decodeCommand
    .command("output")
    .description("Decodes an output blob")
    .argument("[blob]", "blob (if absent, reads from stdin)", parseHex)
    .option("-b, --binary", "read from stdin as binary data", false)
    .action(async (blob, { binary }) => {
        try {
            const output = decodeOutputBlob(
                blob ?? (await readHexFromStdin(binary)),
            );
            console.log(toJSON(output));
        } catch (e) {
            handleError(e);
        }
    });

program.parse();
