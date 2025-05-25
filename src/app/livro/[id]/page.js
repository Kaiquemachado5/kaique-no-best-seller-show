import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import BookPageClient from "./BookPageClient";

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

const BookPage = ({ params }) => {
  const { id } = params;
  if (!id) {
    return <div>Error: No ID provided</div>;
  }
  return <BookPageClient id={id} />;
};

export default BookPage;
