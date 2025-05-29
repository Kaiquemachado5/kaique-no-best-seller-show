document.addEventListener("DOMContentLoaded", function () {
    const genreFilter = document.getElementById("genreFilter");
    const tagsFilter = document.getElementById("tagsFilter");
    const resenhaList = document.getElementById("resenhaList");

    if (!genreFilter || !tagsFilter || !resenhaList) {
        console.error("Um ou mais elementos não foram encontrados no DOM.");
        return;
    }
    genreFilter.addEventListener("change", aplicarFiltros);
    tagsFilter.addEventListener("change", aplicarFiltros);

    function aplicarFiltros() {
        const selectedGenre = genreFilter.value.trim().toLowerCase();
        const selectedTag = tagsFilter.value.trim().toLowerCase();

        const livros = resenhaList.querySelectorAll("li");

        artigos.forEach(artigos => {
            const title = artigos.querySelector("a")?.textContent.trim().toLowerCase() || "";
            const genre = artigos.getAttribute("data-genre")?.trim().toLowerCase() || "";
            const tags = artigos.getAttribute("data-tags")?.trim().toLowerCase() || "";

            const matchesSearch = !searchTerm || title.includes(searchTerm);
            const matchesGenre = !selectedGenre || genre.includes(selectedGenre);
            const matchesTag = !selectedTag || tags.includes(selectedTag);

            livro.style.display = matchesSearch && matchesGenre && matchesTag ? 'block' : 'none';
        });
    }
});
