import Image from 'next/image';
import Link from 'next/link';

const BookCard = ({ book }) => {
  const { titulo, imagem, category, id } = book;

  return (
    <Link href={`/livro/${id}`}>
      <div className="group relative flex flex-col space-y-4 p-8 w-80 h-auto rounded-lg hover:bg-gray-50 transition-all duration-300">
        <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-md">
          <Image 
            src={imagem}
            alt={titulo}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-2xl text-gray-900">{titulo}</h3>
          <span className="text-lg text-gray-500">{category}</span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
