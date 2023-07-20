import React, { useState, useEffect } from "react";

const initialFormValues = {
  title: "",
  description: "",
};

const Todoform = ({ todoAdd, todoUpdate, todoEdit, setTodoEdit }) => {
  const [formValues, setformValues] = useState(initialFormValues);
  const { title, description } = formValues;
  const [error, setError] = useState(null);
  const [successMessages, setSuccessMessages] = useState(null);

  useEffect(() => {
    if (todoEdit) {
      setformValues(todoEdit);
    } else {
      setformValues(initialFormValues);
    }
  }, [todoEdit]);

  const handleInputChange = (e) => {
    const changedFormValues = {
      ...formValues,
      [e.target.name]: e.target.value,
    };

    setformValues(changedFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Debes indicar un titulo");
      return;
    }

    if (description.trim() === "") {
      setError("Debes indicar una descripcion");
      return;
    }

    if (todoEdit) {
      todoUpdate(formValues);
      setSuccessMessages("Actualizado con éxito");
    } else {
      todoAdd(formValues);
      setSuccessMessages("Agregado con éxito");
      setformValues(initialFormValues);
    }

    setTimeout(() => {
      setSuccessMessages(null);
    }, 2000);

    setError(null);
  };

  return (
    <div>
      <h2 className="text-center display-5">{todoEdit ? "Editar tarea" : "Nueva tarea"}</h2>

      {todoEdit && (
        <button
          onClick={() => setTodoEdit(null)}
          className="btn btn-sm btn-warning mb-2"
        >
          Cancelar edición
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titulo"
          className="form-control mb-2"
          value={title}
          name="title"
          onChange={handleInputChange}
        />

        <textarea
          placeholder="Descripción"
          className="form-control"
          value={description}
          name="description"
          onChange={handleInputChange}
        ></textarea>

        <button className="btn btn-primary btn-block mt-2">
          {todoEdit ? "Actualizar tarea" : "Agregar tarea"}
        </button>
      </form>
      {
        /* error
      ? (
        <div className='alert alert-danger mt-2'>
      {error}
    </div>
      ) :
      (
        null
      ) */
        error && <div className="alert alert-danger mt-2">{error}</div>
      }
      {successMessages && (
        <div className="alert alert-success mt-2">{successMessages}</div>
      )}
    </div>
  );
};

export default Todoform;
