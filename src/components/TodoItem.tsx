import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../types';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, removeTodo }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}
  >
    <ListItem>
      <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
      <ListItemText
        primary={todo.title}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      />
      <IconButton edge="end" onClick={() => removeTodo(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  </motion.div>
);

export default TodoItem;
