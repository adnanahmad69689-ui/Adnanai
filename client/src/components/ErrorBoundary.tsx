import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

const DEPLOYMENT_RELOAD_KEY = "adnan-ai:asset-reload-attempted";
const staleAssetPattern = /failed to fetch dynamically imported module|importing a module script failed|loading chunk|chunkloaderror/i;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const canRecoverFromStaleAsset = typeof window !== "undefined" && staleAssetPattern.test(error.message);
    if (canRecoverFromStaleAsset && window.sessionStorage.getItem(DEPLOYMENT_RELOAD_KEY) !== "true") {
      window.sessionStorage.setItem(DEPLOYMENT_RELOAD_KEY, "true");
      window.location.reload();
      return;
    }
    console.error("Portfolio render error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <main className="error-fallback"><p className="error-fallback-label">ADNAN AI</p><h1>Something interrupted the page.</h1><p>Please refresh and try again.</p><button onClick={() => window.location.reload()}>Reload page</button></main>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
