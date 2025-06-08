'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useConvexAuth } from "convex/react"
import { Spinner } from "@/components/spinner"
import Link from "next/link"
import { SignInButton } from "@clerk/clerk-react"
import { RainbowButton } from "@/components/magicui/rainbow-button"

	

export default function Heading () {

  const {isAuthenticated,isLoading} = useConvexAuth()

return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to <span className="underline">Notion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion is the connected workspace where <br/>
      better, faster work happens</h3>
      {isLoading && <div className="w-full flex justify-center items-center">
        <Spinner size='lg'/>
        </div>}
      {isAuthenticated && !isLoading && (
        <RainbowButton asChild>
          <Link href='/documents'>
            Enter Jotion
            <ArrowRight className="w-4 h-4 ml-2"/>
          </Link>
      </RainbowButton>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode='modal'>
            <Button>
              Get Jotion Free
              <ArrowRight className="w-4 h-4 ml-2"/>
            </Button>
          </SignInButton>
        )}
    </div>
)
}