interface LanguageProgressBarProps {
  completed: number;
  total: number;
}

export default function LanguageProgressBar({ completed, total }: LanguageProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>Progress</span>
        <span>{completed}/{total} ({percentage}%)</span>
      </div>
      <div className="w-full bg-base-300 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}