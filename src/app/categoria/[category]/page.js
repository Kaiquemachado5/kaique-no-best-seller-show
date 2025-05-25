"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BookCard from '@/components/BookCard';
import Image from 'next/image';

export default function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  console.log("Category obtida:", decodedCategory);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!decodedCategory) {
      console.log("Category ainda não definida.");
      return;
    }
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, "livros");
        const q = query(booksCollection, where("category", "==", decodedCategory));
        const querySnapshot = await getDocs(q);
        const livrosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Livros retornados:", livrosData);
        setLivros(livrosData);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [decodedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-gray-600">Carregando livros...</div>
      </div>
    );
  }
  if (livros.length === 0) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        Nenhum livro encontrado para a categoria: {decodedCategory}
      </p>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Livros na categoria: {decodedCategory}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
        {livros.map((livro) => (
          <li key={livro.id} className="relative">
            <div className="border rounded-lg bg-white p-6 transition-all duration-300">
              <h2 className="text-xl font-semibold text-black mb-2">{livro.titulo}</h2>
              <div className="relative w-full h-48">
                <Image 
                  src={livro.imagem}
                  alt={livro.titulo}
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-md"
                />
              </div>
              
              <div className="mt-4">
                <p className="text-black mb-4">{livro.sinopse}</p>
              </div>

              <div className="space-y-4 mt-4">
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {livro.category}
                </span>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
