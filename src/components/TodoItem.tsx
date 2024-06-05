import React, { useState } from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, Paper, TextField, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Todo } from '../types';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, removeTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={2} style={{ margin: '0.5em 0', padding: '0.5em' }}>
        <ListItem>
          <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
          {isEditing ? (
            <TextField
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleSave}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
              fullWidth
            />
          ) : (
            <ListItemText
              primary={todo.title}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={handleEdit}
            />
          )}
          <IconButton edge="end" onClick={handleEdit} data-testid="edit-button">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => removeTodo(todo.id)} data-testid="delete-button">
            <DeleteIcon />
          </IconButton>
        </ListItem>
      </Paper>
    </motion.div>
  );
};

export default TodoItem;
