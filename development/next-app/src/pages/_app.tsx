import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// wagmi
import { WagmiConfig, createClient, configureChains } from 'wagmi'
// Provider (alchemy, infura)
import { publicProvider } from 'wagmi/providers/public'
// chains
import { mainnet, sepolia, polygonZkEvmTestnet } from 'wagmi/chains'

// Connectors
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

const { chains, provider, webSocketProvider } = configureChains(
  [sepolia,],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true
      }
    }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId:,
    //     showQrModal: true
    //   }
    // }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "CeviWagmi"
      }
    })
  ],
  provider,
  webSocketProvider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
