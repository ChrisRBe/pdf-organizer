"use client";

import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { PdfMetadata } from "@/types/types";

export default function DataBody() {
    const [pdfData, setPdfData] = useState([]);
    const [visibility, setVisibility] = useState<{ [key: number]: boolean }>({});

    // Runs first time on page load and then every time the pdfData state changes
    useEffect(() => {
        useFetch().then((data) => setPdfData(data));
    }, []);

    function handleVisibility(id: number) {
        setVisibility((prev) => ({ ...prev, [id]: !prev[id] ?? false }));
    }    
    
    // TODO: Add Stripingexport default function DataBody() {
    return (
        <>
            {pdfData.map((data: PdfMetadata) => (
                    <div key={data.id} className="basis-full bg-indigo-400" onClick={() => handleVisibility(data.id)}>
                        <div className="bg-slate-500 grid grid-cols-9 gap-x-4 py-2 px-4">
                            <div>{data.title}</div>
                            <div>{data.author}</div>
                            <div>{data.creator}</div>
                            <div>{data.producer}</div>
                            <div>{data.created}</div>
                            <div>{data.modified}</div>
                            <div>{data.filename}</div>
                            <div>{data.filesize}</div>
                            <div>{data.has_metadata ? "Yes" : "No"}</div>
                            <div>{data.has_file_problems ? "Yes" : "No"}</div>
                        </div>
                        <div className={`bg-stone-30 ${visibility[data.id] ? "" : "hidden"}`}>Additional Information</div>
                    </div>
            ))}
        </>
    );
}
