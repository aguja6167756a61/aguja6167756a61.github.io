import { useState, useEffect } from "react";
import { getFechas } from "../sanity/sanity-utils";
import type { Fecha } from "../types/Fecha";

export default function Fechas() {
  const [fechas, setFechas] = useState<Fecha[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    getFechas()
      .then((data) => setFechas(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const futureShows = fechas
    ?.filter((agujaDate) => {
      const date = new Date(agujaDate.date).toISOString().split("T")[0];
      const today = new Date().toISOString().split("T")[0];
      return today <= date;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastShows = fechas?.filter((agujaDate) => {
    const date = new Date(agujaDate.date).toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return today > date;
  });

  if (loading) return <div> ... </div>;

  return (
    <div className="text-sm md:text-2xl">
      {/* <h1 className="my-1 text-base font-bold">futuro:</h1> */}
      <ul>
        {!futureShows ? (
          <li className="text-gray-500 dark:text-gray-400">???</li>
        ) : (
          futureShows.map((agujaDate) => (
            <DateListItem key={agujaDate._id} fecha={agujaDate} />
          ))
        )}
      </ul>
      {/* <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm">
        {isExpanded ? "---" : "+++"}
      </button> */}
      {isExpanded && pastShows && (
        <>
          {/* <h1 className="my-1 text-base font-bold">pasado:</h1> */}
          <ul className="over text-sm">
            {pastShows.map((agujaDate) => {
              return <DateListItem key={agujaDate._id} fecha={agujaDate} />;
            })}
          </ul>
        </>
      )}
    </div>
  );
}

function DateListItem({ fecha }: { fecha: Fecha }) {
  return (
    <li className="mb-4 flex flex-col gap-1 text-base sm:items-center md:mb-0 md:flex-row">
      <div>{new Date(fecha.date).toLocaleDateString("es-ES")}</div>
      {fecha.name && <div className="font-serif italic">{fecha.name}</div>}
      {fecha.place && <div className="">@{fecha.place}</div>}
      {fecha.link && (
        <a
          href={fecha.link}
          target="_blank"
          className="mt-1 ml-1 bg-white text-black hover:invert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </a>
      )}
    </li>
  );
}
