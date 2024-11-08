'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import Image from "next/image";
import ConnectWallet from "./components/ConnectMetamask"; 
import SearchBar from "./components/SearchBar";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FutureCard from './components/FutureCard';

// Dynamically importing components
const QuoteComponent = dynamic(() => import("./components/Quote"));
const CodeSnippet = dynamic(() => import("./components/CodeSnippet1"));
const ScrollToTopButton = dynamic(() => import("./components/ScrollToTopButton"));
const Footer = dynamic(() => import("./components/footer"));

const text = "where, 1 = 0.";
const quote = "Crypto is like a salt, If the other person understands the value, You can sell it for gold.";
const author = "Xennium";

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState({
    tokenAddress: '...',
    solidityCode: '...',
    deploy: '...',
    dependencyModule: '...'
  });

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(fetchedData => setData(fetchedData))
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/searchUser?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="flex mt-3 ml-auto">
        <SearchBar onSearch={handleSearch} />
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading-container">
            <div className="loading-animation text-xl font-bold">X</div>
            <div className="rotating-circle size-1"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative flex items-center justify-center z-[-1] mt-[-20px]">
            <Image
              className="relative z-10 fade-in"
              src="/xennium.png"
              alt="Xennium"
              width={180}
              height={180}
              priority
            />
            <p className="absolute top-[70%] left-1/2 transform -translate-x-1/2 text-sm opacity-50 z-20 fade-in-text">
              {text.split("").map((char, index) => (
                <span 
                  key={index}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  className="fade-in-letter"
                >
                  {char}
                </span>
              ))}
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto mt-8">
            <p className="text-lg mb-2 text-left justify-normal">Xennium is a decentralized application (dApp) built on the Ethereum blockchain, 
              designed for educational purposes and testing on the Sepolia testnet. At its core, Xennium features the Xennium coin, 
              a unique digital asset that incorporates a token depreciation mechanism. This means that users cannot spend the last Xennium coin.</p>
          </div>

          {/* Section: Connect to MetaMask */}
          <div className="flex flex-col items-center mb-10 text-center">
            <ConnectWallet /> {/* ConnectWallet component replaces the entire frontend for MetaMask */}
          </div>

          {/* Future Potential Section */}
      <div className="w-full max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-3xl font-semibold mb-6"><i class="bi bi-stars"></i> Features of Xennium <i class="bi bi-stars"></i></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <FutureCard 
            title="DeFi Integration"
            description="Xennium will enable decentralized finance operations, staking, lending, and yield farming."
            iconClass="bi bi-bar-chart-line-fill"
            explanation="The last coin cannot be spent, ensuring liquidity and stability for decentralized finance activities, enabling DeFi apps to remain sustainable even as users interact with the token."
          />
          <FutureCard 
            title="Smart Contract Education"
            description="Xennium serves as a learning tool for developers, exploring Ethereum smart contracts in a test environment."
            iconClass="bi bi-puzzle"
            explanation="By preventing the last coin from being spent, Xennium encourages safe experimentation within smart contract environments without risking complete depletion of resources."
          />
          <FutureCard 
            title="Future Token Innovations"
            description="Xennium will evolve with new token features like multi-chain support and governance capabilities."
            iconClass="bi bi-lightbulb-fill"
            explanation="With the last coin safeguarded, Xennium provides developers with consistent token availability for testing and developing innovative token features without interruption."
          />
          <FutureCard 
            title="Blockchain Interoperability"
            description="Xennium will allow seamless interaction with different blockchains for cross-chain dApps."
            iconClass="bi bi-braces"
            explanation="The restriction on spending the last coin ensures that tokens are always available for cross-chain operations, preventing the depletion of resources across multiple networks."
          />
          <FutureCard 
            title="NFTs Integration"
            description="Xennium will explore the integration of NFTs with token staking, creating a novel crypto experience."
            iconClass="bi bi-card-image"
            explanation="In the case of NFT integration, the last coin protection ensures that users can always interact with the token in a staking or governance context without exhausting available coins."
          />
          <FutureCard 
            title="Layer 2 Scaling"
            description="Layer 2 solutions will be incorporated to enhance scalability and transaction speed on Xennium."
            iconClass="bi bi-cloud-arrow-up"
            explanation="The last coin cannot be spent, ensuring that scaling solutions on Layer 2 remain intact by maintaining a guaranteed supply of Xennium tokens for transactions."
          />
        </div>
      </div>


          {/* Section: Call to Action */}
          <div className="text-center pt-5">
            <a href={session ? "/about" : "/register"} className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-md shadow-md  hover:bg-gray-100 hover:text-white focus:outline-none focus:ring-4 focus:ring-black transition-all duration-300 transform hover:scale-105 hover:translate-y-1">
              {session ? "Learn More" : "Get Started"}
            </a>
          </div>

          {/* Section: Code Snippets */}
          <div className="w-full max-w-4xl mx-auto mt-12">
            <h3 className="text-xl font-semibold mb-4">Xennium Token Address</h3>
            <p className="text-sm mb-2">The address of the Xennium token contract on the Ethereum blockchain.</p>
            <CodeSnippet code={data.tokenAddress} language="Xennium Token Address" />
          </div>

          <div className="w-full max-w-4xl mx-auto mt-12">
            <h3 className="text-xl font-semibold mb-4">Dependency Module</h3>
            <p className="text-sm mb-2">These are the dependencies required to interact with the Xennium contract.</p>
            <CodeSnippet code={data.dependencyModule} language="Dependency" />
          </div>

          <div className="w-full max-w-4xl mx-auto mt-12">
            <h3 className="text-xl font-semibold mb-4">Solidity Code</h3>
            <p className="text-sm mb-2">Here’s the Solidity code for the Xennium smart contract, allowing token transfers and faucet interactions.</p>
            <CodeSnippet code={data.solidityCode} language="solidity" />
          </div>

          <div className="w-full max-w-4xl mx-auto mt-12">
            <h3 className="text-xl font-semibold mb-4">Deployment Script</h3>
            <p className="text-sm mb-2">This JavaScript snippet shows the deployment of the Xennium contract to the Ethereum blockchain.</p>
            <CodeSnippet code={data.deploy} language="javascript" />
          </div>

          {/* Scroll to Top Button */}
          <div>
            <ScrollToTopButton />
          </div>

          {/* Quote Section */}
          <div className="flex mt-12">
            <QuoteComponent quote={quote} author={author} />
          </div>

          {/* Footer */}
          <Footer />
        </>
      )}
    </main>
  );
}
