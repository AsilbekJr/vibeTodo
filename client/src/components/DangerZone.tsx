import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodos, type Todo } from '../features/todos/todosSlice';
import TodoItem from './TodoItem';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const DangerZone: React.FC = () => {
  const todos = useSelector(selectTodos) as Todo[];
  
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Filter for incomplete tasks that are NOT created today (i.e., overdue)
  const overdueTodos = todos.filter(t => !t.completed && !isToday(t.createdAt));

  if (overdueTodos.length === 0) return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="hidden" // Hide completely if no overdue tasks, or show a success message? 
      // User request implies this zone is specifically for "next day's passed tasks".
      // If none, maybe just hide it to keep UI clean, or show "All caught up on backlog"
    ></motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <Card className="border-destructive/20 shadow-md bg-destructive/5 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-destructive text-xl">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
              Bajarilmagan (Eski)
            </CardTitle>
            <Badge variant="destructive" className="px-2.5 shadow-sm">
              {overdueTodos.length}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Diqqat! Bu vazifalar avvalgi kunlardan qolib ketgan. Tezroq bitiring!
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {overdueTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DangerZone;
