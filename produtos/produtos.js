const API_URL = 'https://684f4ab7f0c9c9848d2a9979.mockapi.io/produtos';
const formPesquisa = document.getElementById('form-pesquisa');
const termoPesquisa = document.getElementById('termo-pesquisa');
const categoriasDiv = document.getElementById('categorias');
const loading = document.getElementById('loading');

// Carregar e exibir produtos por categoria
async function carregarProdutos() {
  try {
    loading.style.display = 'block';
    categoriasDiv.innerHTML = '';
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao carregar dados da API');
    const produtos = await response.json();

    const categorias = ['Jogo', 'HQ', 'Mangá', 'Jogo de Tabuleiro', 'Action Figure'];

    categorias.forEach(categoria => {
      const produtosCategoria = produtos.filter(p => p.categoria === categoria);
      if (produtosCategoria.length > 0) {
        const secao = document.createElement('div');
        secao.className = 'categoria-secao';
        secao.innerHTML = `<h2>${categoria}</h2><div class="lista-produtos"></div>`;
        const lista = secao.querySelector('.lista-produtos');

        produtosCategoria.forEach(produto => {
          const div = document.createElement('div');
          div.className = 'item';
          let conteudo = `
            <img src="${produto.imagem || 'https://via.placeholder.com/150?text=Sem+Imagem'}" alt="${produto.nome}">
            <div class="conteudo">
              <h3>${produto.nome}</h3>
              <div class="detalhes">
                <p>Preço: R$${produto.preco.toFixed(2)}</p>
          `;
          if (produto.estoque) conteudo += `<p>Estoque: ${produto.estoque}</p>`;
          if (produto.plataformas) conteudo += `<p>Plataformas: ${produto.plataformas}</p>`;
          if (produto.lancamento) conteudo += `<p>Lançamento: ${produto.lancamento}</p>`;
          conteudo += `</div><div class="controles"><div class="comprar"><button>Comprar</button></div></div></div>`;
          div.innerHTML = conteudo;
          lista.appendChild(div);
        });
        categoriasDiv.appendChild(secao);
      }
    });
  } catch (error) {
    console.error('Erro:', error);
    categoriasDiv.innerHTML = '<p>Erro ao carregar produtos. Tente novamente.</p>';
  } finally {
    loading.style.display = 'none';
  }
}

// Filtrar produtos por termo de pesquisa
async function filtrarProdutos(termo) {
  try {
    loading.style.display = 'block';
    categoriasDiv.innerHTML = '';
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao carregar dados da API');
    const produtos = await response.json();
    const resultados = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo.toLowerCase())
    );

    if (resultados.length === 0) {
      categoriasDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
      return;
    }

    const categorias = ['Jogo', 'HQ', 'Mangá', 'Jogo de Tabuleiro', 'Action Figure'];

    categorias.forEach(categoria => {
      const produtosCategoria = resultados.filter(p => p.categoria === categoria);
      if (produtosCategoria.length > 0) {
        const secao = document.createElement('div');
        secao.className = 'categoria-secao';
        secao.innerHTML = `<h2>${categoria}</h2><div class="lista-produtos"></div>`;
        const lista = secao.querySelector('.lista-produtos');

        produtosCategoria.forEach(produto => {
          const div = document.createElement('div');
          div.className = 'item';
          let conteudo = `
            <img src="${produto.imagem || 'https://via.placeholder.com/150?text=Sem+Imagem'}" alt="${produto.nome}">
            <div class="conteudo">
              <h3>${produto.nome}</h3>
              <div class="detalhes">
                <p>Preço: R$${produto.preco.toFixed(2)}</p>
          `;
          if (produto.estoque) conteudo += `<p>Estoque: ${produto.estoque}</p>`;
          if (produto.plataformas) conteudo += `<p>Plataformas: ${produto.plataformas}</p>`;
          if (produto.lancamento) conteudo += `<p>Lançamento: ${produto.lancamento}</p>`;
          conteudo += `</div><div class="controles"><div class="comprar"><button>Comprar</button></div></div></div>`;
          div.innerHTML = conteudo;
          lista.appendChild(div);
        });
        categoriasDiv.appendChild(secao);
      }
    });
  } catch (error) {
    console.error('Erro:', error);
    categoriasDiv.innerHTML = '<p>Erro ao carregar produtos. Tente novamente.</p>';
  } finally {
    loading.style.display = 'none';
  }
}

// Evento de submissão do formulário
formPesquisa.addEventListener('submit', (e) => {
  e.preventDefault();
  const termo = termoPesquisa.value.trim();
  if (termo) {
    filtrarProdutos(termo);
  } else {
    carregarProdutos();
  }
});

// Carregar produtos ao iniciar
carregarProdutos();