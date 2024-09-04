"use client";

import { useEffect, useState } from "react";
import DataBody from "./DataBody";
import DataHeader from "./DataHeader";
import { SortOrder } from "@/types/types";
import TopButton from "./TopButton";

export default function DisplayData() {
    const [sortData, setSortData] = useState<SortOrder>({ col: "title", order: "asc" });
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 600) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        });
    });

    return (
        <>
            <DataHeader sortData={sortData} setSortData={setSortData} />
            <DataBody sortData={sortData} />
            {showTopButton && <TopButton />}
        </>
    );
}
