"use client";
import Image from "next/image";
// import { useClient } from 'next/data-client';
import React, { useState, useEffect } from 'react';

const Card = ({ catName, description, link, imageSrc }) => (
  <a
    href={link}
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 block mb-4"
    target="_blank"
    rel="noopener noreferrer"
    style={{ width: "300px", height: "350px", padding:"40px"}} 
  >
    <div className="relative h-48 mb-5">
      <div className="absolute inset-0 flex justify-center items-center">
        <Image src={imageSrc} alt={catName} layout="fill" className="rounded-lg" />
      </div>
    </div>

    <h2 className={`mb-3 text-2xl font-semibold`}>
      {catName}{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
      {description}
    </p>
  </a>
);


export default function Home() {
  const [searchInput, setSearchInput] = useState(''); 
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  const [data, setData] = useState([]);

  // const getAnimalDetails = (token, tokenHash, animalId) => {
  //   console.log("test");
  //   const req = {
  //     token: token,
  //     tokenHash: tokenHash,
  //     objectType: "animals",
  //     objectAction: "view",
  //     values: [{ "animalID": animalId }],
  //     fields: ["animalID", "animalName", "animalBreed", "animalHighlightOrder"],
  //   }
  //   fetch("https://api.rescuegroups.org/http/v2.json", {
  //     method: "Post",
  //     body: JSON.stringify(req)
  //   }).then(response => response.json(response)).then((result) => { console.log(result) })
  // }
  const getData = ({ token, tokenHash }) => {
    const req = {
      token: token,
      tokenHash: tokenHash,
      objectType: "animals",
      objectAction: "search",
      search: {
        resultStart: "0",
        resultLimit: "30",
        resultSort: "animalCreatedDate",
        resultOrder: "asc",
        filters: [
          {
            fieldName: "animalStatus",
            operation: "equals",
            criteria: "Available"
          },
          {
            fieldName: "animalSpecies",
            operation: "equals",
            criteria: "Cat"
          }
        ],
        filterProcessing: "1 AND 2",
        fields: ["animalID",
          "animalName",
          "animalSpecies",
          "animalSex",
          "animalStatus",
          "animalBreed",
          "animalColor",
          "animalAltered",
          "animalBirthdate",
          "animalPictures",
          "animalRescueID",
          "descriptionText"],
      },
    }
    fetch("https://api.rescuegroups.org/http/v2.json", {
      method: "Post",
      body: JSON.stringify(req)
    }).then(response => response.json()).then((result) => { setData(result.data) })
  }

  useEffect(() => {
    const auth_req = {
      action: "login",
      username: "ann",
      password: "r0cket",
      accountNumber: 8960,
    }
    fetch("https://api.rescuegroups.org/http/v2.json", {
      method: "Post",
      body: JSON.stringify(auth_req)
    }).then(response => response.json()).then((result) => { getData(result.data) })
  }, [])

  const cards = [
    { catName: 'Cat 1', description: 'Description 1', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
    { catName: 'Cat 2', description: 'Description 2', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
    { catName: 'Cat 3', description: 'Description 3', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
    { catName: 'Cat 4', description: 'Description 4', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
    { catName: 'Cat 5', description: 'Description 5', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
  ];
  const filteredCards = cards.filter(card => card.catName.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <main className="flex-1">
      <nav className="bg-white border-gray-200">
      </nav>
      <input
        type="text"
        placeholder="Search Cat..."
        value={searchInput}
        onChange={handleSearchChange}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 mb-4" 
        style={{ width: "500px",  marginTop: "30px", marginLeft: "60px" }}
      />
      <div className="flex flex-wrap" style={{ marginLeft: "50px" }}>
        {filteredCards.map( card => (<Card
          key={card.catName}
          catName={card.catName}
          description={card.description}
          link={card.link}
          imageSrc={card.imageSrc}
          />))}
        </div>
      <footer className="fixed bottom-0 left-0 w-full p-8 bg-white">
        <p> Made with ❤️ at Hack for Impact.</p>
      </footer>
    </main>
  );
}
