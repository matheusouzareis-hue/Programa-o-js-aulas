// 1. pega o botão e o parágrafo
const botao = document.querySelector("#botao");
const contador = document.querySelector("#contador");

// 2. uma variável para contar os cliques
let cliques = 0;

// 3. fica de olho no botão: QUANDO alguém clicar, roda esta função
botao.addEventListener("click", function () {
  cliques = cliques + 1;
  contador.textContent = "Você clicou " + cliques + " vez(es).";
});

// repare: a função não roda agora, só quando o clique acontece
