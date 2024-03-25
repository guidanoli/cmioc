import { decodeInputBlob, decodeOutputBlob } from "../src/decode";

import { describe, expect, test } from '@jest/globals';

describe('decode', () => {

    test('input', () => {
        const input = decodeInputBlob("0xcc7dee1f000000000000000000000000000000000000000000000000000000000000000100000000000000000000000070ac08179605af2d9e75782b8decdd3c22aa4d0c000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000000000000129bbad0000000000000000000000000000000000000000000000000000000066019521000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000004deadbeef00000000000000000000000000000000000000000000000000000000");

        expect(input.chainId).toEqual(1n);
        expect(input.appContract).toEqual("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");
        expect(input.msgSender).toEqual("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        expect(input.blockNumber).toEqual(19512237n);
        expect(input.blockTimestamp).toEqual(1711379745n);
        expect(input.index).toEqual(42n);
        expect(input.payload).toEqual("0xdeadbeef");
    });

    test('input with empty payload', () => {
        const input = decodeInputBlob("0xcc7dee1f000000000000000000000000000000000000000000000000000000000000000100000000000000000000000070ac08179605af2d9e75782b8decdd3c22aa4d0c000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000000000000129bbad0000000000000000000000000000000000000000000000000000000066019521000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000000");

        expect(input.chainId).toEqual(1n);
        expect(input.appContract).toEqual("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");
        expect(input.msgSender).toEqual("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        expect(input.blockNumber).toEqual(19512237n);
        expect(input.blockTimestamp).toEqual(1711379745n);
        expect(input.index).toEqual(42n);
        expect(input.payload).toEqual("0x");
    });

    test('voucher', () => {
        const output = decodeOutputBlob("0x237a816f000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003fafafa0000000000000000000000000000000000000000000000000000000000");

        switch (output.type) {
            case "voucher":
                {
                    expect(output.destination).toEqual("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
                    expect(output.value).toEqual(1000000000000000000n);
                    expect(output.payload).toEqual("0xfafafa");
                    break;
                }
            default:
                throw new Error("expected output to be a voucher");
        }
    });

    test('voucher with empty payload', () => {
        const output = decodeOutputBlob("0x237a816f000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000");

        switch (output.type) {
            case "voucher":
                {
                    expect(output.destination).toEqual("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
                    expect(output.value).toEqual(1000000000000000000n);
                    expect(output.payload).toEqual("0x");
                    break;
                }
            default:
                throw new Error("expected output to be a voucher");
        }
    });

    test('notice', () => {
        const output = decodeOutputBlob("0xc258d6e500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004deadbeef00000000000000000000000000000000000000000000000000000000");

        switch (output.type) {
            case "notice":
                {
                    expect(output.payload).toEqual("0xdeadbeef");
                    break;
                }
            default:
                throw new Error("expected output to be a notice");
        }
    });

    test('notice with empty payload', () => {
        const output = decodeOutputBlob("0xc258d6e500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000");

        switch (output.type) {
            case "notice":
                {
                    expect(output.payload).toEqual("0x");
                    break;
                }
            default:
                throw new Error("expected output to be a notice");
        }
    });
});
