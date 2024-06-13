import { useState } from "react";
import { Link } from "react-router-dom";

const PersonalBookshelf = () => {
  const [myBooks, setMyBooks] = useState(() => {
    return JSON.parse(localStorage.getItem("books")) || [];
  });
  return (
    <main className='flex flex-col items-center justify-center mt-10 md:mx-20 mx-3'>
      <div className='flex flex-col items-center gap-5'>
        <h1 className='text-2xl font-bold'>My BookShelf</h1>
        <Link to={"/"}>
          <button className='bg-green-500 rounded-xl text-white h-10  px-5'>
            Home
          </button>
        </Link>
      </div>
      <div className='flex flex-wrap justify-center gap-5 mt-10'>
        {myBooks.length > 1 ? (
          <>
            {myBooks.map((item, index) => (
              <div
                key={index}
                className=' w-[250px] flex  flex-col justify-between rounded-xl p-3 border border-black '>
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
              </div>
            ))}
          </>
        ) : (
          <> Books Not Added Yet </>
        )}
      </div>
    </main>
  );
};

export default PersonalBookshelf;
