import React, { useCallback, useEffect, useState } from "react";
import { IQuoteForm } from "../types";
import { useNavigate } from "react-router-dom";
import axiosApi from "../axiosApi.ts";
import Loader from "../UI/Loader.tsx";

interface Props {
  isEdit?: boolean;
  idQuote?: string;
  onSubmitAdd: (quote: IQuoteForm) => void;
}

const initialForm = {
  category: "",
  author: "",
  text: "",
};

const QuoteForm: React.FC<Props> = ({
  isEdit = false,
  onSubmitAdd,
  idQuote,
}) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOnePost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi(`posts/${idQuote}.json`);

      if (!response.data) {
        navigate("/");
        return;
      }
      setForm(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [idQuote, navigate]);

  useEffect(() => {
    if (isEdit) {
      void fetchOnePost();
    }
  }, [fetchOnePost, isEdit]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAdd(form);
    setForm(initialForm);
  };

  const onChangeInputMessage = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="mb-4">{isEdit ? "Edit" : "Add new"} post</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="category">
                    Category
                  </label>
                  <select
                    className="form-control"
                    required
                    name="category"
                    id="category"
                    value={form.category}
                    onChange={onChangeInputMessage}
                  >
                    <option value="" disabled>
                      Choose category
                    </option>
                    <option value="star-wars">Star Wars</option>
                    <option value="famous-people">Famous People</option>
                    <option value="saying">Saying</option>
                    <option value="humor">Humor</option>
                    <option value="motivational">Motivational</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="author">
                    Author
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="author"
                    id="author"
                    value={form.author}
                    onChange={onChangeInputMessage}
                  />
                </div>
                <label htmlFor="text">Description</label>
                <textarea
                  className="form-control mt-2"
                  rows={5}
                  required
                  value={form.text}
                  name="text"
                  id="text"
                  onChange={onChangeInputMessage}
                ></textarea>
                <button type="submit" className="btn btn-primary mt-3">
                  {isEdit ? "Edit" : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuoteForm;
