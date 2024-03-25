import { Inputs__factory, Outputs__factory } from "@cartesi/rollups";

import { decodeFunctionData, Hex, Address } from 'viem'

export interface InputFields {
    chainId: bigint
    appContract: Address
    msgSender: Address
    blockNumber: bigint
    blockTimestamp: bigint
    index: bigint
    payload: Hex
}

export const decodeInputBlob = (blob : Hex) : InputFields => {

    const { functionName, args } = decodeFunctionData({
        abi: Inputs__factory.abi,
        data: blob
    });

    switch (functionName) {
        case "EvmAdvance":
            {
                const [
                    chainId,
                    appContract,
                    msgSender,
                    blockNumber,
                    blockTimestamp,
                    index,
                    payload
                ] = args;

                return {
                    chainId,
                    appContract,
                    msgSender,
                    blockNumber,
                    blockTimestamp,
                    index,
                    payload
                }
            }
        default:
            throw new Error("Invalid input blob");
    }
}

export interface VoucherFields {
    type: "voucher";
    destination: Address;
    value: bigint;
    payload: Hex;
}

export interface NoticeFields {
    type: "notice";
    payload: Hex
}

export type OutputFields =
    | VoucherFields
    | NoticeFields
    ;

export const decodeOutputBlob = (blob : Hex) : OutputFields => {

    const { functionName, args } = decodeFunctionData({
        abi: Outputs__factory.abi,
        data: blob
    });

    switch (functionName) {
        case "Notice":
            {
                const [payload] = args;

                return {
                    type: "notice",
                    payload
                };
            }
        case "Voucher":
            {
                const [destination, value, payload] = args;

                return {
                    type: "voucher",
                    destination,
                    value,
                    payload
                };
            }
    }
}

