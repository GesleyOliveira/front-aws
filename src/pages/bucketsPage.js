import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BucketsPage = () => {
  const [buckets, setBuckets] = useState([]);
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [bucketObjects, setBucketObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const fetchBuckets = async () => {
    try {
      const response = await api.get('/buckets');
      setBuckets(response.data);
      setLoading(false);
    } catch {
      setError('Erro ao carregar buckets');
      setLoading(false);
    }
  };

  const fetchBucketObjects = async (bucketName) => {
    try {
      const response = await api.get(`/buckets/${bucketName}`);
      setBucketObjects(response.data);
      setSelectedBucket(bucketName);
    } catch {
      setError('Erro ao carregar objetos do bucket');
    }
  };

  useEffect(() => {
    fetchBuckets();
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Selecione um arquivo para upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/buckets/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFile(null);
      if (selectedBucket) {
        fetchBucketObjects(selectedBucket);
      }
    } catch {
      setError('Erro ao fazer upload do arquivo');
    }
  };

  const handleDelete = async (fileName) => {
    if (window.confirm('Tem certeza que deseja deletar este arquivo?')) {
      try {
        await api.delete(`/buckets/file/${fileName}`);
        if (selectedBucket) {
          fetchBucketObjects(selectedBucket);
        }
      } catch {
        setError('Erro ao deletar arquivo');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Upload */}
      <form
        onSubmit={handleFileUpload}
        className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload de Arquivo</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 text-sm text-gray-600"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md"
          >
            Upload
          </button>
        </div>
      </form>

      {/* Buckets */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Buckets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {buckets.map((bucket) => (
            <div
              key={bucket.Name}
              onClick={() => fetchBucketObjects(bucket.Name)}
              className={`p-4 rounded-xl border shadow-sm cursor-pointer transition-all ${
                selectedBucket === bucket.Name
                  ? 'bg-blue-50 border-blue-400'
                  : 'bg-white hover:bg-gray-50 border-gray-200'
              }`}
            >
              <h3 className="font-semibold text-gray-800">{bucket.Name}</h3>
              <p className="text-sm text-gray-500">
                Criado em: {new Date(bucket.CreationDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Objetos */}
      {selectedBucket && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Arquivos em: <span className="text-blue-700">{selectedBucket}</span>
          </h2>
          <table className="w-full table-auto bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="text-left px-4 py-3">Nome</th>
                <th className="text-left px-4 py-3">Tamanho</th>
                <th className="text-left px-4 py-3">Última Modificação</th>
                <th className="text-left px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {bucketObjects.map((object) => (
                <tr
                  key={object.Key}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{object.Key}</td>
                  <td className="px-4 py-2">{(object.Size / 1024).toFixed(2)} KB</td>
                  <td className="px-4 py-2">
                    {new Date(object.LastModified).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(object.Key)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BucketsPage;
