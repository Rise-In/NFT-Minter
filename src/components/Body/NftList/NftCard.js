import React from "react";

const NftCard = ({
  name = "",
  description= "",
  image ="",
  attributes= [],
}) => {

  return (
    <div className="bg-gray-200 border-4 text-2xl shadow-xl shadow-black border-black flex-col flex gap-2 text-center items-center max-w-96 m-5 p-4 rounded-lg">
      <div className="foodlogo-container h-64 flex rounded-xl overflow-hidden">
        <img
          className="foodlogo zoom-in-foodlogo sm:w-full md:w-fit bg-cover rounded-xl transition-transform duration-300 ease-in-out hover:transition-transform hover:scale-125"
          src={`https://gateway.pinata.cloud/ipfs/${image}`}
        />
      </div>
      <h2>
        <span className="font-bold text-blue-500 text-3xl">Name: </span>
        <div className="text-4xl font-semibold">{name}</div>
      </h2>
      <h4>
        <span className="font-bold text-blue-500 text-3xl">Description: </span>
        <div>{description.slice(0, 120)}...</div>
      </h4>
      <h4>
        <span className="font-bold text-blue-500 text-3xl">
          Creator's GitHub:{" "}
        </span>
        <div>
          <a
            href={`https://github.com/${attributes[1]?.value}`}
            target="_blank"
            className="underline hover:text-violet-600"
            rel="noopener noreferrer"
          >
            {attributes[1]?.value}{" "}
            <span className="sm:text-2xl">
              <ion-icon name="open"></ion-icon>
            </span>
          </a>
        </div>
      </h4>
    </div>
  );
};

export default NftCard;
