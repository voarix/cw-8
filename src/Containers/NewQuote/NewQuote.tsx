import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import QuoteForm from "../../components/QuoteForm.tsx";
import Loader from "../../UI/Loader.tsx";
import { IQuoteForm } from "../../types";

const NewQuote = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitAddNewPost = async (quote: IQuoteForm) => {
    try {
      setLoading(true);
      await axiosApi.post("quotes.json", quote);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  let form = <QuoteForm onSubmitAdd={onSubmitAddNewPost} />;

  if (loading) form = <Loader />;

  return <div>{form}</div>;
};

export default NewQuote;
