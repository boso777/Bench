'use client';

import { useState } from "react";
import CreateComponentForm from "./CreateComponentForm";

export default function ModalOpenComponentForm() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={toggleModal}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg p-2 transition-colors"
            >
                Nuovo Componente
            </button>

            {/* Mostra il form solo se isOpen è true */}
            {isOpen && <CreateComponentForm onClose={toggleModal} />}
        </>
    );
}
