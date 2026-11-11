const turma = [
  { nome: "Ana Souza", media: 8.5 },
  { nome: "Bruno Lima", media: 5.2 }
];

const tabela = document.querySelector("#tabela");
const quadro = document.querySelector("#quadro");
const vazio = document.querySelector("#vazio");
const form = document.querySelector("#form-aluno");
const aviso = document.querySelector("#aviso");

const busca = document.querySelector("#busca");

// QUANDO o usuário digitar no campo de busca (a cada letra)
busca.addEventListener("input", function () {
  // em minúsculas, para "ana" achar "Ana"
  const termo = busca.value.toLowerCase();

  // filter: só os alunos cujo nome tem o termo
  const achados = turma.filter(function (aluno) {
    return aluno.nome.toLowerCase().includes(termo);
  });

  // a tabela mostra só os achados
  mostrarTurma(achados);
  if (achados.length === 0) {
    vazio.textContent = "Nenhum aluno com \"" + busca.value + "\".";
  } else {
    vazio.textContent = "Nenhum aluno cadastrado.";
  }
});

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
    // clique duplo na linha: tira ESTE aluno da lista
    linha.addEventListener("dblclick", function () {
      const posicao = turma.indexOf(aluno); // em que posição ele está?
      turma.splice(posicao, 1);             // tira 1 item nessa posição
      aviso.classList.remove("erro");
      aviso.textContent = aluno.nome + " saiu da turma.";
      mostrarTurma(turma);
    });

    tabela.append(linha);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = form.nome.value.trim();
  const nota = Number(form.nota.value);

  form.nome.classList.remove("campo-erro");
  form.nota.classList.remove("campo-erro");
  aviso.classList.remove("erro");

  if (nome === "") {
    form.nome.classList.add("campo-erro");
    aviso.classList.add("erro");
    aviso.textContent = "Escreva o nome do aluno.";
    form.nome.focus();
    return;
  }

  if (form.nota.value === "" || nota < 0 || nota > 10) {
    form.nota.classList.add("campo-erro");
    aviso.classList.add("erro");
    aviso.textContent = "A nota tem que ser de 0 a 10.";
    form.nota.focus();
    return;
  }

  // 1. monta o objeto do aluno e coloca no fim da lista
  turma.push({ nome: nome, media: nota });

  // 2. desenha a tabela de novo, agora com o aluno novo
  mostrarTurma(turma);

  // 3. avisa, limpa o formulário e volta o cursor para o nome
  aviso.textContent = nome + " cadastrado(a)!";
  form.reset();
  form.nome.focus();
});

mostrarTurma(turma);
