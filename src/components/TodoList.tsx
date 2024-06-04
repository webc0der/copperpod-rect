import React from 'react';
import { List } from '@mui/material';
import TodoItem from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => (
  <List>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
    ))}
  </List>
);

export default TodoList;
