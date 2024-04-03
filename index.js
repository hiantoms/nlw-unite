let participantes = [
    {
        nome: "José Silva",
        email: "jose@gmail.com",
        dataInscricao: new Date(2024, 2, 1, 19, 23),
        dataCheckIn: new Date(2024, 2, 1, 19, 23)
    },
    {
        nome: "Maria Oliveira",
        email: "maria@gmail.com",
        dataInscricao: new Date(2024, 1, 2, 19, 23),
        dataCheckIn: new Date(2024, 1, 2, 19, 23)
    },
    {
        nome: "Ana Silva",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 0, 5, 10, 45),
        dataCheckIn: null
    },
    {
        nome: "João Santos",
        email: "joao@gmail.com",
        dataInscricao: new Date(2024, 3, 15, 14, 30),
        dataCheckIn: new Date(2024, 3, 15, 14, 30)
    },
    {
        nome: "Maria Souza",
        email: "maria@gmail.com",
        dataInscricao: new Date(2024, 4, 20, 8, 0),
        dataCheckIn: null
    },
    {
        nome: "Pedro Oliveira",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 5, 25, 17, 15),
        dataCheckIn: new Date(2024, 5, 25, 17, 15)
    },
    {
        nome: "Laura Lima",
        email: "laura@gmail.com",
        dataInscricao: new Date(2024, 6, 30, 12, 10),
        dataCheckIn: new Date(2024, 6, 30, 12, 10)
    },
    {
        nome: "Rafaela Costa",
        email: "rafaela@gmail.com",
        dataInscricao: new Date(2024, 7, 10, 9, 20),
        dataCheckIn: null
    },
    {
        nome: "Lucas Almeida",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2024, 8, 8, 18, 50),
        dataCheckIn: null
    },
    {
        nome: "Camila Santos",
        email: "camila@gmail.com",
        dataInscricao: new Date(2024, 9, 5, 16, 5),
        dataCheckIn: new Date(2024, 9, 5, 16, 5)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
     dataCheckIn = `
        <button
            data-email="${participante.email}"
            onclick="fazerCheckIn(event)"
        >
            Confirmar check-in
        </button>
     `
  }

  return `
  <tr>
      <td>
        <strong>
        ${participante.nome}      
        </strong>
        <br>
        <small>
        ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
  document
  .querySelector('tbody')
  .innerHTML = output
} 

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    alert(dadosDoFormulario.get('email'))

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    // verificar se o participante já existe
    const participanteExiste = participantes.find(
        (p) => p.email == participante.email
    )

    if(participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // limpar o formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    // confirmar se realmente quer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
    if(confirm(mensagemConfirmacao) == false) {
        return
    }
    
    // encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })
    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    //atualizar a lista dos participantes
    atualizarLista(participantes)
}