import { hexlify, toUtf8Bytes } from 'ethers/lib/utils.js'
import * as React from 'react'
import { useDebounce } from 'use-debounce'
import {
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

    if (formStep === 0)
        return <>
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        setFormStep(1)
                    }}
                >
                    <div className="form-action">
                        <p>Recipient</p>
                        <button disabled={!to}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                        </svg></button>
                    </div>
                    <input
                        aria-label="Recipient"
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="0xA0Cf…251e"
                        value={to}
                    />
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
                >
                    <div className="form-action">
                        <p>Text to encode on tx</p>
                        <button>
                        {isLoading ? 'Sending...' : <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>}
                            
                        </button>
                    </div>
                    <input
                        aria-label="Text"
                        onChange={(e) => setDataString(e.target.value)}
                        placeholder="LFG FAM!!!"
                        value={dataString}
                    />
                </form>
            </div>
        </>

    // return (
    //     <form
    //         onSubmit={(e) => {
    //             e.preventDefault()
    //             sendTransaction?.()
    //         }}
    //     >
    //         <input
    //             aria-label="Recipient"
    //             onChange={(e) => setTo(e.target.value)}
    //             placeholder="0xA0Cf…251e"
    //             value={to}
    //         />
    //         <input
    //             aria-label="Message)"
    //             onChange={(e) => setDataString(e.target.value)}
    //             placeholder="LFG FAM!!!"
    //             value={dataString}
    //         />
    //         <button disabled={isLoading || !sendTransaction || !to || !dataString}>
    //             {isLoading ? 'Sending...' : 'Send'}
    //         </button>
    //         {isSuccess && (
    //             <div>
    //                 Successfully sent message: {dataString} to {to}
    //                 <div>
    //                     <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
    //                 </div>
    //             </div>
    //         )}
    //     </form>
    // )

    return <>
    Generic Error</>
}
