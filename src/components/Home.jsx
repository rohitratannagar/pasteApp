import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToPastes,
  updateToPastes
} from '../features/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchParams] = useSearchParams();

  const pastes = useSelector((state) => state.paste.value);
  const pasteId = searchParams?.get('pasteId');
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const foundPaste = pastes.find((p) => p._id === pasteId);
      setContent(foundPaste?.content || '');
      setTitle(foundPaste?.title || '');
    }
  }, [pasteId, pastes]);

  const createPaste = () => {
    const paste = {
      title,
      content,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString()
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setContent('');
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          {pasteId ? 'Edit Paste' : 'Create New Paste'}
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            placeholder="Write your paste here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
        </div>

        <div>
          <button
            onClick={createPaste}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors w-full shadow-md"
          >
            {pasteId ? 'Update Paste' : 'Add Paste'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
