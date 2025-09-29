const produtos = [
  { id: 1, nome: "Bolo de pote - 1un", preco: 12.90, img: "img/mouse.png"  },
  { id: 2, nome: "Brownie Recheado - 1un", preco: 9.90, img: "img/brownie.png" },
  { id: 3, nome: "Brigadeiros Gourmet - 6un", preco: 19.90, img: "img/brigadeiro.jpg" },
  { id: 4, nome: "Morango do Amor", preco: 9.90, img: "img/morango do amor.png" }
];

let carrinho = [];

// Funções de notificação
function mostrarNotificacao(mensagem) {
  const noti = document.getElementById("notificacao");
  noti.innerHTML = `${mensagem} <button onclick="fecharNotificacao()">X</button>`;
  noti.style.display = "block";

  setTimeout(() => {
    noti.style.display = "none";
  }, 3000);
}

function fecharNotificacao() {
  document.getElementById("notificacao").style.display = "none";
}

// Renderiza produtos
function renderProdutos(lista = produtos) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";
  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p class="preco">R$ ${p.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${p.id})">Adicionar ao Carrinho</button>
    `;
    container.appendChild(card);
  });
}

// Adiciona ao carrinho
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const item = carrinho.find(i => i.id === id);
  
  if (item) {
    item.qtd++;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }

  atualizarCarrinho();
  mostrarNotificacao(`✅ ${produto.nome} adicionado ao carrinho!`);
}

// Atualiza carrinho
function atualizarCarrinho() {
  const itemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  const countElement = document.getElementById("cart-count");

  itemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  carrinho.forEach(item => {
    total += item.preco * item.qtd;
    count += item.qtd;
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.nome} - ${item.qtd}x (R$ ${(item.preco * item.qtd).toFixed(2)})
      <button onclick="removerDoCarrinho(${item.id})">❌</button>
    `;
    itemsContainer.appendChild(div);
  });

  totalElement.textContent = `R$ ${total.toFixed(2)}`;
  countElement.textContent = count;
}

// Remove item do carrinho
function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

// Abrir/fechar carrinho
document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("carrinho").classList.add("open");
});
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("carrinho").classList.remove("open");
});

// Finalizar compra
document.getElementById("checkout").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
  } else {
    alert("Compra finalizada! Obrigado ❤️");
    carrinho = [];
    atualizarCarrinho();
    document.getElementById("carrinho").classList.remove("open");
  }
});

// Limpar carrinho
document.getElementById("limpar-carrinho").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("O carrinho já está vazio!");
  } else {
    carrinho = [];
    atualizarCarrinho();
    mostrarNotificacao("🗑 Carrinho limpo com sucesso!");
  }
});

// Busca produtos
document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  if (!q) renderProdutos();
  else renderProdutos(produtos.filter(p => p.nome.toLowerCase().includes(q)));
});

// Scroll suave
function scrollToProducts() {
  document.querySelector("main").scrollIntoView({ behavior: "smooth" });
}

// Render inicial
renderProdutos();
