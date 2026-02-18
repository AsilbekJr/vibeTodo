import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import ActiveTodos from './components/ActiveTodos';
import ProgressBar from './components/ProgressBar';
import DangerZone from './components/DangerZone';
import { ClipboardList, Sparkles } from 'lucide-react';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-slate-800 flex flex-col items-center py-6 sm:py-10 px-3 sm:px-6 transition-colors duration-500 selection:bg-primary/20">
      <div className="w-full max-w-3xl animate-in fade-in-0 zoom-in-95 duration-500">
        
        <header className="mb-6 sm:mb-8 text-center relative group cursor-default">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4 ring-1 ring-primary/20 shadow-lg shadow-primary/5 transition-transform duration-300 hover:scale-110 hover:rotate-3">
            <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent drop-shadow-sm p-3">
            Kunlik Vazifalar
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium text-sm sm:text-base">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400" />
            <p>Samaradorlikni oshiring</p>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400" />
          </div>
        </header>

        <Card className="border-border/60 shadow-2xl backdrop-blur-xl bg-card/80 overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          
          <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
            <ProgressBar />
            
            <section className="relative">
              <Badge variant="outline" className="hidden sm:inline-flex absolute -top-3 left-0 bg-background rotate-1">Yangi Vazifa</Badge>
              <div className="pt-2 sm:pt-4">
                 <AddTodo />
              </div>
            </section>

            <div className="space-y-6 sm:space-y-8">
              <DangerZone />
              <ActiveTodos />
              <TodoList />
            </div>
          </CardContent>
        </Card>
        
        <footer className="mt-8 text-center flex flex-col items-center gap-2">
          <p className="text-xs sm:text-sm text-muted-foreground/60">
            Created with Vibe &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
