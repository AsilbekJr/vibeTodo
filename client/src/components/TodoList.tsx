import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../features/todos/todosSlice';
import type { RootState, AppDispatch, Todo } from '../app/store';
import TodoItem from './TodoItem';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trophy, History, Clock } from 'lucide-react';
import { Separator } from './ui/separator';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const isToday = (dateString: string | null) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const completedTodos = items.filter(t => t.completed);
  
  // Completed Today
  const completedToday = completedTodos.filter(t => 
    t.completedAt ? isToday(t.completedAt) : isToday(t.updatedAt) // Falback to updatedAt if completedAt missing (migration)
  );

  // History (Completed before today)
  const historyTodos = completedTodos.filter(t => 
    t.completedAt ? !isToday(t.completedAt) : !isToday(t.updatedAt)
  );

  if (status === 'loading' && items.length === 0) return null;

  return (
    <div className="space-y-8 mt-8">
      {/* TODAY'S COMPLETED */}
       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-green-500/20 shadow-sm bg-green-500/5 overflow-hidden">
          <CardHeader className="pb-3 border-b border-green-500/10 bg-green-500/10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400 text-xl">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Bugun Bajarilganlar
              </CardTitle>
              <Badge variant="secondary" className="px-2.5 py-0.5 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200">
                {completedToday.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {completedToday.length === 0 ? (
               <p className="text-muted-foreground italic text-center py-4 opacity-60 text-sm">
                 Hozircha bugun hech narsa bajarilmadi.
               </p>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode='popLayout'>
                  {completedToday.map(todo => (
                    <div key={todo.id} className="relative group">
                       <TodoItem todo={todo} />
                       <div className="absolute top-4 right-14 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-md flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                         <Clock className="w-3 h-3" />
                         {formatTime(todo.completedAt || todo.updatedAt)}
                       </div>
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* HISTORY */}
      {historyTodos.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border/60"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-sm font-medium text-muted-foreground flex items-center gap-2">
                <History className="w-4 h-4" /> Vazifalar Tarixi
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
             {/* Group by date? For now simple list */}
             {historyTodos.map(todo => (
               <div key={todo.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-border/50 opacity-70 hover:opacity-100 transition-all">
                  <span className="line-through text-muted-foreground truncate flex-1">{todo.title}</span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded">
                      <Clock className="w-3 h-3" />
                      {formatDate(todo.completedAt || todo.updatedAt)}
                    </span>
                    <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded">
                      {formatTime(todo.completedAt || todo.updatedAt)}
                    </span>
                  </div>
               </div>
             ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TodoList;
