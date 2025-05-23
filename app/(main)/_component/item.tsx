"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface itemProps{
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    level?: number;
    isSearch?: boolean;
    onExpand?: () => void;
    label: string;
    onClick: () => void;
    icon: LucideIcon
}
export const Item =({
   id, label, onClick, icon: Icon, active, documentIcon, expanded, isSearch, level = 0, onExpand
}: itemProps) =>{

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    


    return(
        <div onClick={onClick} role="button" style={{ paddingLeft: level ? `${(level * 12) + 12}px` : "12px" }}
        className={cn("group min-h-[27px] trxt-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
            active && "bg-primary/5 text-primary"
        )}>
            {!!id && (<div role="button"
            className="h-full rounded-sm hover:bg-neytral-300 dark:bg-neutral-600 mr-1"> <ChevronIcon /> </div>)}
            {documentIcon ? (
                <div className="shrink-0 h-[18px] mr-2">
                    {documentIcon}
                </div>
            ): (
                
         <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />   
            )}
         <span className="truncate">{ label }</span>
         {isSearch &&(
            <kbd className="ml-auto px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted">
                <span className="text-[8px]">&#8984;</span>K
            </kbd>
         )}
         </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div style={{
            paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
        }} className="flex gap-x-2 py-[3px]">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}