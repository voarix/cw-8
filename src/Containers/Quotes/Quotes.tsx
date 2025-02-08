import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { IQuote, IQuoteApi } from "../../types";
import Loader from "../../UI/Loader.tsx";
import { NavLink } from "react-router-dom";

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
        const postsArray = postsObjectKeys.map(key => {
          return {
            id: key,
            ...postsObject[key],
          };
        });
        setQuotes(postsArray);
        console.log(postsArray);
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
  if (loading) content = (<Loader/>);
  if (!loading) {
    if (quotes.length > 0) {
      content = (
        <>
          {quotes.map((quote) => (
            <div key={quote.id}>
              <li>
                <NavLink to={`quotes/${quote.category}`}>
                {quote.category}
                </NavLink>
              </li>
            </div>
          ))}
        </>
      );
    } else {
      content = (<p>No posts yet</p>);
    }
  }

  return (
    <div>
      <ul>
        {content}
      </ul>
    </div>
  );
};

export default Quotes;