import "./App.css";
import NavBar from "./components/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import Quotes from "./Containers/Quotes/Quotes.tsx";
import NewQuote from "./Containers/NewQuote/NewQuote.tsx";
import QuotesCategory from "./Containers/QuotesCategory/QuotesCategory.tsx";

const App = () => {

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main className="container mt-5">
        <Routes>
          <Route path="/" element={<Quotes/>}/>
          <Route path="/quotes" element={<Quotes/>}/>
          <Route path="/quotes/add-quote" element={<NewQuote />}/>
          <Route path="/quotes/:categoryId" element={<QuotesCategory />}/>
          <Route path="*" element={<h1>No found page</h1>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
