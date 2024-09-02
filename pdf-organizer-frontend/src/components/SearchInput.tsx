export default function SearchInput() {
    return (
        <div className="w-6/12 flex justify-end content-center">
            <input
                type="text"
                name="search"
                id="search"
                className="transition w-4/12 focus:w-8/12 focus:transition-all rounded-md border-0 px-4 text-lg"
            ></input>
        </div>
    );
}
