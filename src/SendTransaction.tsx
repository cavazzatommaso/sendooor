import { hexlify, toUtf8Bytes } from 'ethers/lib/utils.js'
import * as React from 'react'
import { useDebounce } from 'use-debounce'
import {
    useNetwork,
    usePrepareSendTransaction,
    useSendTransaction,
    useWaitForTransaction,
} from 'wagmi'

export default function SendTransaction() {
    const [to, setTo] = React.useState('')
    const [debouncedTo] = useDebounce(to, 500)
    const [formStep, setFormStep] = React.useState(0)

    const [dataString, setDataString] = React.useState('')
    const [debouncedDataString] = useDebounce(dataString, 500)

    const { chain, chains } = useNetwork()


    const { config } = usePrepareSendTransaction({
        request: {
            to: debouncedTo,
            value: 0,
            data: debouncedDataString ? hexlify(toUtf8Bytes(dataString)) : undefined,
        },
    })
    const { data, sendTransaction } = useSendTransaction(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    if (isSuccess)
        return <>
            <div className="flex flex-col m-auto w-[80%] gap-2 text-lg">
                Successfully sent message: {dataString} to {to}
                <div>
                    <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                </div>
            </div>
        </>

    if (formStep === 0)
        return <>
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        setFormStep(1)
                    }}
                    className="flex flex-col m-auto w-[80%] gap-2"
                >
                    <div className="form-action flex justify-between text-2xl items-center">
                        <p>Recipient</p>
                        <button disabled={!to}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className='w-12 aspect-square'>
                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                        </svg></button>
                    </div>
                    <input
                        aria-label="Recipient"
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="0xA0Cf…251e"
                        value={to}
                        className="h-12 px-2 border-2 border-black dark:border-red-200 focus:outline-dashed focus:outline-2 focus:border-0 transition-all duration-100"
                    />
                    {chain && <div>Connected to {chain.name}</div>}
                    {chains && (
                        <div>Available chains: {chains.map((chain) => chain.nativeCurrency.symbol + " ")}</div>
                    )}
                </form>
            </div>
        </>

    if (formStep === 1)
        return <>
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        sendTransaction?.()
                    }}
                    className="flex flex-col m-auto w-[80%] gap-2"
                >
                    <div className="form-action flex justify-between text-2xl ">
                        <p>Text to encode on tx</p>
                        <button disabled={isLoading || !sendTransaction || !to || !dataString}>
                            {isLoading ? 'Sending...' : <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className='w-8 aspect-square'>
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>}

                        </button>
                    </div>
                    <input
                        aria-label="Text"
                        onChange={(e) => setDataString(e.target.value)}
                        placeholder="LFG FAM!!!"
                        value={dataString}
                        className="h-12 px-2 border-2 border-black dark:border-red-200 focus:outline-dashed focus:outline-2 focus:border-0 transition-all duration-100"
                    />
                    {chain && <div>Connected to {chain.name}</div>}
                    {chains && (
                        <div>Available chains: {chains.map((chain) => chain.nativeCurrency.symbol + " ")}</div>
                    )}
                </form>
            </div>
        </>

    return <>
        Generic Error</>
}
