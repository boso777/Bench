"use client";

import {
  faBars,
  faFolderTree,
  faHouse,
  faMicrochip,
  faPlug,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden w-full h-16 fixed top-0 left-0 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-2">
          <p className="font-bold text-2xl text-blue-200">Bench</p>
          <FontAwesomeIcon
            icon={faMicrochip}
            className="text-blue-200 text-xl"
          />
        </div>
        <button
          type="button"
          onClick={toggleMenu}
          className="text-blue-200 hover:text-white p-2 text-xl focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Mobile Overlay Menu / Modal */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-950/95 z-50 flex flex-col p-6 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl text-blue-200">Bench</p>
              <FontAwesomeIcon
                icon={faMicrochip}
                className="text-blue-200 text-xl"
              />
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="text-blue-200 hover:text-white p-2 text-2xl focus:outline-none transition-colors"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="flex flex-col gap-6 mt-8">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex justify-center items-center text-center hover:text-blue-200 hover:scale-105 transition-all duration-200 bg-blue-950 rounded-xl py-4 px-6 text-lg text-slate-200 border border-slate-800"
            >
              <p>Home</p>
              <FontAwesomeIcon
                icon={faHouse}
                className="text-blue-200 text-xl ml-3"
              />
            </Link>

            <Link
              href="/projects"
              onClick={closeMenu}
              className="flex justify-center items-center text-center hover:text-blue-200 hover:scale-105 transition-all duration-200 bg-blue-950 rounded-xl py-4 px-6 text-lg text-slate-200 border border-slate-800"
            >
              <p>Projects</p>
              <FontAwesomeIcon
                icon={faFolderTree}
                className="text-blue-200 text-xl ml-3"
              />
            </Link>

            <Link
              href="/comp"
              onClick={closeMenu}
              className="flex justify-center items-center text-center hover:text-blue-200 hover:scale-105 transition-all duration-200 bg-blue-950 rounded-xl py-4 px-6 text-lg text-slate-200 border border-slate-800"
            >
              <p>Components</p>
              <FontAwesomeIcon
                icon={faPlug}
                className="text-blue-200 text-xl ml-3"
              />
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-screen fixed left-0 top-0 bg-slate-900 border-r border-slate-800 flex-col items-center justify-start py-6 z-40">
        <div className="flex justify-center items-center mb-8 gap-2">
          <p className="font-bold text-2xl text-blue-200">Bench</p>
          <FontAwesomeIcon
            icon={faMicrochip}
            className="text-blue-200 text-xl"
          />
        </div>

        <div className="flex flex-col gap-4 w-full px-4">
          <Link
            href="/"
            className="flex justify-center items-center text-center hover:text-blue-200 hover:scale-110 transition-all duration-200 bg-blue-950 rounded-md py-2 px-5 mx-6 text-base text-slate-200"
          >
            <p>Home</p>
            <FontAwesomeIcon
              icon={faHouse}
              className="text-blue-200 text-xl ml-2"
            />
          </Link>

          <Link
            href="/projects"
            className="flex justify-center items-center text-center hover:text-blue-200 hover:scale-110 transition-all duration-200 bg-blue-950 rounded-md py-2 px-5 mx-6 text-base text-slate-200"
          >
            <p>Projects</p>
            <FontAwesomeIcon
              icon={faFolderTree}
              className="text-blue-200 text-xl ml-2"
            />
          </Link>

          <Link
            href="/comp"
            className="flex justify-center items-center text-center hover:text-blue-200 hover:scale-110 transition-all duration-200 bg-blue-950 rounded-md py-2 px-5 mx-6 text-base text-slate-200"
          >
            <p>Components</p>
            <FontAwesomeIcon
              icon={faPlug}
              className="text-blue-200 text-xl ml-2"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
