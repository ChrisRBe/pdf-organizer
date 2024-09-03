import SearchInput from "@/components/SearchInput";

export default function Header() {
    return (
        <div className="py-5 w-full flex sticky top-0 bg-gray-400">
            <h1 className="text-zinc-700 text-5xl font-bold w-6/12">PDF Manager</h1>
            <SearchInput />
        </div>
    );
}
