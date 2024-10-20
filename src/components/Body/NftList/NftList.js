import React, { useState, useEffect } from 'react'
import NftCard from './NftCard'
import { readContract, createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import NftSearchBar from './NftSearchBar';

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID,
});

const chainId = 656476;

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(chainId),
  address: process.env.REACT_APP_EDUCHAIN_DEPLOYED_SMART_CONTRACT_ADDRESS,
});

const NftList = () => {
  const [nftList, _setNftList] = useState([]);
  const [filteredNftList, _setFilteredNftList] = useState(false);
  const [searchQuery, _setSearchQuery] = useState('');

  const onSearchBtnClick = () => {
    try {
      if (searchQuery?.length) {
        const trimmedSearchVal = searchQuery.trim();
    
        const filteredResults = nftList.filter((nft) => {
          const githubId = nft.attributes[1].value;
    
          return githubId.includes(trimmedSearchVal);
        });
        
        console.log(filteredResults);
  
        _setFilteredNftList(filteredResults);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSearchBarChange = (e) => {
    try {
      _setSearchQuery(e.target.value);

      if (e.target.value === '') {
        _setFilteredNftList(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{
    getAllTokenURIs();
  },[])

    const getAllTokenURIs = async () => {
      let returnValue = await readContract({
        contract: contract,
        method: "function getAllTokenURIs() view returns (string[])",
        params: [],
      });

      const resultPromises = [];

      returnValue.forEach((ipfsHash) => {
        const promise = fetch(
          `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
        ).then((res) => {
          return res.json();
        }).catch((e) => {
          console.error("cant fetch",e);
        });

        resultPromises.push(promise);
      });

      Promise.all(resultPromises).then((values) => {
        const successfullResponses = values.filter(val => val);

        _setNftList(successfullResponses);
      });
    };
  
  return <div className='main-container p-4'>
    <NftSearchBar onSearchBtnClick={onSearchBtnClick} onSearchBarChange={onSearchBarChange} />
    <div className="flex flex-wrap justify-center">
      {
        nftList?.length === 0 && <h1 className='mt-3'>Loading...</h1>
      }
      {
        filteredNftList ? <>
          {
            filteredNftList.length === 0
              ? <h1 className='mt-5'>No results found for github ID '{searchQuery}' </h1>
              : <>
                {
                  filteredNftList.map((ele) => (
                    <NftCard {...ele} key={JSON.stringify(ele)} />
                  ))
                }
              </>
          }
        </>
        : nftList?.map((ele) => (
          <NftCard {...ele} key={JSON.stringify(ele)} />
        ))
      }
    </div>
  </div>;
}

export default NftList