"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

interface TitleProps{
    initialDate: Doc<"documents">
}

const Title = ({
    initialDate
}: TitleProps) => {

    const [isEditing, setIsEditing] = useState(false)

    const inputRef =useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState(initialDate.title || "Untitled")
    const update = useMutation(api.documnets.update)

    const enableInput = () =>{
        setTitle(initialDate.title);
        setIsEditing(true),
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0);
    };

    const disableInput =() =>{
        setIsEditing(false);
    };

    const onChange =(
        event: React.ChangeEvent<HTMLInputElement>
    ) =>{
        setTitle(event.target.value);
        update({
            id: initialDate._id,
            title: event.target.value || "Untitled"
        })
    }

    const onKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter"){
            disableInput()
        }
    };


    return (
        <div className="flex items-center gap-x-1">
            {!!initialDate.icon && <p>{ initialDate.icon }</p>}

            {isEditing ? (<Input ref={inputRef}
             onClick={enableInput}
             onBlur={disableInput}
               className="h-7 px-2 focus-visible:ring-transparent" />):(
                <Button onClick={() => {}}
                variant="ghost"
                size="sm"
                className="font-normal h-auto p-1">
                    <span className="truncate">{
                    initialDate?.title
                }</span></Button>
            )}
        </div>
      );
}
 
export default Title;