export default function DataHeader({ handleTest }: { handleTest: (column: string) => void }) {
    return (
        <div className="flex gap-2">
            <div className="cursor-pointer" onClick={() => handleTest("title")}>
                Title
            </div>
            <div className="cursor-pointer" onClick={() => handleTest("author")}>
                Author
            </div>
            <div className="cursor-pointer" onClick={() => handleTest("creator")}>
                Creator
            </div>
            <div className="cursor-pointer" onClick={() => handleTest("producer")}>
                Producer
            </div>
            <div className="cursor-pointer" onClick={() => handleTest("created")}>
                Created
            </div>
            <div className="cursor-pointer" onClick={() => handleTest("modified")}>
                Modified
            </div>
            <div className="cursor-pointer" onClick={() => handleTest("filename")}>
                Filename
            </div>
            <div className="cursor-pointer" onClick={() => handleTest("filesize")}>
                Filesize
            </div>
            <div className="cursor-pointer" onClick={() => handleTest("has_metadata")}>
                Has Metadata
            </div>
            <div className="cursor-pointer" onClick={() => handleTest("has_file_problems")}>
                Has File Problems
            </div>
        </div>
    );
}
