---
layout: default
title: 
permalink: /resenhas/
---

<h1 class="page-title">📚 Resenhas de Livros</h1>

## Filtros

<div class="filter-container">
    <div class="filter-group">
        <label for="genreFilter">Gênero</label>
        <select id="genreFilter" aria-label="Filtrar por gênero">
            <option value="">Selecione um gênero</option>
            <option value="fantasia">Fantasia</option>
            <option value="romance">Romance</option>
        </select>
    </div>

    <div class="filter-group">
        <label for="tagsFilter">Tags</label>
        <select id="tagsFilter" aria-label="Filtrar por tag">
            <option value="">Selecione uma tag</option>
            <option value="magia">Magia</option>
            <option value="épico">Épico</option>
        </select>
    </div>

    <div class="filter-group">
        <label for="searchInput">Pesquisa</label>
        <input type="text" id="searchInput" placeholder="Pesquisar por título..." aria-label="Pesquisar resenhas de livros" />
    </div>
</div>

<hr class="divider" />

<ul id="resenhaList">
    {% assign artigos_ordenados = site.artigos | sort: "date" %}
    {% for artigo in artigos_ordenados %}
        <li data-genre="{{ artigo.genre | downcase }}" data-tags="{{ artigo.tags | join: ',' | downcase }}">
            <a href="{{ artigo.url | prepend: site.baseurl }}">{{ artigo.title }}</a>
            <p>Autor: {{ artigo.author }} | Avaliação: {{ artigo.rating }} estrelas</p>
        </li>
    {% endfor %}
</ul>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const genreFilter = document.getElementById("genreFilter");
    const tagsFilter = document.getElementById("tagsFilter");
    const resenhaList = document.getElementById("resenhaList");
    const searchInput = document.getElementById("searchInput");

    if (!genreFilter || !tagsFilter || !resenhaList) {
        console.error("Um ou mais elementos não foram encontrados no DOM.");
        return;
    }

    genreFilter.addEventListener("change", aplicarFiltros);
    tagsFilter.addEventListener("change", aplicarFiltros);
    searchInput.addEventListener("input", aplicarFiltros);

    function aplicarFiltros() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedGenre = genreFilter.value.trim().toLowerCase();
        const selectedTag = tagsFilter.value.trim().toLowerCase();

        const livros = resenhaList.querySelectorAll("li");

        livros.forEach(livro => {
            const title = livro.querySelector("a")?.textContent.trim().toLowerCase() || "";
            const genre = livro.getAttribute("data-genre")?.trim().toLowerCase() || "";
            const tags = livro.getAttribute("data-tags")?.trim().toLowerCase() || "";

            const matchesSearch = !searchTerm || title.includes(searchTerm);
            const matchesGenre = !selectedGenre || genre.includes(selectedGenre);
            const matchesTag = !selectedTag || tags.includes(selectedTag);

            livro.style.display = matchesSearch && matchesGenre && matchesTag ? 'block' : 'none';
        });
    }
});
</script>

<style>
    .page-title {
        font-size: 2.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
        color: #333;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 3px solid #007bff;
        display: inline-block;
        padding-bottom: 8px;
    }

    .filter-container {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 20px;
        background-color: #f4f4f4;
        padding: 16px;
        border-radius: 8px;
    }

    .filter-group {
        flex: 1;
        min-width: 200px;
    }

    label {
        display: block;
        margin-bottom: 6px;
        font-weight: bold;
    }

    select, input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
    }

    .divider {
        border: 1px solid #ddd;
        margin: 20px 0;
    }

    #resenhaList {
        list-style-type: none;
        padding-left: 0;
        background-color: #f9f9f9;
        padding: 16px;
        border-radius: 8px;
    }

    #resenhaList li {
        padding: 12px;
        margin-bottom: 10px;
        background-color: #ffffff;
        border-radius: 6px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    #resenhaList li a {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
        text-decoration: none;
    }

    #resenhaList li a:hover {
        color: #007bff;
    }

    #resenhaList li p {
        font-size: 0.9rem;
        color: #666;
        margin-top: 5px;
    }
</style>
