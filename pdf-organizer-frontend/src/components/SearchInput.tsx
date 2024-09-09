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
                <svg
                    version="1.1"
                    id="Layer_1"
                    className="fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="13px"
                    height="13px"
                    viewBox="0 0 122.878 122.88"
                    xmlSpace="preserve"
                >
                    <g>
                        <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                    </g>
                </svg>
            </button>
        </div>
    );
}
