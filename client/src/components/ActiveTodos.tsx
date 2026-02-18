import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodos, type Todo } from '../features/todos/todosSlice';
import TodoItem from './TodoItem';
import { ListTodo } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const ActiveTodos: React.FC = () => {
  const todos = useSelector(selectTodos) as Todo[];
  
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const todayTodos = todos.filter(t => !t.completed && isToday(t.createdAt));

  // If no tasks today, show a friendly placeholder or just null?
  // Let's keep it visible if there are any, or maybe a placeholder if empty but user is adding?
  // User wants separation. Let's show the card even if empty? No, usually hides.
  // But for "Active" it might be nice to have a dedicated zone.
  if (todayTodos.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <Card className="border-primary/20 shadow-md bg-primary/5 overflow-hidden">
        <CardHeader className="pb-3 border-b border-primary/10 bg-primary/10">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-primary text-xl">
              <ListTodo className="h-5 w-5" />
              Bugungi Vazifalar
            </CardTitle>
            <Badge variant="default" className="px-2.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90">
              {todayTodos.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {todayTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActiveTodos;
