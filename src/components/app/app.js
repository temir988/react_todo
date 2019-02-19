import React, { Component } from 'react';

// components
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class App extends Component {

  constructor() {
    super();

    this.startId = 1;

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffe'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch')
      ]
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);

        // [a, b, c, d, e]
        // [a, b,    d, e]
        const result = [
          ...todoData.slice(0, idx), 
          ...todoData.slice(idx+1)
        ];

        return {
          todoData: result
        };
      });      
    };


    this.searchChange = (text) => {      
      this.setState(({ todoData }) => { 
        const result = todoData.map((el) => {            
          if ( el.label.toLowerCase().indexOf(text.toLowerCase()) !== -1) {            
            return {...el, hide: false};
          } else {
            return {...el, hide: true};
          }         
        });
        return {
          todoData: result
        };
      });
    }

    this.addItem = (text) => {
      this.setState(({ todoData }) => {
        const newItem = this.createTodoItem(text);
        const result = [...todoData, newItem];
        return {
          todoData: result
        };
      });
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        };
      });
    };

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        };
      });
    };

  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    // 1. update object
    const oldItem = arr[idx];
    const newItem = {...oldItem, 
                    [propName]: !oldItem[propName]};
    
    // 2. construct new array
    return [
      ...arr.slice(0, idx), 
      newItem,
      ...arr.slice(idx+1)
    ];
  }

  createTodoItem(label) {
    return {
      label: label, 
      important: false,
      done: false,
      id: this.startId++
    };
  };

  render() {

    const { todoData } = this.state;
    const doneCount = todoData
                      .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={ todoData } 
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
        />
        <AddItem 
          onAddItem={ this.addItem }
        />
        
      </div>
    );
  }
};