import { Inputs__factory, Outputs__factory } from "@cartesi/rollups";

import { encodeFunctionData, decodeFunctionData, Hex, Address } from "viem";

export type Input = {
    chainId: bigint;
    appContract: Address;
    msgSender: Address;
    blockNumber: bigint;
    blockTimestamp: bigint;
    prevRandao: bigint;
    index: bigint;
    payload: Hex;
};

export const encodeInputBlob = (input: Input): Hex => {
    const {
        chainId,
        appContract,
        msgSender,
        blockNumber,
        blockTimestamp,
        prevRandao,
        index,
        payload,
    } = input;

    const blob = encodeFunctionData({
        abi: Inputs__factory.abi,
        functionName: "EvmAdvance",
        args: [
            chainId,
            appContract,
            msgSender,
            blockNumber,
            blockTimestamp,
            prevRandao,
            index,
            payload,
        ],
    });

    return blob;
};

export const decodeInputBlob = (blob: Hex): Input => {
    const { functionName, args } = decodeFunctionData({
        abi: Inputs__factory.abi,
        data: blob,
    });

    switch (functionName) {
        case "EvmAdvance": {
            const [
                chainId,
                appContract,
                msgSender,
                blockNumber,
                blockTimestamp,
                prevRandao,
                index,
                payload,
            ] = args;

            return {
                chainId,
                appContract,
                msgSender,
                blockNumber,
                blockTimestamp,
                prevRandao,
                index,
                payload,
            };
        }
    }
};

export type Notice = {
    type: "notice";
    payload: Hex;
};

export type Voucher = {
    type: "voucher";
    destination: Address;
    value: bigint;
    payload: Hex;
};

export type DelegateCallVoucher = {
    type: "delegatecallvoucher";
    destination: Address;
    payload: Hex;
};

export type Output = Notice | Voucher | DelegateCallVoucher;

export const encodeOutputBlob = (output: Output): Hex => {
    switch (output.type) {
        case "notice": {
            const { payload } = output;

            const blob = encodeFunctionData({
                abi: Outputs__factory.abi,
                functionName: "Notice",
                args: [payload],
            });

            return blob;
        }
        case "voucher": {
            const { destination, value, payload } = output;

            const blob = encodeFunctionData({
                abi: Outputs__factory.abi,
                functionName: "Voucher",
                args: [destination, value, payload],
            });

            return blob;
        }
        case "delegatecallvoucher": {
            const { destination, payload } = output;

            const blob = encodeFunctionData({
                abi: Outputs__factory.abi,
                functionName: "DelegateCallVoucher",
                args: [destination, payload],
            });

            return blob;
        }
    }
};

export const decodeOutputBlob = (blob: Hex): Output => {
    const { functionName, args } = decodeFunctionData({
        abi: Outputs__factory.abi,
        data: blob,
    });

    switch (functionName) {
        case "Notice": {
            const [payload] = args;

            return {
                type: "notice",
                payload,
            };
        }
        case "Voucher": {
            const [destination, value, payload] = args;

            return {
                type: "voucher",
                destination,
                value,
                payload,
            };
        }
        case "DelegateCallVoucher": {
            const [destination, payload] = args;

            return {
                type: "delegatecallvoucher",
                destination,
                payload,
            };
        }
    }
};
