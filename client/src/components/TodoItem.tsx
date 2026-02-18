import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodoItem, deleteTodo, type Todo } from '../features/todos/todosSlice';
import type { AppDispatch } from '../app/store';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  time?: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      dispatch(updateTodoItem({ id: todo.id, title: editTitle }));
    } else {
      setEditTitle(todo.title);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleUpdate();
    if (e.key === 'Escape') handleCancel();
  };

  const handleToggle = () => {
    dispatch(updateTodoItem({ id: todo.id, completed: !todo.completed }));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.005 }}
      className={cn(
        "group flex items-center justify-between p-4 rounded-2xl border-2 mb-4 transition-all duration-300 shadow-sm relative overflow-hidden",
        todo.completed 
          ? "bg-secondary/30 border-transparent" 
          : "bg-card border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
        isEditing && "ring-2 ring-primary/20 border-primary/50 bg-background scale-100"
      )}
    >
      {/* Background Progress Fill Effect for Completed Items */}
      <AnimatePresence>
        {todo.completed && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 overflow-hidden flex-1 z-10">
        {!isEditing && (
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleToggle}
            className={cn(
              "relative flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm",
              todo.completed
                ? "bg-gradient-to-br from-green-400 to-emerald-600 border-transparent shadow-green-500/30 shadow-md"
                : "bg-white dark:bg-slate-800 border-muted-foreground/30 hover:border-primary hover:shadow-primary/20"
            )}
          >
            <AnimatePresence>
              {todo.completed && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="w-3 h-3 sm:w-5 sm:h-5 text-white" strokeWidth={3.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
        
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <Input
              ref={inputRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-9 sm:h-10 text-base sm:text-lg font-medium bg-background/50"
            />
          </div>
        ) : (
          <span 
            className={cn(
              "text-base sm:text-lg transition-all duration-300 select-none cursor-pointer truncate font-medium tracking-tight",
              todo.completed 
                ? "text-muted-foreground line-through decoration-muted-foreground/40 decoration-2" 
                : "text-foreground"
            )}
            onClick={!todo.completed ? () => setIsEditing(true) : handleToggle}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-0 sm:gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-200 translate-x-0 lg:translate-x-2 lg:group-hover:translate-x-0 z-10">
        {/* Time display if provided */}
        {time && (
          <span className="text-xs text-muted-foreground mr-2 hidden sm:inline-block">
             {time}
          </span>
        )}
        
        {isEditing ? (
          <>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button size="icon" variant="ghost" onClick={handleUpdate} className="h-8 w-8 sm:h-9 sm:w-9 text-green-600 hover:text-green-700 hover:bg-green-100 rounded-xl">
                <Check className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8 sm:h-9 sm:w-9 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-xl">
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            {!todo.completed && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          </>
        )}
      </div>

      </div>
    </motion.div>
  );
};

export default TodoItem;
