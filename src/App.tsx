import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, List } from '@mui/material';
import { Todo } from './types';
import TodoList from './components/TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api';

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
    <Container>
      <h1>Todo List</h1>
      <TextField
        label="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo();
          }
        }}
      />
      <Button onClick={handleAddTodo} variant="contained" color="primary">
        Add Todo
      </Button>
      <List>
        <TodoList todos={todos} toggleTodo={handleToggleTodo} removeTodo={handleRemoveTodo} />
      </List>
    </Container>
  );
};

export default App;
