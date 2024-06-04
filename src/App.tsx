import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { fetchTodos } from './api';
import TodoList from './components/TodoList';
import { Todo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos()
      .then(response => setTodos(response.data.slice(0, 10))) // Limit to 10 items
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <Container>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </Container>
  );
};

export default App;
