// Elementos principais do carrinho
const btnContadorCarrinho = document.getElementById('btn-carrinho');
const carrinho = document.getElementById('carrinho-lateral');
const itensCarrinho = document.getElementById('itens-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const contadorQuantidade = document.getElementById('contador-quantidade');
const btnFinalizar = document.getElementById('btn-finalizar');
// Objeto que armazena os produtos adicionados ao carrinho
let carrinhoProdutos = {};
// Inicia contador oculto
contadorQuantidade.style.display = 'none';

// Função auxiliar para formatar valores para moeda brasileira
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Adiciona os eventos de clique nos botões de Adicionar ao carrinho
function configurarBotoesAdicionarCarrinho() {
    document.querySelectorAll('.botao-carrinho').forEach((botao, index) => {
        botao.addEventListener('click', () => {
            const produtoEl = botao.closest('.produto');
            const descricao = produtoEl.querySelector('.descricao').textContent.trim();
            const precoTexto = produtoEl.querySelector('.preco').textContent.trim();
            const preco = parseFloat(precoTexto.replace('R$', '').replace('.', '').replace(',', '.'));
            const imgEl = produtoEl.querySelector('img');
            const imgSrc = imgEl ? imgEl.src : '';
            if (carrinhoProdutos[index]) {
                carrinhoProdutos[index].quantidade++;
            } else {
                carrinhoProdutos[index] = {
                    descricao,
                    preco,
                    img: imgSrc,
                    quantidade: 1
                };
            }
            atualizarCarrinho();
            carrinho.classList.add('aberto');
        });
    });
}

// Atualiza a interface do carrinho lateral
function atualizarCarrinho() {
    itensCarrinho.innerHTML = '';
    let total = 0;
    let quantidadeTotal = 0;
    for (const id in carrinhoProdutos) {
        const item = carrinhoProdutos[id];
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        quantidadeTotal += item.quantidade;
        const divItem = document.createElement('div');
        divItem.classList.add('item-carrinho');
        divItem.innerHTML = `
            <img src="${item.img}" alt="${item.descricao}" />
            <div class="item-carrinho-info">
                <p class="descricao">${item.descricao}</p>
                <p class="preco">${formatarPreco(item.preco)} x <span class="quantidade">${item.quantidade}</span> = ${formatarPreco(subtotal)}</p>
                <div class="quantidade-container">
                    <button class="btn-quantidade" data-id="${id}" data-acao="diminuir">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-quantidade" data-id="${id}" data-acao="aumentar">+</button>
                </div>
            </div>
        `;
        itensCarrinho.appendChild(divItem);
    }
    totalCarrinho.textContent = `Total: ${formatarPreco(total)}`;
    contadorQuantidade.textContent = quantidadeTotal;
    contadorQuantidade.style.display = quantidadeTotal > 0 ? 'inline-block' : 'none';
    configurarBotoesQuantidade();
}

// Configura os eventos de alteração de quantidade de produtos no carrinho
function configurarBotoesQuantidade() {
    document.querySelectorAll('.btn-quantidade').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const acao = btn.getAttribute('data-acao');
            if (acao === 'aumentar') {
                carrinhoProdutos[id].quantidade++;
            } else {
                carrinhoProdutos[id].quantidade--;
                if (carrinhoProdutos[id].quantidade < 1) {
                    delete carrinhoProdutos[id];
                }
            }
            atualizarCarrinho();
        });
    });
}

// Alternar visibilidade do carrinho lateral
function configurarBotaoAbrirFecharCarrinho() {
    btnContadorCarrinho.addEventListener('click', () => {
        carrinho.classList.toggle('aberto');
    });
}

// Finalizar compra
function configurarBotaoFinalizarCompra() {
    btnFinalizar.addEventListener('click', () => {
        alert('Compra finalizada! Obrigado por personalizar sua mensagem.');
        // window.location.href = 'finalizar.html';
    });
}

// Função de inicialização do sistema de carrinho
function inicializarCarrinho() {
    configurarBotoesAdicionarCarrinho();
    configurarBotaoAbrirFecharCarrinho();
    configurarBotaoFinalizarCompra();
}

// Inicializa tudo
inicializarCarrinho();

// Carrossel
const carrossel = document.querySelector('.carrossel');
const imagens = document.querySelectorAll('.carrossel img');
const btnAnterior = document.querySelector('.seta-anterior');
const btnProximo = document.querySelector('.seta-proximo');
let indiceAtual = 0;

function atualizarCarrossel() {
    carrossel.style.transform = `translateX(-${indiceAtual * 100}%)`;
}

btnAnterior.addEventListener('click', () => {
    indiceAtual = (indiceAtual === 0) ? imagens.length - 1 : indice - 1;
    atualizarCarrossel();
});

btnProximo.addEventListener('click', () => {
    indiceAtual = (indiceAtual === imagens.length - 1) ? 0 : indiceAtual + 1;
    atualizarCarrossel();
});