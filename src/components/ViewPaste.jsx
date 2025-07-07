import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { pasteId } = useParams();
  const pastes = useSelector((state) => state.paste.value);
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    const found = pastes.find((p) => p._id === pasteId || p.id === pasteId);
    setPaste(found);
  }, [pasteId, pastes]);

  const handleCopy = () => {
    if (paste) {
      navigator.clipboard.writeText(paste.content);
      toast.success('Content copied to clipboard');
    }
  };

  if (!paste) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-gray-500">
        <h2 className="text-lg font-semibold">Paste not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold text-gray-800 mb-4">{paste.title}</h1>
      <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded border mb-4">
        {paste.content}
      </pre>
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
      >
        Copy
      </button>
    </div>
  );
};

export default ViewPaste;
