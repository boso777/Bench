'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ModalFormCreate from './ModalFormCreate'

export default function ModalButton() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Bottone di apertura */}
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-950/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >

                <FontAwesomeIcon icon={faPlus} /> <span>Aggiungi progetto</span>
            </button>

            {/* Modale */}
            {isOpen && (
                <ModalFormCreate setIsOpen={setIsOpen}></ModalFormCreate>

            )}
        </>
    )
}