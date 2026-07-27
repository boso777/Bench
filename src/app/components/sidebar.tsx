import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrochip, faPlug, faFolderTree, faHouse } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function Sidebar({ }) {
    return (<>

        <div className="w-[15vw] h-[100vh] bg-gray-500 ">
            <div className="flex justify-center items-center mt-5 gap-2">
                <p className="font-bold text-2xl text-blue-200 ">Bench</p>
                <FontAwesomeIcon icon={faMicrochip} className="text-blue-200 text-xl" />
            </div>
            <div className="flex flex-col justify-center align-middle gap-4 mt-10">

                <Link href="/" className="flex justify-center text-center hover:text-blue-200 hover:scale-110 transition-all duration-200 bg-blue-950 rounded-md py-2 px-5 mx-6 ">
                    <p>Home</p>
                    <FontAwesomeIcon icon={faHouse} className="text-blue-200 text-xl text-center ml-2" />
                </Link>

                <Link href="/projects" className="flex justify-center text-center hover:text-blue-200 hover:scale-110 transition-all duration-200 bg-blue-950 rounded-md py-2 px-5 mx-6 ">
                    <p>Projects</p>
                    <FontAwesomeIcon icon={faFolderTree} className="text-blue-200 text-xl text-center ml-2" />
                </Link>

                <Link href="/Comp" className="flex justify-center text-center hover:text-blue-200 hover:scale-110 transition-all duration-200 bg-blue-950 rounded-md py-2 px-5 mx-6">
                    <p>Components</p>
                    <FontAwesomeIcon icon={faPlug} className="text-blue-200 text-xl text-center ml-2" />
                </Link>

            </div>

        </div>

    </>)
}