const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(todos);
  } catch (error) {
    console.error('Error in getTodos:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: { title }
    });
    res.json(todo);
  } catch (error) {
    console.error('Error in createTodo:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, title } = req.body;
    
    let completedAt = undefined;
    if (completed === true) {
      completedAt = new Date();
    } else if (completed === false) {
      completedAt = null;
    }

    const data = {
      title,
      completed
    };
    
    if (completed !== undefined) {
      data.completedAt = completedAt;
    }

    const todo = await prisma.todo.update({
      where: { id },
      data
    });
    res.json(todo);
  } catch (error) {
    console.error('Error in updateTodo:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id }
    });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error in deleteTodo:', error);
    res.status(500).json({ error: error.message });
  }
};
