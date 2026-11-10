const turma = [
  { nome: "Ana Souza", media: 8.5 },
  { nome: "Bruno Lima", media: 5.2 }
];

const tabela = document.querySelector("#tabela");
const quadro = document.querySelector("#quadro");
const vazio = document.querySelector("#vazio");
const form = document.querySelector("#form-aluno");
const aviso = document.querySelector("#aviso");

// cria uma célula com o texto
function criarCelula(texto) {
  const celula = document.createElement("td");
  celula.textContent = texto;
  return celula;
}

// desenha a tabela inteira a partir da lista (a mesma da aula 11)
function mostrarTurma(lista) {
  if (lista.length === 0) {
    quadro.hidden = true;
    vazio.hidden = false;
    return;
  }

  quadro.hidden = false;
  vazio.hidden = true;
  tabela.textContent = "";

  for (const aluno of lista) {
    let situacao = "reprovado";
    if (aluno.media >= 6) {
      situacao = "aprovado";
    }

    const linha = document.createElement("tr");
    linha.classList.add(situacao);
    linha.append(
      criarCelula(aluno.nome),
      criarCelula(aluno.media.toFixed(1)),
      criarCelula(situacao)
    );
    tabela.append(linha);
  }
}

// QUANDO o formulário for enviado (clique no botão OU Enter num campo)
form.addEventListener("submit", function (event) {
  // 1. não deixa o navegador recarregar a página
  event.preventDefault();

  // 2. lê o que foi digitado: form.nome é o campo com name="nome"
  const nome = form.nome.value;
  const nota = form.nota.value;

  // 3. por enquanto, só mostra o que chegou
  aviso.textContent = "Recebi: " + nome + ", nota " + nota;
});

mostrarTurma(turma);
