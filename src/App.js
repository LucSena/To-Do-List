import React, { useState, useEffect } from 'react';
import EditTaskModal from './EditTaskModal';
import FilterTasks from './FilterTasks';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Início');
  const [taskInput, setTaskInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Geral');
  const [taskDate, setTaskDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterCategory, setFilterCategory] = useState('Todos');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    setTaskDate(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Os meses começam do zero
      const year = currentDate.getFullYear();

      const newTaskDate = new Date(taskDate);
      const newTaskDay = newTaskDate.getDate() + 1;
      const newTaskMonth = newTaskDate.getMonth() + 1;
      const newTaskYear = newTaskDate.getFullYear();

      const newTask = {
        id: currentDate.getTime(),
        text: taskInput,
        category: selectedCategory,
        addedDate: `${day}/${month}/${year}`,
        taskDate: `${newTaskDay}/${newTaskMonth}/${newTaskYear}` || 'Sem data',
      };

      setTasks([newTask, ...tasks]); // Adiciona a nova tarefa à lista existente
      setTaskInput('');
      setTaskDate('');
    }
  };

  const handleEditTask = (taskId) => {
    setEditingTask(taskId);
  };

  const handleSaveEditedTask = (editedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta tarefa?');
    if (confirmDelete) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const handleFilter = (type, value) => {
    switch (type) {
      case 'date':
        setFilterDate(value);
        break;
      case 'status':
        setFilterStatus(value);
        break;
      case 'category':
        setFilterCategory(value);
        break;
      default:
        break;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const dateMatch = !filterDate || task.taskDate.includes(filterDate);
    const statusMatch =
      filterStatus === 'Todos' || (filterStatus === 'Concluido' && task.completed) || (filterStatus === 'Pendente' && new Date(task.taskDate) >= new Date()) || (filterStatus === 'NaoConcluido' && !task.completed);
    const categoryMatch = filterCategory === 'Todos' || task.category === filterCategory;

    return dateMatch && statusMatch && categoryMatch;
  });

  return (
    <div className="container">
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li className={currentPage === 'Início' ? 'is-active' : ''}>
            <a href="#" onClick={() => handlePageChange('Início')}>Início</a>
          </li>
          <li className={currentPage === 'Listagem' ? 'is-active' : ''}>
            <a href="#" onClick={() => handlePageChange('Listagem')}>Listagem</a>
          </li>
        </ul>
      </nav>


      <div className="has-text-centered">
        <h1 className="title mb-4">To-Do List</h1>
      </div>

      {currentPage === 'Início' && (
        <div>
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="field">
                <label className="label">Digite uma nova tarefa</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={taskInput}
                    onChange={handleTaskInputChange}
                    placeholder="Digite uma nova tarefa"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Categoria</label>
                <div className="control">
                  <div className="select">
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                      <option value="Geral">Geral</option>
                      <option value="Trabalho">Trabalho</option>
                      <option value="Estudos">Estudos</option>
                      <option value="Lazer">Lazer</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Data da Tarefa</label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    value={taskDate}
                    onChange={handleDateChange}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-primary" onClick={handleAddTask}>
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="has-text-centered">
            <h2 className="subtitle">Tarefas Recentes</h2>
          </div>

          {tasks.length > 0 ? (
            <div className="columns is-centered">
              <div className="column is-half">
                {tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="box">
                    <h3 className="title is-5">{task.text}</h3>
                    <p className="subtitle is-6">Adicionada em {task.addedDate}</p>
                    <div className="columns is-mobile">
                      <div className="column">
                        <p>Categoria: {task.category}</p>
                      </div>
                      <div className="column">
                        <p>Data da Tarefa: {task.taskDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {tasks.length > 3 && (
                  <div className="has-text-centered">
                    <p>Mais tarefas disponíveis na <strong><a onClick={() => handlePageChange('Listagem')}>Listagem</a></strong>.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="has-text-centered">
              <p>Nenhuma tarefa adicionada ainda.</p>
            </div>
          )}

        </div>
      )}

      {currentPage === 'Listagem' && (
        <div className="columns is-centered">
          <div className="column is-half">
            <FilterTasks onFilter={handleFilter} />
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="box">
                  <div className="columns is-mobile">
                    <div className="column">
                      <h3 className="title is-5">{task.text}</h3>
                    </div>
                    <div className="column is-narrow">
                      {task.completed ? (
                        <p className="has-text-success">Tarefa concluída</p>
                      ) : (
                        <p className={new Date(task.taskDate) < new Date() ? "has-text-danger" : "has-text-warning"}>
                          {new Date(task.taskDate) < new Date() ? "Tarefa Pendente" : "Tarefa não concluída"}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="subtitle is-6">Adicionada em {task.addedDate}</p>
                  <div className="columns is-mobile">
                    <div className="column">
                      <p>Categoria: {task.category}</p>
                    </div>
                    <div className="column">
                      <p>Data Tarefa: {task.taskDate}</p>
                    </div>
                    <div className="column is-narrow ml-4 buttons">
                      <button className="button is-warning is-light is-small" onClick={() => handleEditTask(task.id)}>
                        Editar
                      </button>
                      <button className="button is-danger is-light is-small" onClick={() => handleDeleteTask(task.id)}>
                        Excluir
                      </button>
                      {!task.completed &&
                        <button className="button is-success is-light is-small" onClick={() => handleCompleteTask(task.id)}>
                          Concluir
                        </button>
                      }
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="has-text-centered">
                <p>Nenhuma tarefa encontrada com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {editingTask !== null && (
        <EditTaskModal
          task={tasks.find((task) => task.id === editingTask)}
          onSave={handleSaveEditedTask}
          onClose={handleCancelEdit}
        />
      )}

    </div>
  );
};

export default App;
