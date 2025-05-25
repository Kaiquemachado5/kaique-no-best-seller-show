import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar"; // Importa o componente de pesquisa
import CategoriesMenu from "../../components/CategoriesMenu"; // Importa o componente de categorias
import { SearchProvider } from "@/context/SearchContext"; // Importa o SearchProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Minha Biblioteca",
  description: "Galeria de livros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <SearchProvider>
          <Header />
          <div className="flex items-center justify-between p-6 bg-gray-800 text-white shadow-md">
            <div className="w-72 mr-8 border-r-2 border-gray-400">
              <CategoriesMenu />
            </div>
            <div className="w-full max-w-4xl flex justify-end">
              <SearchBar className="w-full max-w-xl p-3 bg-white border border-gray-300 rounded-full shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Procure um livro..." />
            </div>
          </div>
          {children}
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
