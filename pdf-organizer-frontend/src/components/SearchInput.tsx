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

    return (
        <div className="w-6/12 flex justify-end content-center">
            <input
                type="search"
                onChange={(e) => handleSearch(e.target.value)}
                // defaultValue={searchParams.get("search")?.toString()}
                className="transition w-4/12 focus:w-8/12 focus:transition-all focus:outline-none rounded-md border-0 px-4 text-lg"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
            />
            {/* <button
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out items-center"
                type="button"
                id="button-addon2"
                >
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                </svg>
            </button> */}
        </div>
    );
}

// <div className="w-6/12 flex justify-end content-center">
//     <input
//         type="text"
//         name="search"
//         id="search"
//         className="transition w-4/12 focus:w-8/12 focus:transition-all rounded-md border-0 px-4 text-lg"
//     ></input>
// </div>

// <div className="pt-2 relative mx-auto text-gray-600">
//     <input
//         className="border-2 border-gray-300 bg-white h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none"
//         type="search"
//         name="search"
//         placeholder="Search"
//     />
// </div>

// <div className="">
//     <div className="flex justify-center items-center px-4">
//         <div className="relative">
//             <input
//                 type="text"
//                 className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
//                 placeholder="Search anything..."
//             />
//             <div className="absolute top-4 right-3">
//                 <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
//             </div>
//         </div>
//     </div>
// </div>

//         <div class="flex justify-center">
//   <div class="mb-3 xl:w-96">
//     <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
//       <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2">
//       <button class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
//         <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//           <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
//         </svg>
//       </button>
//     </div>
//   </div>
// </div>
