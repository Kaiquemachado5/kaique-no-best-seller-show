import Image from "next/image";

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
     
      <div className="mt-4">
        <p className="text-black mb-4">{book.sinopse}</p>
      </div>
      
      <div className="space-y-4 mt-4">
        <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
          {book.category}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
