const input = document.getElementById('urlOriginal');
const botao = document.getElementById('encurtador__botao');
const mensagemErro = document.getElementById('mensagem__erro');

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