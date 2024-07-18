import { describe, expect, test } from "@jest/globals";

import {
    encodeInput,
    encodeOutput,
    decodeInput,
    decodeOutput,
} from "@guidanoli/cmioc";
import { inputTestSuite, outputTestSuite } from "testsuite";

for (const { name, blob, data: input } of inputTestSuite) {
    describe(name, () => {
        test("encode", () => {
            expect(encodeInput(input)).toEqual(blob);
        });
        test("decode", () => {
            expect(decodeInput(blob)).toEqual(input);
        });
    });
}

for (const { name, blob, data: output } of outputTestSuite) {
    describe(name, () => {
        test("encode", () => {
            expect(encodeOutput(output)).toEqual(blob);
        });
        test("decode", () => {
            expect(decodeOutput(blob)).toEqual(output);
        });
    });
}
