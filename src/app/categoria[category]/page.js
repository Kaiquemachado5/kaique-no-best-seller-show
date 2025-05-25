"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BookCard from '@/components/BookCard';

export default function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!decodedCategory) return;
    
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, "livros");
        const q = query(booksCollection, where("category", "==", decodedCategory));
        const querySnapshot = await getDocs(q);
        const livrosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {decodedCategory}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {livros.map((livro) => (
            <BookCard key={livro.id} book={livro} />
          ))}
        </div>
      </div>
    </div>
  );
}

<div className="bg-white p-6 transition-all duration-300 rounded-lg border-none">
  {/* ... book information ... */}
</div>
