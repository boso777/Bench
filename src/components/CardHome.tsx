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
    <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-sm p-6 flex items-center justify-between hover:border-slate-600/50 transition-all duration-300">
      <div>
        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-3xl font-bold mt-2 text-white">{totalProjects}</h3>
      </div>
      <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center border border-blue-500/20">
        <FontAwesomeIcon icon={icon} className="text-blue-400 text-xl" />
      </div>
    </div>
  );
}
