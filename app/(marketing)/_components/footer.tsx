import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

export const Footer = () => {
    return (
        <div className="flex items-center rounded-md w-full p-6  bg-background dark:bg-[#1F1F1F] z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-between rounded-lg
            md:justify-end flex items-center gap-x-2
            text-muted-foreground">
                <Button variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                    Term & Conditions </Button>
            </div>
        </div>
    )
}