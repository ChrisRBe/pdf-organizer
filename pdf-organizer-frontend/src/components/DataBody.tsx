"use client";

import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { PdfMetadata } from "@/types/types";

export default function DataBody() {
    const [pdfData, setPdfData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    // Runs first time on page load and then every time the pdfData state changes
    useEffect(() => {
        useFetch().then((data) => setPdfData(data));
    }, [pdfData]);

    function handleVisible() {
        setIsVisible((prev) => !prev)
    }

    // TODO: Add Striping
    return (
        <>
            <div className="p-2 bg-indigo-400 cursor-pointer" onClick={handleVisible}>first</div>
            <div className={`p-2 bg-stone-500 ${isVisible ? "" : "hidden"}`}>second</div>
            {/* {pdfData.map((data: PdfMetadata) => (
                <>
                    <div key={data.id} className="flex bg-indigo-400">
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
                        <div className="flex bg-stone-300">Additional Information</div>
                    </div>
                </>
            ))} */}
        </>
    );
}
