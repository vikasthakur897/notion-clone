"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "sonner";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  level?: number;
  isSearch?: boolean;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  className?: string;
}
export const Item = ({
  id,
  label,
  onClick,
  className,
  icon: Icon,
  active,
  documentIcon,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) => {

    // const router = useRouter();
    const { user } = useUser();

    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const onArchive = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if(!id) return;
      const promise = archive({ id});

      toast.promise(promise, {
        loading: "Moving to trash...",
        success: "Note moved to trash!",
        error: "Failed to move note to trash.",
      })
    };

    const handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onExpand?.();

    };

    const onCreate =( e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!id) return;

        const promise = create({ title: "New Document", parentDocument: id}).then((documentId) =>{
            if(!expanded){
                onExpand?.();
            }
            // router.push(`/documents/${documentId}`);
        });

        toast.promise(promise), {
            loading: "Creating document...",
            success: "Document created successfully!",
            error: "Failed to create document.",
        }
    }


  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] trxt-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 h-[18px] mr-2">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted">
          <span className="text-[8px]">&#8984;</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
         <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
            <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neuttral-600" >
               <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
              <DropdownMenuItem onClick={onArchive}>
                <Trash className=" h-4 w-4 mr-2" /> 
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs p-2 text-muted-foreground ">Last edited by: {user?.fullName}</div>
          </DropdownMenuContent>
         </DropdownMenu>
            <div
            role="button"
            onClick={onCreate} className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-nutral-300 dark:hover:bg-nutral-600">
                <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
