"use client";

import { Component, type ReactNode } from "react";

interface ViewerErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback: ReactNode;
}

interface ViewerErrorBoundaryState {
  readonly hasError: boolean;
}

export class ViewerErrorBoundary extends Component<
  ViewerErrorBoundaryProps,
  ViewerErrorBoundaryState
> {
  state: ViewerErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ViewerErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
