"use client";

import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Spinner } from "@/components/spinner";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4 dark:bg-[#1F1F1F] w-full">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans. Welcome to{" "}
        <span className="underline">Notion-clone</span>
      </h1>

      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion clone is the conneted workspace where <br />
        better ideas, projects and documents come together.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <RainbowButton asChild>
          <Link href="/documents">
            Enter Notion-Clone
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </RainbowButton>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton>
          <RainbowButton>
            Get Notion Free
            <ArrowRight className="h-4 w-4 ml-2" />
          </RainbowButton>
        </SignInButton>
      )}
    </div>
  );
};
