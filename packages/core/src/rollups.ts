//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Inputs
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const inputsAbi = [
    {
        type: 'function',
        inputs: [
            { name: 'chainId', internalType: 'uint256', type: 'uint256' },
            { name: 'appContract', internalType: 'address', type: 'address' },
            { name: 'msgSender', internalType: 'address', type: 'address' },
            { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
            {
                name: 'blockTimestamp',
                internalType: 'uint256',
                type: 'uint256',
            },
            { name: 'prevRandao', internalType: 'uint256', type: 'uint256' },
            { name: 'index', internalType: 'uint256', type: 'uint256' },
            { name: 'payload', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'EvmAdvance',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Outputs
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const outputsAbi = [
    {
        type: 'function',
        inputs: [
            { name: 'destination', internalType: 'address', type: 'address' },
            { name: 'payload', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'DelegateCallVoucher',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'payload', internalType: 'bytes', type: 'bytes' }],
        name: 'Notice',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'destination', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
            { name: 'payload', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'Voucher',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const
