import { WagmiConfig, createClient, configureChains, mainnet, useAccount } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import Profile from './Profile'
import SendTransaction from './SendTransaction'
import NotConnected from './NotConnected'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: '-Xa1KImKC_YxiuIUOJguZJ_Xu8CODwHH' }), publicProvider()],
)

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  provider,
  webSocketProvider,
})

function App() {
  const { address, connector, isConnected } = useAccount()

  return (
    <WagmiConfig client={client}>
      <div className='App w-full h-[100vh] text-black md:overflow-hidden'>
        <header className='flex-col md:flex-row flex justify-between items-center px-12 border-y-2 border-black'>
          {/* <div className="nav-container"> */}
          <div className="logo text-6xl font-neue pt-2 font-black">
            SENDOOOR
          </div>
          <div className='wallet self-stretch cursor-pointer'>
            <div className='h-full flex items-center justify-center border-x-2 border-black transition-all duration-200'>
              <Profile address={address} connector={connector} isConnected={isConnected} />
            </div>
          </div>

          {/* </div> */}
        </header>
        <div className="content h-full grid md:grid-cols-2 px-12">
          <div className='flex justify-center items-center border-t-2 md:border-t-0 md:border-r-2 border-black text-2xl font-neue order-last md:order-none'>
            It is known that it is difficult to communicate between Chads. One method I've found incredibly effective is to send him a message directly to his address on the blockchain. Wait, really? You don't know how to do? Wellll so I'll send them a message for you!
          </div>
          <div className='self-center justify-self-center w-full font-neue italic'>

            {isConnected ? <SendTransaction /> : <NotConnected />}
          </div>

        </div>

      </div>
    </WagmiConfig>
  )
}

export default App;