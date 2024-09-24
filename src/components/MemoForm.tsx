"use client";

import {useState, FormEvent} from "react";
import useMemoStore from "@/app/store/memoStore";

export default function MemoForm() {
    const [newMemo, setNewMemo] = useState("");
    const {addMemo} = useMemoStore();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMemo.trim()) return;
        addMemo(newMemo, "all"); // You might want to add category selection here
        setNewMemo("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                id="newMemoText"
                name="newMemoText"
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
                placeholder="Write your memo here ...."
                className="text-lg font-semibold w-full h-48 border p-4 rounded text-gray-800 bg-white resize-none"
                style={{minHeight: "25vh"}}
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-800 transition-colors"
            >
                Add Memo
            </button>
        </form>
    );
}