import { NextResponse } from "next/server";
import { openDB } from "@/lib/db";
import { PdfMetadata } from "@/types/types";

export async function GET() {
    try {
        const db = await openDB();
        const rows = await db.all<PdfMetadata[]>("SELECT * FROM pdf_metadata");
        await db.close();
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching PDF metadata:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const { id, to_delete } = await request.json();
    if (typeof to_delete !== "number" || (to_delete !== 0 && to_delete !== 1)) {
        return NextResponse.json({ error: "to_delete must be 0 or 1" }, { status: 400 });
    }

    try {
        const db = await openDB();
        await db.run("UPDATE pdf_metadata SET to_delete = ? WHERE id = ?", to_delete, id);
        await db.close();
        return NextResponse.json({ message: "PDF to_delete updated" }, { status: 200 });
    } catch (error) {
        console.error("Error updating PDF to_delete:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
