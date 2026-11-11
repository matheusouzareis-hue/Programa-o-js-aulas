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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // trim() tira os espaços do começo e do fim
  const nome = form.nome.value.trim();
  // todo campo devolve TEXTO: Number() transforma em número
  const nota = Number(form.nota.value);

  // começa sem erro nenhum
  form.nome.classList.remove("campo-erro");
  form.nota.classList.remove("campo-erro");
  aviso.classList.remove("erro");

  // validação 1: o nome não pode ficar vazio
  if (nome === "") {
    form.nome.classList.add("campo-erro");
    aviso.classList.add("erro");
    aviso.textContent = "Escreva o nome do aluno.";
    form.nome.focus(); // o cursor volta para o campo
    return;            // para aqui: não cadastra
  }

  // validação 2: o nome precisa ter pelo menos 3 letras
  if (nome.length < 3) {
    form.nome.classList.add("campo-erro");
    aviso.classList.add("erro");
    aviso.textContent = "O nome precisa ter pelo menos 3 letras.";
    form.nome.focus();
    return;
  }

  // validação 2: a nota tem que estar entre 0 e 10
  if (form.nota.value === "" || nota < 0 || nota > 10) {
    form.nota.classList.add("campo-erro");
    aviso.classList.add("erro");
    aviso.textContent = "A nota tem que ser de 0 a 10.";
    form.nota.focus();
    return;
  }

  aviso.textContent = "Tudo certo: " + nome + ", nota " + nota;
});

mostrarTurma(turma);
