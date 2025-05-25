"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useSearch } from "@/context/SearchContext";
import { useDebounce } from '@/hooks/useDebounce';
import BooksSkeleton from '@/components/BooksSkeleton';
import BookCard from '@/components/BookCard';
import '@/styles/styles.css'; // Import the CSS file

const CategoriesMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const booksCollection = collection(db, "livros"); // Acessa a coleção correta
        const booksSnapshot = await getDocs(booksCollection);

        // Usa um Set para eliminar duplicatas
        const categorySet = new Set(
          booksSnapshot.docs.map((doc) => doc.data().category)
        );

        setCategories([...categorySet]); // Converte o Set de volta para array
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Carregando categorias...</div>;
  }

  return (
    <div className="categories-menu-container p-4">
      <ul className="flex space-x-4">
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/categoria/${category}`} className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesMenu;
