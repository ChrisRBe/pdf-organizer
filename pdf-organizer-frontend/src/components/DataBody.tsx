"use client";

import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { PdfMetadata, SortOrder } from "@/types/types";

export default function DataBody({ sortData }: { sortData: SortOrder }) {
    const [pdfData, setPdfData] = useState([]);
    const [visibility, setVisibility] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        useFetch().then((data) => setPdfData(data));
    }, []);

    const sortedData = [...pdfData].sort((a: PdfMetadata, b: PdfMetadata) => {
        const valueA = a[sortData.col as keyof PdfMetadata];
        const valueB = b[sortData.col as keyof PdfMetadata];

        if (typeof valueA === "string" && typeof valueB === "string") {
            return sortData.order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
            return sortData.order === "asc" ? valueA - valueB : valueB - valueA;
        }

        return 0;
    });

    function handleVisibility(id: number) {
        setVisibility((prev) => ({ ...prev, [id]: !prev[id] ?? false }));
    }

    return (
        <>
            {sortedData.map((data: PdfMetadata, index: number) => (
                <div key={data.id} className="basis-full" onClick={() => handleVisibility(data.id)}>
                    <div className={`${index % 2 === 0 ? "bg-stone-200" : "bg-stone-500"} flex  py-2 px-4 cursor-pointer`}>
                        <div className="basis-6/12 justify-items-center">{data.title}</div>
                        <div className="basis-1/12 justify-items-center">{data.author}</div>
                        <div className="basis-1/12 justify-items-center">{data.created}</div>
                        <div className="basis-1/12 justify-items-center"> {data.filesize}</div>
                        <div className="basis-1/12 justify-items-center">{data.has_metadata ? "Yes" : "No"}</div>
                        <div className="basis-1/12 justify-items-center">{data.has_file_problems ? "Yes" : "No"}</div>
                    </div>
                    <div className={`${index % 2 === 0 ? "bg-stone-200" : "bg-stone-500"} ${visibility[data.id] ? "" : "hidden"}`}>
                        <div className="flex py-2 px-4 ">
                            <div className="basis6-12 justify-items-center">{data.filename}</div>
                            <div className="basis6-12 justify-items-center">{data.creator}</div>
                        </div>
                        <div className="flex py-2 px-4 ">
                            <div className="basis6-12 justify-items-center">{data.producer}</div>
                            <div className="basis6-12 justify-items-center">{data.modified}</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
