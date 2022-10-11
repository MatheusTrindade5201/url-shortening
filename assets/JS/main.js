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
        let urlLonga = input.value;
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

const consomeSessionStorage = () => {
    if(localStorage.length == 0){
        return
    }
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i)
        let item = localStorage.getItem(key)
        let objeto = JSON.parse(item)
        let li = novoEncurtadorItem();
        let pLinkOriginal = LinkOriginalStorage(objeto.link_original);
        let pLinkResultado = LinkResultadoStorage(objeto.link_resultado); 
        let btn = novoBotao();

        listaLinks.appendChild(li);
        li.appendChild(pLinkOriginal);
        li.appendChild(pLinkResultado);
        li.appendChild(btn);

        btn.addEventListener('click', function (e) {
            const botoes = document.querySelectorAll('.encurtador__botao-copiar')
            botoes.forEach(n => {
                n.innerHTML = 'Copy';
                n.classList.remove('copiado')
            });
            let linkCopiado = e.target.previousElementSibling.innerHTML;
            navigator.clipboard.writeText(linkCopiado);
            e.target.innerHTML = 'Copied!';
            e.target.classList.add('copiado');
        })
    }
}


 const incluiLinkEncurtado = async () => {
    let li = novoEncurtadorItem();
    let pLinkOriginal = novoLinkOriginal();
    let pLinkResultado = await novoLinkResultado();
    let btn = novoBotao();

    if(pLinkResultado.innerHTML == 'undefined'){
        input.value = ''
        alert('Link invalido')
        return
    }

    listaLinks.appendChild(li);
    li.appendChild(pLinkOriginal);
    li.appendChild(pLinkResultado);
    li.appendChild(btn);

    localStorage.setItem(pLinkResultado.innerHTML, await criaObjeto()); 
    
    input.value = ''

    

    btn.addEventListener('click', function (e) {
        const botoes = document.querySelectorAll('.encurtador__botao-copiar')
        botoes.forEach(n => {
            n.innerHTML = 'Copy';
            n.classList.remove('copiado')
        });

        let linkCopiado = e.target.previousElementSibling.innerHTML;
        navigator.clipboard.writeText(linkCopiado);
        e.target.innerHTML = 'Copied!';
        e.target.classList.add('copiado');
    })

 }

 const criaObjeto = async () => {
    let item = JSON.stringify({
        link_original: input.value,
        link_resultado: await buscaUrl()
    })

    return item
 }

 const novoEncurtadorItem = () => {
     let novoItem = document.createElement('li');
     novoItem.classList.add('encurtador__item')
     return novoItem;
 }

 const novoLinkOriginal = () => {
    let linkOriginal = document.createElement('p');
    linkOriginal.classList.add('encurtador__link-original');
    linkOriginal.innerHTML = input.value;
    return linkOriginal;
 }

 const LinkOriginalStorage = (original) => {
    let linkOriginal = document.createElement('p');
    linkOriginal.classList.add('encurtador__link-original');
    linkOriginal.innerHTML = original;
    return linkOriginal;
 }
 

const novoLinkResultado = async () => {
    let linkResultado = document.createElement('p');
    linkResultado.classList.add('encurtador__link-resultado');
    linkResultado.innerHTML = await buscaUrl();
    return linkResultado; 
}

const LinkResultadoStorage = (resultado) => {
    let linkResultado = document.createElement('p');
    linkResultado.classList.add('encurtador__link-resultado');
    linkResultado.innerHTML = resultado;
    return linkResultado; 
}

const novoBotao = () => {
    let novoBotaoCopiar = document.createElement('button');
    novoBotaoCopiar.classList.add('encurtador__botao-copiar');
    novoBotaoCopiar.innerHTML = 'Copy';
    return novoBotaoCopiar;
}

consomeSessionStorage();