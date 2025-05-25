import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function generateStaticParams() {
  console.log("Database reference:", db); // Adicione este log
  if (!db) {
    throw new Error("Database not initialized");
  }
  const booksCollection = collection(db, "livros");
  const querySnapshot = await getDocs(booksCollection);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id
  }));
}