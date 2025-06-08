"use client";

import { Id } from "@/convex/_generated/dataModel";

interface MenuProps {
    documentId : Id<"documents">;
}

export const Menu = ({
    documentId
}: MenuProps) => {
    return (
        <div>
            Menu
        </div>
    )
}