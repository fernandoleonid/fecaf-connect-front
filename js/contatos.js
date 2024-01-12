'use strict'

export async function getContatos () {
    const url = 'https://deploy-backend-uzjp.onrender.com/v1/fecaf/contatos'

    const response = await fetch(url)
    const data = await response.json()
    return data.contatos
}

export async function getContato (id) {

    const contatos = await getContatos()

    return contatos.filter(contato => contato.id == id)[0]

    // const url = `https://backend-fecaf-connect.vercel.app/contatos/${id}`

    // const response = await fetch(url)
    // const data = await response.json()
    // return data
}

export async function postContato (contato) {
    const url = 'https://deploy-backend-uzjp.onrender.com/v1/fecaf/contato'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    return response.ok
}

export async function putContato (contato) {
    const url = `https://deploy-backend-uzjp.onrender.com/v1/fecaf/contato/${contato.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    return response.ok
}

export async function deleteContato (id) {
    const url = `https://deploy-backend-uzjp.onrender.com/v1/fecaf/contato/${id}`
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(url, options)
    return response.ok
}
