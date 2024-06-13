import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [addedBooks, setAddedBooks] = useState(() => {
    return JSON.parse(localStorage.getItem("addedBooks")) || [];
  });
  const [debouncedValue] = useDebounce(inputValue, 1000);

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const addBook = (title, edition_count) => {
    const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
    const newBook = { title, edition_count };
    const updatedBooks = [...existingBooks, newBook];

    localStorage.setItem("books", JSON.stringify(updatedBooks));
    const updatedAddedBooks = [...addedBooks, title];
    setAddedBooks(updatedAddedBooks);
    localStorage.setItem("addedBooks", JSON.stringify(updatedAddedBooks));
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      if (debouncedValue) params.set("search", debouncedValue);
      else params.delete("search");
      navigate({ search: params.toString() });
      if (debouncedValue) {
        try {
          setLoading(true);
          const data = await fetch(
            `https://openlibrary.org/search.json?q=${debouncedValue}&limit=10&page=1`
          );
          const fetchedData = await data.json();
          setBooks(fetchedData.docs);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <main className='flex md:mx-20 mx-9'>
      <div className=' w-10/12 mt-10 flex flex-col justify-center'>
        <div className='flex flex-col items-center gap-5'>
          <h1 className='text-2xl font-bold'>Search by book name</h1>
          <input
            className=' p-2 w-[250px]  rounded-lg border border-black'
            placeholder='Enter Book Name'
            onChange={handleInputChange}
          />
        </div>
        <div className='mt-10 flex justify-center flex-wrap gap-5'>
          {loading ? (
            <>Loading...</>
          ) : (
            <>
              {books.map((item, index) => (
                <div
                  key={index}
                  className='h-[250px] w-[250px] flex flex-col justify-between rounded-xl p-3 border border-black '>
                  <div className='flex flex-col gap-2'>
                    <div className='text-center'>
                      <div className='font-bold '>Book Title</div>
                      <div className=''>{item.title}</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-bold'>Edition Count</div>
                      <div>{item.edition_count}</div>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <button
                      className='bg-green-500 rounded-xl text-white h-10 px-5'
                      onClick={() => addBook(item.title, item.edition_count)}
                      disabled={addedBooks.includes(item.title)}>
                      {addedBooks.includes(item.title)
                        ? "Added"
                        : "Add to Bookshelf"}
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className='flex justify-center mt-10  w-2/12'>
        <Link to={"/myshelf"}>
          <button className='bg-green-500 rounded-xl text-white h-12 md:h-11  px-5'>
            My Bookshelf
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
