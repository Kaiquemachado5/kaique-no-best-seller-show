export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const addToCollection = (bookId, collectionName) => {
    // Add book to user collection
  };
  return (
    <CollectionContext.Provider value={{ collections, addToCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};
