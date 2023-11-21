import React, { useState } from 'react';

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [editedText, setEditedText] = useState(task.text);
  const [editedCategory, setEditedCategory] = useState(task.category);
  const [editedDate, setEditedDate] = useState(task.taskDate);

  const handleSave = () => {
    onSave({
      ...task,
      text: editedText,
      category: editedCategory,
      taskDate: editedDate,
    });
    onClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Editar Tarefa</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Texto da Tarefa</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Categoria</label>
            <div className="control">
              <div className="select">
                <select
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                >
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
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSave}>
            Salvar
          </button>
          <button className="button" onClick={onClose}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditTaskModal;
