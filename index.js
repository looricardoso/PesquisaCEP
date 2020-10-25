const cepInformado = document.getElementById('cep');
const cidadeForm = document.getElementById('cidade');
const estadoForm = document.getElementById('estado');
const logradouroForm = document.getElementById('logradouro');
const numeroForm = document.getElementById('numeroLogradouro');
const bairroForm = document.getElementById('bairro');
const complementoForm = document.getElementById('complemento');
const mensagem = document.getElementById('mensagemUsuario');
const botaoEnviar = document.getElementById('enviarForm');
const botaoReset = document.getElementById('resetForm');

const enviarFormulario = (evento) => {
    evento.preventDefault();
    if (cepInformado.value.length === undefined || cepInformado.value.length === 0) {
        mensagem.classList.add('invalido');
        mensagem.innerText = 'O CEP deve ser informado';
        return;
    } else if (cidadeForm.value.length === undefined || cidadeForm.value.length === 0) {
        mensagem.classList.add('invalido');
        mensagem.innerText = 'O nome da cidade deve ser informado';
        return;
    } else if (estadoForm.value.length === undefined || estadoForm.value.length === 0) {
        mensagem.classList.add('invalido');
        mensagem.innerText = 'O estado deve ser informado';
        return;
    } else if (logradouroForm.value.length === undefined || logradouroForm.value.length === 0) {
        mensagem.classList.add('invalido');
        mensagem.innerText = 'O logradouro deve ser informado';
        return;
    } else if (numeroForm.value.length === undefined || numeroForm.value.length === 0) {
        mensagem.classList.add('invalido');
        mensagem.innerText = 'O número do endereço deve ser informado';
        return;
    } else if (bairroForm.value.length === undefined || bairroForm.value.length === 0) {
        mensagem.classList.add('invalido');
        mensagem.innerText = 'O bairro deve ser informado';
        return;
    } else if (complementoForm.value.length === undefined || complementoForm.value.length === 0) {
        mensagem.classList.add('invalido');
        mensagem.innerText = 'O complemento deve ser informado';
        return;
    } else {
        mensagem.classList.remove('invalido');
        mensagem.innerText = 'Dados enviados com sucesso.';
    };
};

const cep = () => {
    let cepValue = cepInformado.value.replace();
    const url = `https://api.postmon.com.br/v1/cep/${cepValue}`;
    return url;
};

const preencheDados = (dados) => {
    document.getElementById('cidade').value = dados.cidade;
    document.getElementById('cidade').disabled = true;
    document.getElementById('estado').value = dados.estado;
    document.getElementById('estado').disabled = true;
    if (dados.logradouro === undefined) {
        return;
    } else {
        document.getElementById('logradouro').value = dados.logradouro;
        document.getElementById('logradouro').disabled = true;
    };
    if (dados.bairro === undefined) {
        return;
    } else {
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('bairro').disabled = true;
    };
    if (dados.complemento === undefined) {
        return;
    } else {
        document.getElementById('complemento').value = dados.complemento;
        document.getElementById('complemento').disabled = true;
    };
};

resetaFormulario = () => {
    mensagem.innerText = '';
    document.getElementById('cidade').disabled = false;
    document.getElementById('estado').disabled = false;
    document.getElementById('logradouro').disabled = false;
    document.getElementById('bairro').disabled = false;
    document.getElementById('complemento').disabled = false;
};

const iniciar = async () => {
    cepInformado.onblur = async () => {
        if (cepInformado.value === 0 || cepInformado.value.length < 8 || cepInformado.value.length > 8) {
            alert('Preencha o CEP corretamente.');
        } else {
            try {
                const link = cep();
                const response = await fetch(link);
                if (response.ok) {
                    const result = await response.json();
                    preencheDados(result);
                } else {
                    throw new Error(`${response.statusText}, código: ${response.status}`);
                }
            } catch (error) {
                alert('CEP não encontrado na base de dados.\nDigite o endereço corretamente nos campos.');
                console.log(`Erro ao obter: ${error.message}`);
            }
        };
    };
    botaoReset.addEventListener('click', resetaFormulario);
    botaoEnviar.addEventListener('click', enviarFormulario);
};
document.addEventListener('DOMContentLoaded', iniciar);