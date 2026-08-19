import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CardHome({
  title,
  totalProjects,
  icon,
}: {
  title: string;
  totalProjects: number;
  icon: IconDefinition;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between hover:border-slate-700 transition-all duration-300 shadow-sm">

      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-3xl font-extrabold mt-2 text-white tracking-tight">{totalProjects}</h3>
      </div>
      <div className="w-12 h-12 bg-blue-950/50 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400 shadow-sm">
        <FontAwesomeIcon icon={icon} className="text-xl" />
      </div>
    </div>
  );
}

