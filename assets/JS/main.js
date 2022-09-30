const input = document.getElementById('urlOriginal');
const botao = document.getElementById('encurtador__botao');
const mensagemErro = document.getElementById('mensagem__erro');
const urlBase = 'https://api.shrtco.de/v2/shorten?url=';
const listaLinks = document.getElementById('encurtador__processados');

botao.addEventListener('click', function () {
    validaInput();
    if(input.value){
        incluiLinkEncurtado()
    }
})

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
    try{
    const resp = await encurtaURL();
    const urlCurta = await resp.result.short_link;
    return urlCurta;
    }catch(e){
        console.log(e.message);
    }
 }
 

 const incluiLinkEncurtado = async () => {
    var li = novoEncurtadorItem();
    var pLinkOriginal = novoLinkOriginal();
    var pLinkResultado = await novoLinkResultado();
    var btn = novoBotao();

    if(pLinkResultado.innerHTML == 'undefined'){
        input.value = ''
        alert('Link invalido')
        return
    }

    listaLinks.appendChild(li);
    li.appendChild(pLinkOriginal);
    li.appendChild(pLinkResultado);
    li.appendChild(btn);

    sessionStorage.setItem(pLinkResultado.innerHTML, await criaObjeto()); 
    
    input.value = ''

    

    btn.addEventListener('click', function (e) {
        const botoes = document.querySelectorAll('.encurtador__botao-copiar')
        botoes.forEach(n => {
            n.innerHTML = 'Copy';
            n.classList.remove('copiado')
        });

        navigator.clipboard.writeText(pLinkResultado.innerHTML)
        e.target.innerHTML = 'Copied!'
        e.target.classList.add('copiado')
    })

 }

 const criaObjeto = async () => {
    var item = JSON.stringify({
        link_original: input.value,
        link_resultado: await buscaUrl()
    })

    return item
 }

 const novoEncurtadorItem = () => {
     var novoItem = document.createElement('li');
     novoItem.classList.add('encurtador__item')
     return novoItem;
 }

 const novoLinkOriginal = () => {
    var linkOriginal = document.createElement('p');
    linkOriginal.classList.add('encurtador__link-original');
    linkOriginal.innerHTML = input.value;
    return linkOriginal;
 }

const novoLinkResultado = async () => {
    var linkResultado = document.createElement('p');
    linkResultado.classList.add('encurtador__link-resultado');
    linkResultado.innerHTML = await buscaUrl();
    return linkResultado; 
}

const novoBotao = () => {
    var novoBotaoCopiar = document.createElement('button');
    novoBotaoCopiar.classList.add('encurtador__botao-copiar');
    novoBotaoCopiar.innerHTML = 'Copy';
    return novoBotaoCopiar;
}