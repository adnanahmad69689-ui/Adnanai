import { Component, type ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return <main className="error-fallback"><p className="error-fallback-label">ADNAN AI</p><h1>Something interrupted the page.</h1><p>Please refresh and try again.</p><button onClick={() => window.location.reload()}>Reload page</button></main>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
