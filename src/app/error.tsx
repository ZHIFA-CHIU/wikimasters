"use client";

import { AlertTriangle, Home, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          <div className="relative mb-6">
            <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground" />
            <X className="h-8 w-8 absolute -top-1 -right-1 text-destructive" />
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">Error</h1>

          <h2 className="text-xl font-semibold text-foreground mb-4">
            Something went wrong
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            We couldn&apos;t load this wiki page right now. Please try again, or
            return to the wiki home page.
          </p>

          {error.message && (
            <p className="text-xs text-muted-foreground mb-4">
              {error.message}
            </p>
          )}

          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button className="w-full" size="lg" variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Back to Wiki Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
