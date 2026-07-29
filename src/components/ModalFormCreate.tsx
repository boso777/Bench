import { useEffect, useState } from "react"


export default function ModalFormCreate({ setIsOpen }: { setIsOpen: (open: boolean) => void }) {



















    return (<>

        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">

                <h2 className="text-xl font-bold text-slate-100 mb-4">Nuovo Progetto</h2>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

                    <div>

                        {/* titolo progetto */}

                        <label className="block text-sm font-medium text-slate-400 mb-1">Nome Progetto</label>
                        <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                            placeholder="Es. Bench Power Supply V1"
                        />
                    </div>

                    <div>

                        {/* descrizione progetto */}


                        <label className="block text-sm font-medium text-slate-400 mb-1">Descrizione del Progetto</label>
                        <textarea
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                            placeholder="Descrizione del progetto..."
                            rows={4}
                        />
                    </div>

                    <div>

                        {/* stato progetto */}

                        <label className="block text-sm font-medium text-slate-400 mb-1">Stato Progetto</label>
                        <select
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500">
                            <option value="Not Started">Non iniziato</option>
                            <option value="In Progress">In corso</option>
                            <option value="Completed">Completato</option>
                        </select>
                    </div>

                    <div>

                        {/* immagine di copertina */}

                        <label className="block text-sm font-medium text-slate-400 mb-1">Immagine di copertina</label>
                        <input
                            type="file"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                    </div>


                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-sm font-medium"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
                        >
                            Salva
                        </button>
                    </div>
                </form>
            </div>
        </div>


    </>)
}