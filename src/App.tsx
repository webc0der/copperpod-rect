import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, List, AppBar, Toolbar, Typography, Box, Paper } from '@mui/material';
import { Todo } from './types';
import TodoList from './components/TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      const addedTodo = await addTodo(newTodo);
      setTodos([...todos, addedTodo]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedTodo = await updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    }
  };

  const handleRemoveTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Todo List
            </Typography>
          </Toolbar>
        </AppBar>
        <Box mt={4} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Paper elevation={3} style={{ padding: '1em' }}>
            <TextField
              label="New Todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddTodo();
                }
              }}
              fullWidth
              margin="normal"
            />
            <Button onClick={handleAddTodo} variant="contained" color="primary" fullWidth>
              Add Todo
            </Button>
          </Paper>
        </Box>
        <List component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          <TodoList todos={todos} toggleTodo={handleToggleTodo} removeTodo={handleRemoveTodo} />
        </List>
      </Container>
    </Box>
  );
};

export default App;
