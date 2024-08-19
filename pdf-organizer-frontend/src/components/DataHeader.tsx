export default function DataHeader() {
    return (<>
        <div className="flex gap-2">
            <div className="cursor-pointer">Title</div>
            <div className="cursor-pointer">Author</div>
            <div className="cursor-pointer">Creator</div>
            <div className="cursor-pointer">Producer</div>
            <div className="cursor-pointer">Created</div>
            <div className="cursor-pointer">Modified</div>
            <div className="cursor-pointer">Filename</div>
            <div className="cursor-pointer">Filesize</div>
            <div className="cursor-pointer">Has Metadata</div>
            <div className="cursor-pointer">Has File Problems</div>
        </div>
    </>
    );
}
