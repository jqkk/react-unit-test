import { Suspense, SuspenseProps } from "react";
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithComponent,
} from "react-error-boundary";

interface AsyncBoundaryProps
  extends Omit<
      ErrorBoundaryPropsWithComponent,
      "fallback" | "FallbackComponent" | "fallbackRender" | "children"
    >,
    Omit<SuspenseProps, "fallback"> {
  rejectedFallbackComponent: ErrorBoundaryPropsWithComponent["FallbackComponent"];
  pendingFallbackComponent: () => SuspenseProps["fallback"];
}

export const AsyncBoundary = ({
  children,
  rejectedFallbackComponent,
  pendingFallbackComponent,
  ...errorBoundaryProps
}: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={rejectedFallbackComponent}
      {...errorBoundaryProps}
    >
      <Suspense fallback={pendingFallbackComponent()}>{children}</Suspense>
    </ErrorBoundary>
  );
};
