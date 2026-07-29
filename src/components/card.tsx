import { faArrowRight, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string;
  title: string;
  description: string;
  img?: string;
}

export default function Card({ id, title, description, img }: CardProps) {
  return (
    <div className="w-full max-w-md mx-auto group bg-slate-850/40 border border-slate-800 rounded-lg p-5 hover:border-slate-600/50 hover:bg-slate-800/30 transition-all duration-300 flex flex-col justify-between">
      <div>
        {img ? (
          <div className="w-full h-36 rounded-xl overflow-hidden mb-4 relative bg-slate-900 border border-slate-800">
            <Image
              src={img}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-36 rounded-xl mb-4 bg-slate-900/30 border border-slate-800 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faMicrochip}
              className="text-slate-700 text-4xl"
            />
          </div>
        )}
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mt-2 line-clamp-2 font-light">
          {description || "Nessuna descrizione fornita."}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/80 flex justify-between items-center">
        <span className="text-xs text-slate-500">ID: {id}</span>
        <Link
          href={`/projects/${id}`}
          className="text-blue-400 hover:text-blue-300 text-xs font-semibold flex items-center gap-1"
        >
          <span>Apri</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
        </Link>
      </div>
    </div>
  );
}