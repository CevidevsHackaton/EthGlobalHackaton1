import React, { useContext, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
// components

import Footer from "../components/Footers/Footer";

import banner2 from "@/assets/img/banner-2-800x800.jpg"
import { LayoutContext } from "@/layouts/PrincipalLayout";
import { FaDribbble, FaFacebookF, FaGithub, FaGoogle, FaInstagram, FaTwitch, FaTwitter } from "react-icons/fa";
import { BiWallet } from "react-icons/bi"
import { BsCalendarDate, BsPersonFill } from "react-icons/bs"
import { ImEye } from "react-icons/im";
import { GoShield } from "react-icons/go"
import { HiBadgeCheck } from "react-icons/hi"
import { SlTrophy } from "react-icons/sl"
import { MdOutlineHandshake } from "react-icons/md";


export default function Landing() {
  const { setTransparent } = useContext(LayoutContext)
  useEffect(() => {
    setTransparent(true)
  }, [])
  return (
    <>
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover bg-cover bg-top"
            style={{
              backgroundImage:
                `url(${banner2.src})`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Rafflepay
                  </h1>
                  <p className="mt-4 text-lg text-white">
                    {require("@/assets/img/banner-2-800x800.jpg").src}
                    Create raffles with exclusive prizes for your community
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <BiWallet />
                    </div>
                    <h6 className="text-xl font-semibold">First</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      You will need to connect your wallet and create a raffle, specifying the participants, the date of the draw, and the prize on offer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <BsCalendarDate />
                    </div>
                    <h6 className="text-xl font-semibold">Next</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      When the draw date arrives, the raffle will take place, and a notification will be sent to the winner.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <SlTrophy />
                    </div>
                    <h6 className="text-xl font-semibold">Finally</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      The winner can claim their prize by providing your address token, where they will sign to accept it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <MdOutlineHandshake className="text-2xl" />
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  About us
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  We are a dapp for conducting sweepstakes. You can create sweepstakes for your followers or clients and segment your audience by subscription memberships.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Rufflepay enables you to precisely segment your audience based on their membership level, and conduct raffles accordingly.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <Image
                    alt="..."
                    src={require("@/assets/img/banner-1-800x800.jpg").default}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      The fun never ends
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      Make your community grow and have fun with your weekly raffles!
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <Image
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg bg-cover"
                  src={require("@/assets/img/banner-4-800x800.jpg").default}
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <HiBadgeCheck className="text-4xl" />
                  </div>
                  <h3 className="text-3xl font-semibold">Benefits of having a premium account</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Make your community grow even more with these benefits:
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Segment your community
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Earn income from your community memberships
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Generate a greater impact with your raffles
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Meet our team</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  We are dedicated to making your experience as optimal as possible.
                </p>
              </div>
            </div>
            <div className="grid grid-flow-col">
              <div className="w-full mb-12 px-4">
                <div className="px-6">
                  <Image
                    alt="..."
                    src={require("@/assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Rafael Livise</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Web Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaTwitter />
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaFacebookF />
                      </button>
                      <button
                        className="bg-pink-500 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaDribbble />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-12 px-4">
                <div className="px-6">
                  <Image
                    alt="..."
                    src={require("@/assets/img/team-5-800x800.jpg").default}
                    width={200}
                    height={200}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Danny G</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Smart Contract Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaTwitter />
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaFacebookF />
                      </button>
                      <button
                        className="bg-orange-800 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaGithub />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-12 px-4">
                <div className="px-6">
                  <Image
                    alt="..."
                    src={require("@/assets/img/team-2-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Roberto</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Marketing Specialist
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaGoogle />
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaFacebookF />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-12 px-4">
                <div className="px-6">
                  <Image
                    alt="..."
                    src={require("@/assets/img/team-3-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Yisus</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      UI/UX Designer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaGoogle />
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaTwitter />
                      </button>
                      <button
                        className="bg-blueGray-700 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaInstagram />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-12 px-4">
                <div className="px-6">
                  <Image
                    alt="..."
                    width={200}
                    height={200}
                    src={require("@/assets/img/team-4-470x470.png").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Sebastian</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Founder and CEO
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-pink-500 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaDribbble />
                      </button>
                      <button
                        className="bg-red-600 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaGoogle />
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaTwitter />
                      </button>
                      <button
                        className="bg-blueGray-700 text-white p-2 w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <FaInstagram />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Our pillars
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  Rufflepay is built on 3 important foundations
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <BsPersonFill />
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Accessibility
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  You just need to connect your wallet to start creating raffles
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <ImEye />
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Transparency
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Each raffle is transparent through the use of Chainlink
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <GoShield />
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Security
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  The result of each raffle is verifiable thanks to the Gnosis chain
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Communicate with our support team
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Fill in this form and we will contact you in less than 1 hour.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        First name or Alias
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows={4}
                        cols={80}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
