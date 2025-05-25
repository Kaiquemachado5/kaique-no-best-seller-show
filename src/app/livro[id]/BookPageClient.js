// Remove these lines
const [expanded, setExpanded] = useState(false);

// Replace the content div with this simpler version
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
  <div className="mt-4">
    <p className="text-lg mb-4">{livro?.conteudoCompleto || 'Conteúdo não disponível'}</p>
  </div>
</div>
