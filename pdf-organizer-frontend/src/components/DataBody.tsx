"use client";

import { useState, useEffect, useRef } from "react";
import { useFetch } from "./useFetch";
import { PdfMetadata, SortOrder } from "@/types/types";
import Button from "./Button";

export default function DataBody({ sortData }: { sortData: SortOrder }) {
    const [pdfData, setPdfData] = useState<PdfMetadata[]>([]);
    const [visibility, setVisibility] = useState<{ [key: number]: boolean }>({});
    const duplicatIDRef = useRef<number[]>([]);

    useEffect(() => {
        useFetch().then((data: PdfMetadata[]) => {
            setPdfData(data);
        });
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

    function formatBytes(bytes: number, decimals = 2): string {
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    (function filterDuplicateIDs() {
        const fileSizeMap = new Map<number, number[]>();
        const duplicatedIDs = new Set<number[]>();

        pdfData.forEach((item) => {
            if (!fileSizeMap.has(item.filesize)) {
                fileSizeMap.set(item.filesize, []);
            }
            fileSizeMap.get(item.filesize)?.push(item.id);
        });

        fileSizeMap.forEach((item) => {
            if (item.length > 1) {
                duplicatedIDs.add(item);
            }
        });
        duplicatIDRef.current = Array.from(duplicatedIDs).flat();
    })();

    return (
        <>
            {sortedData.map((data: PdfMetadata) => (
                <div
                    key={data.id}
                    className={`basis-full flex-row my-1 ${
                        data.has_file_problems === 1
                            ? "error"
                            : duplicatIDRef.current.includes(data.id)
                            ? "warning"
                            : "even:bg-zinc-300 odd:bg-zinc-400"
                    }`}
                    onClick={() => handleVisibility(data.id)}
                >
                    <div className="flex gap-x-2 py-1 px-2 cursor-pointer">
                        <div className="basis-25 truncate content-center">{data.title}</div>
                        <div className="basis-20 truncate content-center">{data.filename}</div>
                        <div className="basis-15 truncate content-center">{data.author}</div>
                        <div className="basis-15 truncate content-center text-center">{data.created}</div>
                        <div className="basis-7 truncate content-center text-center">
                            {" "}
                            {data.filesize && formatBytes(data.filesize)}
                        </div>
                        <div className="basis-5 truncate content-center text-center">
                            {data.has_metadata ? "Yes" : "No"}
                        </div>
                        <div className="basis-5 truncate content-center text-center">
                            {data.has_file_problems ? "Yes" : "No"}
                        </div>
                        <div className="basis-10 justify-center ">
                            <Button id={data.id} to_delete={data.to_delete} />
                        </div>
                    </div>
                    <div className={`${visibility[data.id] ? "" : "hidden"}`}>
                        <div className="py-1 px-2 text-lg">
                            <div className="basis6-12">
                                <b>Creator: </b>
                                {data.creator}
                            </div>
                            <div className="basis6-12">
                                <b>Producer: </b>
                                {data.producer}
                            </div>
                            <div className="basis6-12">
                                <b>Last Modified: </b>
                                {data.modified}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
