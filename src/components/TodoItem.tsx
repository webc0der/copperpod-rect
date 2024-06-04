import React from 'react';
import { ListItem, ListItemText, Checkbox } from '@mui/material';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => (
  <ListItem>
    <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
    <ListItemText primary={todo.title} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
  </ListItem>
);

export default TodoItem;
