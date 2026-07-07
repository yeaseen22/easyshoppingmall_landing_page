"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <div className="mb-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
              <AlertTriangle className="h-10 w-10 text-secondary" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Something went wrong</h2>
          <p className="mb-8 max-w-md text-muted-foreground">
            An unexpected error occurred. Please try again or contact support if the issue persists.
          </p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw size={16} />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error, reset }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
          <AlertTriangle className="h-10 w-10 text-secondary" />
        </div>
      </div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Failed to load section</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        {error?.message || "An unexpected error occurred."}
      </p>
      {reset && (
        <Button onClick={reset}>
          <RefreshCw size={16} />
          Retry
        </Button>
      )}
    </div>
  );
}
