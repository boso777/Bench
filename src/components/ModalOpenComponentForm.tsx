'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateComponentForm from "./CreateComponentForm";

export default function ModalOpenComponentForm() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
      >
        <FontAwesomeIcon icon={faPlus} className="text-xs" />
        <span>Nuovo Componente</span>
      </button>

      {/* Mostra il form solo se isOpen è true */}
      {isOpen && <CreateComponentForm onClose={toggleModal} />}
    </>
  );
}

