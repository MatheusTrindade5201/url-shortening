const input = document.getElementById('urlOriginal');
const botao = document.getElementById('encurtador__botao');
const mensagemErro = document.getElementById('mensagem__erro');
const urlBase = 'https://api.shrtco.de/v2/shorten?url=';

botao.addEventListener('click', validaInput)

function validaInput () {
    if(!input.value){
        input.classList.add('encurtador__input-erro');
        mensagemErro.classList.add('mensagem__erro-ativo');
    }else {
        input.classList.remove('encurtador__input-erro');
        mensagemErro.classList.remove('mensagem__erro-ativo');
    }
}


const encurtaURL = async () => {
    try{
        var urlLonga = input.value;
        const data = await fetch(urlBase + urlLonga);
        const json = await data.json();
        console.log(json);
        return json;
    }catch(e){
        console.log(e.message);
    }
}

 const buscaUrl = async () => {
    const resp = await encurtaURL();
    const urlCurta = resp.result.short_link
    return urlCurta;
 }
 