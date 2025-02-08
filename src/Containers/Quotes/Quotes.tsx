import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { IQuote, IQuoteApi } from "../../types";
import Loader from "../../UI/Loader.tsx";
import { NavLink } from "react-router-dom";
import { categoriesArr } from "../../globalConstants.ts";

const Quotes = () => {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosApi<IQuoteApi>("quotes.json");
      setLoading(true);

      if (response.data) {
        const postsObject = response.data;
        const postsObjectKeys = Object.keys(postsObject);
        const postsArray = postsObjectKeys.map((key) => {
          return {
            id: key,
            ...postsObject[key],
          };
        });
        setQuotes(postsArray);
        console.log(postsArray);
        console.log(categoriesArr);
      } else {
        setQuotes([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  let content = null;
  if (loading) content = <Loader />;
  if (!loading) {
    if (quotes.length > 0) {
      content = (
        <>
          <ul>
            <li>
              <NavLink to="/quotes/all">All</NavLink>
            </li>
            {categoriesArr.map((quote) => (
              <li key={quote.id}>
                <NavLink to={`/quotes/${quote.id}`}>{quote.title}</NavLink>
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      content = <p>No posts yet</p>;
    }
  }

  return (
    <div className="row">
      <div>{content}</div>
    </div>
  );
};

export default Quotes;
