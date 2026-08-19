import { faArrowRight, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string;
  title: string;
  description: string;
  img?: string;
}

export default function ProjectCard({ id, title, description, img }: CardProps) {
  return (
    <div className="w-full group bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between h-full">

      <div>
        {img ? (
          <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative bg-slate-950 border border-slate-800/60">
            <Image
              src={img}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="w-full h-40 rounded-xl mb-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/60 flex flex-col items-center justify-center text-slate-600 gap-2">
            <FontAwesomeIcon
              icon={faFolder}
              className="text-3xl text-slate-700 group-hover:text-blue-400 transition-colors duration-300"
            />
            <span className="text-[10px] font-mono text-slate-600 tracking-wider">
              NO IMAGE
            </span>
          </div>
        )}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mt-2 line-clamp-2 font-light leading-relaxed">
          {description || "Nessuna descrizione fornita."}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex justify-between items-center">
        <span className="text-xs font-mono text-slate-500 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
          ID: {id}
        </span>
        <Link
          href={`/projects/${id}`}
          className="text-blue-400 hover:text-blue-300 text-xs font-semibold flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-blue-500/10 transition-colors"
        >
          <span>Apri</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}