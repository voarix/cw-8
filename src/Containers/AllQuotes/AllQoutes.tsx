import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { IQuote, IQuoteApi } from "../../types";
import Loader from "../../UI/Loader.tsx";
import { NavLink } from "react-router-dom";
import { categoriesArr } from "../../globalConstants.ts";

const AllQoutes = () => {
  const [allQuotes, setAllQuotes] = useState<IQuote[]>([]);
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
        setAllQuotes(postsArray);
        console.log(postsArray);
      } else {
        setAllQuotes([]);
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
  if (loading) content = <Loader/>;
  if (!loading) {
    if (allQuotes.length > 0) {
      content = (
        <>
          <ul>
            <li>
              <NavLink to="/qoutes/all">All</NavLink>
            </li>
            {categoriesArr.map((quote) => (
              <li key={quote.id + quote.title}>
                <NavLink to={`/quotes/${quote.id}`}>
                  {quote.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      content = <p>No posts yet</p>;
    }
  }


  return (<>
      <div className="row">
        <div className="col-4">{content}</div>
        <div className="col-8">
          <h2>All</h2>
          <>
            {allQuotes.map((quote) => (
              <div key={quote.text + quote.id + quote.author}>
                <div className="card mt-4">
                  <div className="card-body">
                    <p className="fs-4">{quote.text}</p>
                    <p className="text-muted small">— {quote.author}</p>
                    <p className="fs-4">{quote.category}</p>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-primary ms-4">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
};

export default AllQoutes;