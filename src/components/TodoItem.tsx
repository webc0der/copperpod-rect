import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, Box, Typography, Paper } from '@mui/material';
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
    <Paper elevation={2} style={{ margin: '0.5em 0', padding: '0.5em' }}>
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
    </Paper>
  </motion.div>
);

export default TodoItem;
