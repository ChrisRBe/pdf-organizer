"use client";

import { SortOrder } from "@/types/types";

export default function DataHeader({
    sortData,
    setSortData,
}: {
    sortData: SortOrder;
    setSortData: (sortData: SortOrder) => void;
}) {
    function handleClick(sortObj: SortOrder) {
        const newOrder = sortData.col === sortObj.col ? (sortData.order === "asc" ? "desc" : "asc") : "asc";
        setSortData({ col: sortObj.col, order: newOrder });
    }

    return (
        <>
            <div className="flex gap-x-2 py-3 px-2 bg-zinc-800 text-zinc-200 rounded-t-lg text-center">
                <div
                    className="basis-25 font-bold text-1xl cursor-pointer"
                    onClick={() => handleClick({ col: "title" })}
                >
                    {sortData.col === "title" ? (sortData.order === "asc" ? "Title ▼" : "Title ▲") : "Title"}
                </div>
                <div
                    className="basis-20 font-bold text-1xl cursor-pointer justify-self-start"
                    onClick={() => handleClick({ col: "filename" })}
                >
                    {sortData.col === "filename"
                        ? sortData.order === "asc"
                            ? "Filename ▼"
                            : "Filename ▲"
                        : "Filename"}
                </div>
                <div
                    className="basis-15 font-bold text-1xl cursor-pointer"
                    onClick={() => handleClick({ col: "author" })}
                >
                    {sortData.col === "author" ? (sortData.order === "asc" ? "Author ▼" : "Author ▲") : "Author"}
                </div>
                <div
                    className="basis-15 font-bold text-1xl cursor-pointer"
                    onClick={() => handleClick({ col: "created" })}
                >
                    {sortData.col === "created" ? (sortData.order === "asc" ? "Created ▼" : "Created ▲") : "Created"}
                </div>
                <div
                    className="basis-7 font-bold text-1xl cursor-pointer"
                    onClick={() => handleClick({ col: "filesize" })}
                >
                    {sortData.col === "filesize" ? (sortData.order === "asc" ? "Size ▼" : "Size ▲") : "Size"}
                </div>
                <div
                    className="basis-5 font-bold text-1xl cursor-pointer"
                    onClick={() => handleClick({ col: "has_metadata" })}
                >
                    {sortData.col === "has_metadata" ? (sortData.order === "asc" ? "Meta ▼" : "Meta ▲") : "Meta"}
                </div>
                <div
                    className="basis-5 font-bold text-1xl cursor-pointer"
                    onClick={() => handleClick({ col: "has_file_problems" })}
                >
                    {sortData.col === "has_file_problems"
                        ? sortData.order === "asc"
                            ? "Error ▼"
                            : "Error ▲"
                        : "Error"}
                </div>
                <div className="basis-10  font-bold text-1xl">Delete</div>
            </div>
        </>
    );
}
