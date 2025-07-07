import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { removeFromPastes } from '../features/pasteSlice';
import { NavLink } from 'react-router-dom';
const highlightMatch = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-300 px-1 rounded">{part}</mark>
    ) : (
      part
    )
  );
};

// useEffect(()=>{

// },[handleDelete])
const Pastes = () => {
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.value);
  const [searchItem, setSearchItem] = useState('');

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  // const handleUpdate = (id) => {
  //   window.location.href = `/?pasteId=${id}`;
  // };

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id))
    console.log("Delete paste:", id);
  };

  const handleShare = (el) => {
    const url = `${window.location.origin}/?pasteId=${el._id}`;
    if (navigator.share) {
      navigator.share({
        title: el.title,
        text: el.content,
        url,
      });
    } else {
      alert(`Share this URL: ${url}`);
    }
  };

  const handleSearchValue = (e) => {
    setSearchItem(e.target.value);
  };

  

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Pastes</h2>
      
      <div className="w-full max-w-md mb-4 mx-auto">
        <input
          type="text"
          placeholder="Search pastes..."
          value={searchItem}
          onChange={handleSearchValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <ul className="space-y-4">
        {filteredData.map((el) => (
          <li
            key={el._id}
            className={`rounded-xl p-4 border flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center shadow-md ${
              searchItem ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {highlightMatch(el.title, searchItem)}
              </h3>
              <p className="text-gray-600 text-sm">{el.content}</p>
            </div>

            <div className="flex flex-col gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg"
                  >
                    <NavLink to = {`/pastes/${el._id}`}> View</NavLink>
                 
                </button>
                <button
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg"
                  onClick={() => handleUpdate(el._id)}
                >
                    <NavLink to = {`/?pasteId=${el._id}`}>Edit</NavLink> 
                </button>
                <button
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg"
                  onClick={() => handleDelete(el._id)}
                >
                  Delete
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg"
                  onClick={() => {
                    navigator.clipboard.writeText(el.content)
                    toast.success('Content copied to clipboard');
                  }}
                >
                  Copy
                </button>
                <button
                  className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg"
                  onClick={() => handleShare(el)}
                >
                  Share
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pastes;
