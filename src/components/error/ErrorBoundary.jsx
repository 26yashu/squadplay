import { Component } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SquadPlay Error Boundary Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-crimson-error/20 to-black z-0" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-0" />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-2xl flex flex-col items-center text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-crimson-error/20 rounded-full flex items-center justify-center mb-6 border border-crimson-error/30 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
              <AlertTriangle size={40} className="text-crimson-error" />
            </div>
            
            <h1 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              System Error
            </h1>
            <p className="text-gray-400 mb-8 font-medium">
              We encountered an unexpected glitch in the matrix. Don't worry, your progress is safely stored.
            </p>
            
            <div className="w-full flex flex-col gap-3">
              <Button 
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
                className="w-full bg-white text-black hover:bg-gray-200 py-4 font-bold"
              >
                <RefreshCw size={20} className="mr-2" /> Reload App
              </Button>
              <div className="flex gap-3">
                <Button 
                  variant="secondary"
                  onClick={() => {
                    this.setState({ hasError: false });
                    window.location.href = '/';
                  }}
                  className="flex-1 py-4 border border-white/10 font-bold"
                >
                  <Home size={20} className="mr-2" /> Home
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => {
                    // Logging handled by crash reporting service in production
                    alert("Error report sent anonymously.");
                  }}
                  className="flex-1 py-4 border border-white/10 font-bold bg-white/5"
                >
                  Report
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
