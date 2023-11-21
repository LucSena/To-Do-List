import React from 'react';

const FilterTasks = ({ onFilter }) => {
  return (
    <div className="columns">
      <div className="column is-half">
        <div className="field is-grouped">
          <div className="control is-expanded">
            <label className="label">Data da Tarefa</label>
            <input
              className="input"
              type="date"
              onChange={(e) => onFilter('date', e.target.value)}
            />
          </div>
          <div className="control is-expanded is-half">
            <label className="label">Status</label>
            <div className="select is-expanded">
              <select onChange={(e) => onFilter('status', e.target.value)}>
                <option value="Todos">Todos</option>
                <option value="Concluido">Concluído</option>
                <option value="Pendente">Pendente</option>
                <option value="NaoConcluido">Não Concluído</option>
              </select>
            </div>
          </div>
          <div className="control is-expanded is-half">
            <label className="label">Categoria</label>
            <div className="select is-expanded">
              <select onChange={(e) => onFilter('category', e.target.value)}>
                <option value="Todos">Todos</option>
                <option value="Geral">Geral</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Estudos">Estudos</option>
                <option value="Lazer">Lazer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTasks;
