import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodos, type Todo } from '../features/todos/todosSlice';
import { Progress } from './ui/progress';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ProgressBar: React.FC = () => {
  const todos = useSelector(selectTodos) as Todo[];
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const getProgressColor = (percent: number) => {
    if (percent === 0) return "bg-primary";
    if (percent < 33) return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
    if (percent < 66) return "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]";
    return "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]";
  };

  const progressColor = getProgressColor(percentage);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 space-y-3"
    >
      <div className="flex justify-between items-end text-sm font-medium">
        <span className="text-muted-foreground">Jarayon</span>
        <span className={cn(
          "text-2xl font-bold transition-colors",
          percentage < 33 ? "text-red-500" : 
          percentage < 66 ? "text-yellow-500" : "text-green-500"
        )}>
          {percentage}%
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-4 bg-secondary/50 border border-border/50" 
        indicatorClassName={cn("transition-all duration-500", progressColor)}
      />
      <p className="text-xs text-center text-muted-foreground mt-2 font-medium">
        {totalCount === 0 
          ? "Hali vazifalar yo'q" 
          : percentage === 100 
            ? "Barcha vazifalar bajarildi! 🎉" 
            : `${completedCount} / ${totalCount} bajarildi`}
      </p>
    </motion.div>
  );
};

export default ProgressBar;
