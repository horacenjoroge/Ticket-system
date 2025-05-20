import { useTheme } from '../../context/ThemeContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ size = 'md' }: LoadingSpinnerProps) => {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} border-4 border-neutral-200 dark:border-neutral-700 rounded-full border-t-primary-500 animate-spin`} 
        role="status" 
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;