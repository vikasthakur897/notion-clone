"use client";

import { ConfirmModel } from "@/components/models/confirm-model";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/router";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documnets.remove);
  const restore = useMutation(api.documnets.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting notes...",
      success: "Note Deleted!",
      error: "Failed to delete note.",
    });
  };

  const onRestore = () => {
    const promise = restore({ id: documentId })

    toast.promise(promise, {
      loading: "Restoring notes...",
      success: "Note Restored!",
      error: "Failed to restore note.",
    });

    router.push("/documents");
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModel onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete Forever
        </Button>
      </ConfirmModel>
    </div>
  );
};

export default Banner;
