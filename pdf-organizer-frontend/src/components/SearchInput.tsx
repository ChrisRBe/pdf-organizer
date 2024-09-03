"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        replace(`${pathName}?${params.toString()}`);
    }

    function handleClick() {
        const params = new URLSearchParams(searchParams);
        const inputElement = (document.getElementById("searchInput") as HTMLInputElement) || null;
        if (inputElement) {
            inputElement.value = "";
            params.delete("search");

            replace(`${pathName}?${params.toString()}`);
        }
    }

    return (
        <div className="w-6/12 flex justify-end content-center">
            <input
                id="searchInput"
                name="searchInput"
                type="search"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("search")?.toString() || ""}
                className="transition w-4/12 focus:w-8/12 focus:transition-all focus:outline-none rounded-l-lg border-0 px-4 text-lg"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
            />
            <button
                className="px-6 py-2.5 bg-blue-600 text-white font-medium text-1xl leading-tight uppercase rounded-r-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out items-center"
                type="button"
                id="clearInput"
                onClick={handleClick}
            >
                Clear
            </button>
        </div>
    );
}
