import {
    Connector,
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi'

interface profileProps {
    address: `0x${string}` | undefined,
    connector: Connector<any, any, any> | undefined,
    isConnected: boolean
}

// export default function Profile(address: `0x${string}` | undefined, connector: Connector<any, any, any> | undefined, isConnected: boolean) {
export default function Profile({ address, connector, isConnected }: profileProps) {
    // const { data: ensAvatar } = useEnsAvatar({address})
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()


    if (isConnected) {
        return (
            <>
                {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
                {/* { <div>{ensName ? `${ensName} (${address})` : address}</div> */}
                {/* <div>Connected to {connector?.name}</div>} */}
                <button className='h-full self-stretch p-4 md:bg-green-300 md:hover:bg-green-400 md:text-black' onClick={() => { disconnect() }}><div>{ensName ? `${ensName}` : `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`}</div></button>
            </>
        )
    }

    return (
        // <div className='h-full self-stretch p-4 bg-red-300'>
        //     {connectors.map((connector) => (
        //         <button
        //             disabled={!connector.ready}
        //             key={connector.id}
        //             onClick={() => connect({ connector })}
        //             className="h-full"
        //         >
        //             {connector.name}
        //             {!connector.ready && ' (unsupported)'}
        //             {isLoading &&
        //                 connector.id === pendingConnector?.id &&
        //                 ' (connecting)'}
        //         </button>
        //     ))}

        //     {error && <div>{error.message}</div>}
        // </div>
        <>{connectors.map((connector) => (
            <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
                className="h-full self-stretch p-4 md:bg-red-300 md:hover:bg-red-400 md:text-black"
            >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading &&
                    connector.id === pendingConnector?.id &&
                    ' (connecting)'}
            </button>
        ))}</>
    )
}
