"use client";

import {ClerkProvider, useAuth} from "@clerk/nextjs";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {Authenticated, AuthLoading, ConvexReactClient, Unauthenticated} from "convex/react";
import {ThemeProvider} from "./theme-provider";
import {UnauthenticatedView} from "@/features/auth/components/unauthenticated-view";
import {AuthLoadingView} from "@/features/auth/components/auth-loading-view";
import {dark} from "@clerk/themes";
import { TooltipProvider } from "@/components/ui/tooltip";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({children}: { children: React.ReactNode }) => {
    return (
        <ClerkProvider appearance={{ theme: dark }}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ThemeProvider>
                    <TooltipProvider delayDuration={0}>
                    <Authenticated>
                        {children}
                    </Authenticated>
                    <Unauthenticated>
                        <UnauthenticatedView/>
                    </Unauthenticated>
                    <AuthLoading>
                        <AuthLoadingView/>
                    </AuthLoading>
                    </TooltipProvider>

                </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}