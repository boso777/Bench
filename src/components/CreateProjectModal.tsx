'use client'

import { useState, createContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const CreateProjectModalContext = createContext<{
    setIsOpen: (isOpen: boolean) => void
}>({
    setIsOpen: () => {}
})

export default function CreateProjectModal({ children }: { children: React.ReactNode }) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <CreateProjectModalContext.Provider value={{ setIsOpen }}>
            {/* Bottone di apertura */}
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-sm shadow-lg shadow-indigo-950/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >

                <FontAwesomeIcon icon={faPlus} /> <span>Aggiungi progetto</span>
            </button>

            {/* Modale */}
            {isOpen && children}
        </CreateProjectModalContext.Provider>
    )
}