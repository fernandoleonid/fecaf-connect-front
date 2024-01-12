'use strict'
import { preview } from "./preview.js"
import { getContato, postContato, putContato, deleteContato} from "./contatos.js"
import { uploadImgur } from "./imgur.js"

async function buscarContato(id) {
    
    const contato = await getContato(id)
    return  contato
}
const habilitarCampo = campo => campo.disabled = !campo.disabled

const trocarBotao = botao => botao.classList.toggle('oculto')

function habilitarFormulario () {
    document.querySelectorAll('input').forEach(habilitarCampo)
    document.querySelectorAll('.button').forEach(trocarBotao)    
}

async function preencherFormulario ()  {
    const id = localStorage.getItem('id')

    if (id == undefined) {
        document.getElementById('salvar').dataset.tipo = 'novo'
        habilitarFormulario()
        return false
    }else{
        const contato = await buscarContato(id)
        document.getElementById('nome').value = contato.nome
        document.getElementById('email').value = contato.email
        document.getElementById('celular').value = contato.celular
        document.getElementById('endereco').value = contato.endereco
        document.getElementById('cidade').value = contato.cidade
        document.getElementById('imagePreview').src = contato.foto
    }
}

async function salvarContato ({target}) {
    const file = document.getElementById('inputFile')
    const linkImage = await uploadImgur(file.files[0])
    const contato = {
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "endereco" : document.getElementById('endereco').value,
        "cidade" : document.getElementById('cidade').value,
        "foto" : linkImage
    }
    if (target.dataset.tipo == 'novo'){
        postContato(contato)
        alert ('Cadastro com sucesso!!!')
        window.location.href = '/'
    }else{
        contato.id = localStorage.getItem('id')
        putContato(contato)
        habilitarFormulario()
    }

}

async function deletarContato () {
    const id = localStorage.getItem('id')
    const nome = document.getElementById('nome').value
    const response = confirm (`Deseja excluir o contato ${nome}?`)
    if (response) {
        await deleteContato(id)
        window.location.href = '/'
    }
}

preencherFormulario()

document.getElementById('editar').addEventListener('click', habilitarFormulario)

document.getElementById('inputFile')
        .addEventListener('change', () => preview('inputFile', 'imagePreview'))

document.getElementById('salvar')
        .addEventListener('click', salvarContato)

document.getElementById('deletar')
        .addEventListener('click', deletarContato)

