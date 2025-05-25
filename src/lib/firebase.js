"use client";

import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useSearch } from "@/context/SearchContext";
import { useDebounce } from '@/hooks/useDebounce';
import BooksSkeleton from '@/components/BooksSkeleton';
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdeSDwE0y3HtdB9p5K8S3gMpNV92o01tk",
  authDomain: "biblioteca-kbbs.firebaseapp.com",
  projectId: "biblioteca-kbbs",
  storageBucket: "biblioteca-kbbs.firebasestorage.app",
  messagingSenderId: "1071569557827",
  appId: "1:1071569557827:web:d3ffde9327e6e7cf0ff7f6",
  measurementId: "G-S6FGNCE5P3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

console.log("Firestore DB initialized:", db); // Adicione este log

export { db };

const BookCard = ({ book }) => {
  return (
    <div className="relative border rounded-lg bg-white p-6 transition-all duration-300">
      <h2 className="text-xl font-semibold text-black mb-2">{book.titulo}</h2>
      <div className="relative w-full h-48">
        <Image 
          src={book.imagem}
          alt={book.titulo}
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-md"
        />
      </div>
      <p className="text-black mb-4">{book.sinopse}</p>
      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
        {book.category}
      </span>
    </div>
  );
};

export default function Page() {
  const { searchTerm } = useSearch();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const livrosCollection = collection(db, "livros");
        const querySnapshot = await getDocs(livrosCollection);
        
        const validateBook = (book) => ({
          id: book.id || '',
          titulo: book.titulo || 'Untitled',
          imagem: book.imagem || '/placeholder.jpg',
          sinopse: book.sinopse || 'No description available',
          category: book.category || 'Uncategorized',
          linkAmazon: book.linkAmazon || '#',
        });

        const livrosList = querySnapshot.docs.map(doc => validateBook({
          id: doc.id,
          ...doc.data()
        }));

        console.log('Total books loaded:', livrosList.length);
        setLivros(livrosList);
        
      } catch (e) {
        console.error("Erro ao buscar livros:", e);
        setError("Não foi possível carregar os livros");
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);
  const filteredBooks = useMemo(() => 
    livros.filter(book => 
      book.titulo.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ),
    [livros, debouncedSearchTerm]
  );

  if (loading) {
    return <BooksSkeleton count={6} />;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-32 bg-gray-50">
      <h1 className="text-3xl font-bold text-black mb-6">Galeria de Livros</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-xl">
        {filteredBooks.map((livro) => (
          <BookCard key={livro.id} book={livro} />
        ))}
      </div>
    </div>
  );
}
