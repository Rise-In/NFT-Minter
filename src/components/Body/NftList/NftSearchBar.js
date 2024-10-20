import React from "react";

const NftSearchBar = ({
  onSearchBtnClick = () => { },
  onSearchBarChange = () => { }
}) => {
  return <div className="nft-search-bar-container flex sm:w-full lg:w-1/2 gap-2 mx-auto">
    <input
      className="nft-search-bar p-2 border border-blue-400 rounded outline-none w-[80%] focus:shadow-md"
      type="text"
      placeholder="Search by Github ID"
      onChange={onSearchBarChange}
    />
    <button
      className="nft-search-btn 
      w-[20%]
      p-2
      cursor-pointer
      border-blue-400
      bg-blue-500
      hover:bg-blue-600
      text-white
      border
      rounded
      p-2"
      onClick={onSearchBtnClick}
      type="button"
    >
      Search
    </button>
  </div>
}

export default NftSearchBar