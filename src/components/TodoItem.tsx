import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, removeTodo }) => (
  <ListItem>
    <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
    <ListItemText primary={todo.title} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
    <IconButton edge="end" onClick={() => removeTodo(todo.id)}>
      <DeleteIcon />
    </IconButton>
  </ListItem>
);

export default TodoItem;
