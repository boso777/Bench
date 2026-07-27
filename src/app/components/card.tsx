import Link from "next/link";
import Image from "next/image";

export default function Card({ title, description, id, }: {
    id: string,
    title: string,
    description: string,
}) {

    return (<>
        <div className="border border-gray-200 rounded-lg p-4">
            <div>
            </div>
            <h2>{title}</h2>
            <div className="flex flex-col gap-2 mt-2">
                <p>{description}</p>
                <Link href={`/projects/${id}`}>View project</Link>
            </div>
        </div>

    </>)
}