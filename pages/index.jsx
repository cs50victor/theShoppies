import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import "twin.macro";
import { Transition } from "@headlessui/react";
import { Header } from "@components/index";
import Award from "@public/award.svg";
import Flickity from "react-flickity-component";
import "flickity/dist/flickity.min.css";

export default function Home() {
  const [searchValue, setSearchValue] = useState();
  const [movieResults, setMovieResults] = useState([]);
  const [userNominations, setUserNominations] = useState([]);
  const [complete, setComplete] = useState(false);

  const keepSearching = async (e) => {
    e.preventDefault();

    const movieName = e.target.value.trim() || " ";
    const response = await fetch(
      `https://www.omdbapi.com/?s=${movieName}&type=Movie&apikey=4f54c152`
    ).then((r) => r.json());
    setMovieResults(response);
  };

  const addNomination = async (e) => {
    e.preventDefault();
    if (userNominations.length == 4) {
      setComplete(true);
      alert(
        "5/5 Movies Nominated. Great Job :) . Remember to submit your nominations."
      );
    }
    setUserNominations((userNominations) =>
      userNominations.concat(e.target.value)
    );
    localStorage.setItem("nominations", JSON.stringify(userNominations));
  };

  const removeNomination = (e) => {
    e.preventDefault();
    const currentNominations = [...userNominations];
    const movieIndex = currentNominations.indexOf(e.target.value);

    if (movieIndex != -1) {
      currentNominations.splice(movieIndex, 1);
      setUserNominations(currentNominations);
      localStorage.setItem("nominations", JSON.stringify(currentNominations));
    }
    if (complete == true) {
      setComplete(false);
    }
  };

  const fallBackImage =
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80";

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("nominations"));
    if (savedMovies) {
      setUserNominations(savedMovies);
      if (userNominations.length == 5) {
        setComplete(true);
        alert(
        "5/5 Movies Nominated. Great Job :) . Remember to submit your nominations."
        );
      }
    }
  }, []);

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="shortcut icon"
          type="image/png"
          href="https://cdn.shopify.com/shopify-marketing_assets/static/shopify-favicon.png"
        />
        <meta
          name="description"
          content="The Shopify identity is more than a logo. It’s the way we communicate. It’s our language."
        />
        <title>The Shoppies</title>
      </Head>
      <div tw="max-w-screen-xl mx-auto px-5">
        <Header>
          <img
            tw="h-8 w-auto sm:h-10"
            src="https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-shopping-bag-full-color-66166b2e55d67988b56b4bd28b63c271e2b9713358cb723070a92bde17ad7d63.svg"
          />
          <span>THE SHOPPIES AWARD</span>
        </Header>
        <main tw="mt-10 mx-auto flex flex-col items-center justify-center">
          <div tw="w-full max-w-screen-lg flex flex-col border-b-2 border-opacity-25 pb-3">
            <h2 tw="mt-10 text-3xl font-semibold">Your Nominations</h2>
            <p tw="italic text-base font-light text-gray-400">
              {" "}
              {userNominations ? userNominations.length : 0}/5 Nominations
            </p>
          </div>
          <div
            style={{ minHeight: "240px" }}
            tw="flex max-w-screen-lg w-full flex-wrap  items-center justify-center space-x-2 mb-14 mt-5"
          >
            {userNominations &&
              userNominations.map((name, index) => (
                <div
                  key={index}
                  style={{ minHeight: "240px" }}
                  tw="flex flex-col items-center justify-center w-48
                   bg-gradient-to-b from-white to-green-200
                   text-black font-semibold rounded-lg p-3 my-2 text-center"
                >
                  <Award width={50} height={40} />
                  <p tw="mt-2">{name}</p>
                  <button
                    value={name}
                    onClick={removeNomination}
                    tw="text-gray-200 py-1 px-3 bg-red-700 font-semibold mt-5 rounded-full shadow-md hover:(bg-red-900) focus:(outline-none)"
                  >
                    Remove
                  </button>
                </div>
              ))}
            {userNominations.length == 0 && (
              <div
                style={{ height: "240px" }}
                tw="flex flex-col items-center justify-center w-48 bg-white text-black font-semibold rounded-lg p-3 my-2 text-center"
              >
                <p tw="mt-2">Empty</p>
              </div>
            )}
          </div>
          {complete && (
            <button tw="bg-green-800 px-2 mb-16 py-1 rounded font-semibold">
              Submit
            </button>
          )}
          <span tw="italic text-lg text-gray-400">
            Search for a movie to nominate
          </span>
          <input
            tw="bg-white text-gray-700 
            appearance-none inline-block 
            w-5/6 md:w-1/2 border-2 border-gray-800
            rounded py-3 px-4 focus:outline-none "
            value={searchValue}
            onChange={keepSearching}
            placeholder="Search for a movie to nominate"
            type="search"
            maxLength="64"
            autocomplete="on"
            autoFocus
          />
          <p tw="text-left w-full max-w-screen-lg mx-auto text-3xl mt-10 font-bold">
            Search Results
          </p>
          <div
            style={{ minHeight: "500px" }}
            tw="relative max-w-screen-lg w-full my-5 p-3 mx-auto overflow-x-hidden border-t-2 border-opacity-25"
          >
            <Flickity options={{ pageDots: false, contain: true }}>
              {movieResults.Response == "True" ? (
                Object.values(movieResults.Search).map((movie, index) => (
                  <div
                    key={index}
                    tw="flex flex-col items-start justify-between h-auto w-60 pr-5"
                  >
                    <img
                      onError={(e) => {
                        e.target.src = fallBackImage;
                      }}
                      alt="moviePoster"
                      layout="responsive"
                      src={movie.Poster != "N/A" ? movie.Poster : fallBackImage}
                      tw="object-cover w-52 h-72 mt-5 align-middle"
                    />
                    <div tw="my-5">
                      <p tw="text-lg font-semibold leading-tight">
                        {movie.Title}
                      </p>
                      <p tw="italic text-gray-400 text-base font-light my-2">
                        {movie.Year}
                      </p>
                      {!complete && (
                        <>
                          {userNominations.includes(
                            `${movie.Title} (${movie.Year})`
                          ) ? (
                            <button
                              tw="disabled:(bg-green-100 py-1 px-4 rounded text-gray-600 cursor-not-allowed)"
                              disabled
                            >
                              Nominated
                            </button>
                          ) : (
                            <button
                              value={`${movie.Title} (${movie.Year})`}
                              onClick={addNomination}
                              tw="text-gray-200 py-1 px-4 bg-green-700 font-semibold rounded shadow-md hover:(bg-green-900) focus:(outline-none)"
                            >
                              Nominate
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div tw="w-80 h-80 flex flex-col items-center justify-center text-gray-400">
                  <p tw="text-xl font-semibold">
                    {movieResults.Error || "Search for movies to nominate"}
                  </p>
                </div>
              )}
            </Flickity>
          </div>
        </main>
        <footer tw="mt-20 mb-10 text-gray-400 flex flex-col w-3/4 items-center justify-center mx-auto">
          <p>{new Date().getFullYear()}</p>
          <p>&#169; The Shoppies {":)"} </p>
        </footer>
      </div>
    </>
  );
}
