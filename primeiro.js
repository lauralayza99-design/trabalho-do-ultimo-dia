/*Esse bloco serve para trocar as paginas de acordo com o Id de cada uma (linha 4 à 15)*/


function mostrarPagina(id) {
    const paginas = document.querySelectorAll(".pagina");
    const destino = document.getElementById(id);

    if (!destino) return;

    paginas.forEach(pagina => {
        pagina.classList.remove("ativa")
    });

    destino.classList.add("ativa");
}



/* Esse bloco faz os links do menu trocarem o conteudo que vai ser apresentado (linha 21 à 26)*/

document.querySelectorAll("[data-pagina]").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        mostrarPagina(this.dataset.pagina);
    });
});


/* Esse bloco serve para abrir e fechar o menu independente da pagina que estiver(linha 32 à 41*/


const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", function () {
    menu.classList.toggle("aberto");
});

document.getElementById("menu")
menu.classList.remove("aberto");


/*Esse bloco serve para que qualquer toque fora do menu faça ele se fechar imediatamente(linha 46 à 53)*/

document.addEventListener("click", function (event) {
    if (
        !menu.contains(event.target) &&
        !botaoMenu.contains(event.target)
    ) {
        fecharMenu();
    }
});
/*fechar o menu*/

function fecharMenu() {
    menu.classList.remove("aberto");
}


/*Se deslizar*/

document.addEventListener("scroll", function () {
    if (menu.classList.contains("aberto")) {
        fecharMenu()
    }
}, { passive: true });

/*se usar a roda do mouse*/

window.addEventListener("wheel", fecharMenu, { passive: true });

/*Esse bloco serve para fazer os botões de + - e zerar e também serve para o contador 0,00 linha (59 à 86)*/



/* CONTADOR + E - */

function alterar(botao, quantidade) {

    const contador = botao.closest(".contador");

    if (!contador) return;

    // Encontra o card ou hotel correspondente
    const item = contador.closest(
        ".card_5, .card_2, .card_2_2"
    );

    if (!item) return;

    const valor = contador.querySelector(".valor");

    if (!valor) return;

    // Atualiza a quantidade
    let numero = Number(valor.textContent);

    numero = Math.max(0, numero + quantidade);

    valor.textContent = numero;

    // Atualiza o total da página
    atualizarTotal(item.closest(".pagina"));
}


/* BOTÃO ZERAR */

function zerar(botao) {

    const contador = botao.closest(".contador");

    if (!contador) return;

    const item = contador.closest(
        ".card_5, .card_2, .card_2_2"
    );

    if (!item) return;

    const valor = contador.querySelector(".valor");

    if (!valor) return;

    valor.textContent = 0;

    atualizarTotal(item.closest(".pagina"));
}


/* CALCULAR TOTAL */

function atualizarTotal(pagina) {

    if (!pagina) return;

    let total = 0;

    // Busca todos os itens com preços na página
    const itens = pagina.querySelectorAll(
        ".card_5, .card_2, .card_2_2"
    );

    itens.forEach(item => {

        const preco = Number(item.dataset.price);

        const quantidade = Number(
            item.querySelector(".valor")?.textContent || 0
        );

        if (Number.isFinite(preco)) {

            total += preco * quantidade;

        }

    });

    // Atualiza todos os elementos de total da página
    pagina.querySelectorAll(".total").forEach(elemento => {

        elemento.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    });

}





/*esse bloco, da linha 112 ate a 124 serve para mudar o modo/cor das páginas, de claro para escuro ou escuro para o claro*/




const botaoModo = document.getElementById("modoClaro");

botaoModo.addEventListener("click", function () {
    document.body.classList.toggle("claro");


    if (document.body.classList.contains("claro")) {
        botaoModo.textContent = "Modo escuro🌙";
    } else {
        botaoModo.textContent = "Modo claro☀️ "
    }

});


/* esse bloco serve para abrir e fechar a barra de informações da pagina dos hotéis*/

function abrirBarra(botao) {
    const barra = botao.parentElement;
    barra.classList.toggle("aberta");
}