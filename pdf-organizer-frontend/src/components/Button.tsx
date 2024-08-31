"use client";

import { useEffect, useState } from "react";

export default function Button({ id, to_delete }: { id: number; to_delete: number }) {
    const [deleteState, setDeleteState] = useState<boolean>();

    useEffect(() => {
        if (to_delete === 0) {
            setDeleteState(false);
        }
        if (to_delete === 1) {
            setDeleteState(true);
        }
    }, [to_delete]);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>, id: number, to_delete: number) {
        // Stop the Button from activating the hidden Info
        e.stopPropagation();

        if (to_delete === 0) {
            setDeleteState(false);
        }
        if (to_delete === 1) {
            setDeleteState(true);
        }

        // Update the to_delete key in the DB
        try {
            fetch("/api", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, to_delete }),
            });
        } catch (err) {
            console.error("Something went wrong with fetch: " + err);
        }
    }

    return (
        <>
            {deleteState === false && (
                <button
                    onClick={(e) => handleClick(e, id, 1)}
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Delete
                </button>
            )}
            {deleteState === true && (
                <button
                    onClick={(e) => handleClick(e, id, 0)}
                    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Undo
                </button>
            )}
        </>
    );
}
