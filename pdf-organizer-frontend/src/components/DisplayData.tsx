"use client";

import { useEffect, useState } from "react";
import DataBody from "./DataBody";
import DataHeader from "./DataHeader";
import { SortOrder } from "@/types/types";

export default function DisplayData() {
    const [sortData, setSortData] = useState<SortOrder>({ col: "title", order: "asc" });

    return (
        <>
            <DataHeader sortData={sortData} setSortData={setSortData} />
            <DataBody sortData={sortData} />
        </>
    );
}
