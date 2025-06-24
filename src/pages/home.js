import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-white to-blue-50 text-center px-4">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">
        Bem-vindo!
      </h1>
      <p className="text-xl text-gray-700 max-w-md">
        Este é o sistema de gerenciamento de buckets e arquivos na AWS. Explore os recursos disponíveis através do menu acima.
      </p>
    </div>
  );
};

export default Home;
