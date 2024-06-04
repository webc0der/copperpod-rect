import React from 'react';
import { List } from '@mui/material';
import TodoItem from './TodoItem';
import { Todo } from '../types';
import { AnimatePresence } from 'framer-motion';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, removeTodo, editTodo }) => (
  <List>
    <AnimatePresence>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} editTodo={editTodo} />
      ))}
    </AnimatePresence>
  </List>
);

export default TodoList;
