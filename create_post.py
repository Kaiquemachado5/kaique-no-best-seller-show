import os
from datetime import datetime

# Configurações do post
title = input("Digite o título do post: ")
categories = input("Digite as categorias do post (separadas por vírgula): ")
image_url = input("Digite a URL da imagem: ")

# Formatação do título para o nome do arquivo
filename_title = title.lower().replace(" ", "-")
date = datetime.now().strftime("%Y-%m-%d")
filename = f"{date}-{filename_title}.md"

# Conteúdo do post
content = f"""---
layout: post
title:  "{title}"
categories: {categories}
---

![Imagem]({image_url})

Escreva seu conteúdo aqui...
"""

# Caminho do arquivo
filepath = os.path.join("_posts", filename)

# Criação do arquivo
with open(filepath, "w", encoding="utf-8") as file:
    file.write(content)

print(f"Post criado com sucesso: {filepath}")