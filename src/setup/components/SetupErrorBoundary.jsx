import { Component } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export class SetupErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SquadPlay Setup Error Caught:', error, errorInfo);
  }

  handleRestart = () => {
    // Clear session by manually wiping the localStorage key for safety
    try {
      localStorage.setItem('squadplay_session', JSON.stringify({}));
    } catch (e) {
      console.warn('Failed to clear session in error boundary', e);
    }
    
    this.setState({ hasError: false });
    window.location.reload();
  };

  handleHome = () => {
    try {
      localStorage.setItem('squadplay_session', JSON.stringify({}));
    } catch (e) {
      console.warn('Failed to clear session in error boundary', e);
    }
    
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay z-0" />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 max-w-md w-full flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-amber-warning/20 rounded-full flex items-center justify-center mb-6 border border-amber-warning/30 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
              <AlertTriangle size={40} className="text-amber-warning" />
            </div>
            
            <h1 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Setup Interrupted
            </h1>
            <div className="w-full bg-red-900/50 p-4 rounded text-left overflow-auto mb-4 border border-red-500/50 text-red-200 font-mono text-sm">
              {this.state.error && this.state.error.toString()}
              <br/><br/>
              {this.state.error && this.state.error.stack}
            </div>
            <p className="text-gray-400 mb-8 font-medium">
              We hit a snag while setting up your game. Let's restart the configuration.
            </p>
            
            <div className="w-full flex flex-col gap-4">
              <Button onClick={this.handleRestart} className="w-full py-4 text-lg font-bold bg-amber-warning hover:bg-amber-400 text-black">
                <RotateCcw size={20} className="mr-2" /> Restart Setup
              </Button>
              <Button onClick={this.handleHome} variant="secondary" className="w-full py-4 border border-white/10 font-bold bg-white/5 hover:bg-white/10">
                <Home size={20} className="mr-2" /> Return Home
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
