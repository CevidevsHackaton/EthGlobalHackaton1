/*eslint-disable*/
import React from "react";
import Link from 'next/link';

// components
import IndexDropdown from "../Dropdowns/IndexDropdown";
import { FaFileAlt, FaTwitter, FaGithub, FaHamburger } from "react-icons/fa"
import ButtonConnect from "../Blockchain/Button/ButtonConnect";
import PagesUserDropdowns from "../Blockchain/Dropdowns/PagesUserDropdowns";

export default function Navbar({ transparent = false }: { transparent?: Boolean }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className={`${transparent ? 'bg-transparent' : 'bg-blueGray-800'} top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg shadow`}>
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              EthGlobal
            </Link>
            <button
              className="cursor-pointer text-xl text-white leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaHamburger />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-blueGray-800 lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Link
                  className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href=""
                >
                  <i className="text-white text-lg leading-lg mr-2"><FaFileAlt /></i>{" "}
                  Docs
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <IndexDropdown />
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/cevidevs"
                  target="_blank"
                >
                  <i className="text-white text-lg leading-lg " ><FaTwitter /></i>
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <Link
                  className="hover:text-white text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/CevidevsHackaton/EthGlobalHackaton1"
                  target="_blank"
                >
                  <i className="text-white text-lg leading-lg "><FaGithub /></i>
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </Link>
              </li>
              <li className="flex items-center">
                <ButtonConnect >
                  <PagesUserDropdowns />
                </ButtonConnect>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}