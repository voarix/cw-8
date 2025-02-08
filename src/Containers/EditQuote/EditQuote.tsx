import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import { IQuoteForm } from "../../types";
import QuoteForm from "../../components/QuoteForm.tsx";
import Loader from "../../UI/Loader.tsx";

const EditQuote = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {idQuote} = useParams();

  const onSubmitAddNewPost = async (quote: IQuoteForm) => {
    try {
      setLoading(true);
      await axiosApi.put(`quotes/${idQuote}.json`, quote);
      navigate('/quotes/' + quote.category);
      console.log(quote);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  let form = (<QuoteForm onSubmitAdd={onSubmitAddNewPost} isEdit idQuote={idQuote} />);

  if (loading) form = <Loader />;

  return (
    <div>
      {form}
    </div>
  );
};

export default EditQuote;