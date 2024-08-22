"use client";   

import { SortOrder } from "@/types/types";

export default function DataHeader({ sortData, setSortData }: { sortData: SortOrder, setSortData: (sortData: SortOrder) => void }) {
    
    function handleClick(sortObj: SortOrder) {
        const newOrder = sortData.col === sortObj.col ? (sortData.order === 'asc' ? 'desc' : 'asc') : 'asc';
        setSortData({col: sortObj.col, order: newOrder});
    }

    return (<>
        <div className="flex py-4 bg-zinc-800 text-zinc-200 rounded-t-lg">
            <div className="basis-6/12 px-4 font-bold text-1xl cursor-pointer" onClick={() => handleClick({col: "title"})}>Title</div>
            <div className="basis-1/12 px-4 font-bold text-1xl cursor-pointer" onClick={() => handleClick({col: "author"})}>Author</div>
            <div className="basis-1/12 px-4 font-bold text-1xl cursor-pointer" onClick={() => handleClick({col: "created"})}>Created</div>
            <div className="basis-1/12 px-4 font-bold text-1xl cursor-pointer" onClick={() => handleClick({col: "filesize"})}>Filesize</div>
            <div className="basis-1/12 px-4 font-bold text-1xl cursor-pointer" onClick={() => handleClick({col: "has_metadata"})}>Metadata</div>
            <div className="basis-1/12 px-4 font-bold text-1xl cursor-pointer" onClick={() => handleClick({col: "has_file_problems"})}>Problems</div>
        </div>
    </>
    );
}
