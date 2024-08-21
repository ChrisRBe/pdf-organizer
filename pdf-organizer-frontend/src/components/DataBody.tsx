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
            {sortedData.map((data: PdfMetadata) => (
                <div key={data.id} className="basis-full bg-indigo-400" onClick={() => handleVisibility(data.id)}>
                    <div className="bg-slate-500 flex  py-2 px-4">
                        <div className="basis-6/12 justify-items-center">Title: {data.title}</div>
                        <div className="basis-1/12 justify-items-center">Author: {data.author}</div>
                        <div className="basis-1/12 justify-items-center">created: {data.created}</div>
                        <div className="basis-1/12 justify-items-center">size: {data.filesize}</div>
                        <div className="basis-1/12 justify-items-center">
                            metadata: {data.has_metadata ? "Yes" : "No"}
                        </div>
                        <div className="basis-1/12 justify-items-center">
                            problems: {data.has_file_problems ? "Yes" : "No"}
                        </div>
                    </div>
                    <div className={`bg-stone-30 ${visibility[data.id] ? "" : "hidden"}`}>
                        <div className="flex py-2 px-4 ">
                            <div className="basis6-12 justify-items-center">filename: {data.filename}</div>
                            <div className="basis6-12 justify-items-center">creator: {data.creator}</div>
                        </div>
                        <div className="flex py-2 px-4 ">
                            <div className="basis6-12 justify-items-center">producer: {data.producer}</div>
                            <div className="basis6-12 justify-items-center">last modified: {data.modified}</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
