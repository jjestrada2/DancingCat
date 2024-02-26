"use client";
import Image from "next/image";
// import { useClient } from 'next/data-client';
import React, { useState, useEffect } from 'react';

const Card = ({ catName, sex, link, imageSrc }) => (
  <a
    href={link}
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 block mb-4"
    target="_blank"
    rel="noopener noreferrer"
    style={{ width: "300px", height: "350px", padding: "40px" }}
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
      {/* {description} */}
      {sex}
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
    }).then(response => response.json()).then((result) => { setData(Object.values(result.data)) })
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

  // const cards = [
  //   { catName: 'Cat 1', description: 'Description 1', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
  //   { catName: 'Cat 2', description: 'Description 2', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
  //   { catName: 'Cat 3', description: 'Description 3', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
  //   { catName: 'Cat 4', description: 'Description 4', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
  //   { catName: 'Cat 5', description: 'Description 5', link: '/catProfile', imageSrc: "/cat_img.jpeg" },
  // ];
  // const filteredCards = cards.filter(card => card.catName.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <main className="flex-1">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse p-4">
            <img src="https://images.squarespace-cdn.com/content/v1/57c4aca420099e3efb1bdafd/1478708079354-7RWYM0JCXFRN5X6BNL1R/DCLogoDarkTeal.png?format=1500w" className="h-10" alt="Flowbite Logo" />
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 px-3 text-white bg-teal-400 rounded md:bg-transparent md:text-teal-400 md:p-0 dark:text-white md:dark:text-teal-500" aria-current="page">Home</a>
              </li>
              <li>
                <a href="/cats" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-400 md:p-0 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Our Cats</a>
              </li>
              <li>
                <a href="/recommend" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-400 md:p-0 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Recommend</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <input
        type="text"
        placeholder="Search Cat..."
        value={searchInput}
        onChange={handleSearchChange}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 mb-4"
        style={{ width: "500px", marginTop: "30px", marginLeft: "60px" }}
      />
      <div className="flex flex-wrap" style={{ marginLeft: "50px" }}>
        {data.map(card => {
          console.log(card.animalPictures[0]?.urlInsecureFullsize)
          return (card.animalPictures.length > 0 ? (<Card
            key={card.animalName}
            catName={card.animalName}
            sex={card.animalSex}
            link={"/catProfile?catId=" + card.animalID}
            imageSrc={card.animalPictures[0].urlInsecureFullsize}
          />) : (<Card
            key={card.animalName}
            catName={card.animalName}
            sex={card.animalSex}
            link={"/catProfile?catId=" + card.animalID}
            imageSrc={card.animalPictures}
          />))
        })}
      </div>
      <footer className="fixed bottom-0 left-0 w-full p-8 bg-white">
        <p> Made with ❤️ at Hack for Impact.</p>
      </footer>
    </main>
  );
}
