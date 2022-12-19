import { WagmiConfig, createClient, configureChains, mainnet, useAccount } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import Profile from './Profile'
import SendTransaction from './SendTransaction'
import NotConnected from './NotConnected'
import './App.css'

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
      <div className='App'>
        <header>
          <div className="nav-container">
            <div className="logo">
              SENDOOOR
            </div>
            <div className='wallet'>
              <Profile address={address} connector={connector} isConnected={isConnected} />
            </div>

          </div>
        </header>
        <div className="content">
          <div className="content-wrapper">
            <div>
            It is known that it is difficult to communicate between Chads. One method I've found incredibly effective is to send him a message directly to his address on the blockchain. Wait, really? You don't know how to do? Wellll so I'll send them a message for you!
            </div>
            {isConnected ? <SendTransaction /> : <NotConnected />}
          </div>
        </div>

      </div>
    </WagmiConfig>
  )
}

export default App;