import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PersonalBookshelf from "./components/PersonalBookshelf";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/myshelf' element={<PersonalBookshelf />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
