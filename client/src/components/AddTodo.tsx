import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';
import type { AppDispatch } from '../app/store';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo(title));
      setTitle('');
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit} 
      className="flex w-full items-center space-x-2 mb-8"
    >
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Yangi vazifa qo'shish..."
        className="h-12 text-lg shadow-sm border-2 focus-visible:ring-primary/20 transition-all font-medium"
      />
      <Button 
        type="submit" 
        size="icon" 
        className="h-12 w-12 shrink-0 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
        disabled={!title.trim()}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </motion.form>
  );
};

export default AddTodo;
