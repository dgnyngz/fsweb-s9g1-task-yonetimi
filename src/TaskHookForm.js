import { nanoid } from "nanoid";

import { useForm } from "react-hook-form";
import { notify } from "./App";

const TaskHookForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // form datası her güncellendiğinde valid mi diye kontrol et

  // checkboxların değişimini state içerisine eklemek için özel fonksiyon

  // task ekleme
  function myhandleSubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
    notify("Task eklendi");
  }

  return (
    <form className="taskHookForm" onSubmit={handleSubmit(myhandleSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", { required: "Task başlığı yazmalısın" })}
          type="text"
        />{" "}
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                {...register("people", {
                  required: "Lütfen en az 1 kişi seçin",
                  validate: {
                    maxLimit: (kisiler) =>
                      kisiler.length <= 3 || " En Fazla 3 kişi seçebilirsin",
                  },
                })}
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people.message}</p>
        )}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit">
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskHookForm;
