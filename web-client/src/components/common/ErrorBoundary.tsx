import * as React from 'react';

interface IErrorBoundaryProps {
}
interface IErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error: any, info: any) {
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div>
            <h1>Something went wrong.</h1>
          </div>
        );
      }
      return this.props.children;
    }
  
}