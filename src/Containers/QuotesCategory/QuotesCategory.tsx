import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import { IQuote } from "../../types";
import Loader from "../../UI/Loader.tsx";
import Quotes from "../Quotes/Quotes.tsx";
import { categoriesArr } from "../../globalConstants.ts";

const QuotesCategory = () => {
  const [quotesCategory, setQuotesCategory] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const {categoryId} = useParams();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi(
        `/quotes.json?orderBy="category"&equalTo="${categoryId}"`,
      );
      if (response.data) {
        const categoryObj = response.data;
        const categoryObjKeys = Object.keys(categoryObj);
        const categoryArray = categoryObjKeys.map((key) => {
          return {
            id: key,
            ...categoryObj[key],
          };
        });
        setQuotesCategory(categoryArray);
        console.log(categoryArray);
      } else {
        setQuotesCategory([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  let content = null;
  if (loading) content = <Loader/>;
  if (!loading) {
    if (quotesCategory.length > 0) {
      content = (
        <>
          {quotesCategory.map((quoteCategory) => (
            <div key={quoteCategory.text}>
              <div className="card mt-4">
                <div className="card-body">
                  <p className="fs-4">{quoteCategory.text}</p>
                  <p className='text-muted small'>— {quoteCategory.author}</p>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-primary ms-4">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    } else {
      content = <p>No quotes found for this category.</p>;
    }
  }

  const categoryNameArr = categoriesArr.filter((category) => category.id === categoryId);

  return (
    <>
      <div className='row'>
        <div className="col-3">
          <Quotes/>
        </div>
        <div className='col-8'>
          <h1>{categoryNameArr[0].title}</h1>
          <hr/>
          {content}
        </div>
      </div>
    </>
  );
};

export default QuotesCategory;
