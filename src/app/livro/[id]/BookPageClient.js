"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

const BookPageClient = ({ id }) => {
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id || typeof id !== 'string') {
        setError("Invalid Book ID");
        setLoading(false);
        return;
      }
      
      const safeId = encodeURIComponent(id);
      const docRef = doc(db, "livros", safeId);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLivro(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (err) {
        setError("Error getting document: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!livro) {
    return <p>Livro não encontrado.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{livro?.titulo || 'Título não disponível'}</h1>
      <div className="relative w-full h-64 mb-4">
        <Image 
          src={livro?.imagem || '/placeholder.jpg'}
          alt={livro?.titulo || 'Imagem não disponível'}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          unoptimized
        />
      </div>
      <p className="text-lg mb-4">{livro?.sinopse || 'Sinopse não disponível'}</p>
      <a 
        href={livro?.linkAmazon || '#'} 
        className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        Comprar na Amazon
      </a>
    </div>
  );
};

export default BookPageClient;
