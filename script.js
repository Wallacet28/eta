const STORAGE_KEY = "cadastro_plantao";
const AUTH_KEY = "usuario_autenticado"; // Chave para o status de autenticação
let dadosPorDia = {};
let editandoRegistro = null; // Controla se estamos editando ou adicionando um registro

// Executado quando a janela carrega
window.onload = () => {
    // --- Verificação de Autenticação ---
    // Checa se o usuário está autenticado no localStorage
    const usuarioAutenticado = localStorage.getItem(AUTH_KEY);
    if (!usuarioAutenticado) {
        // Se não estiver autenticado, redireciona para a página de login
        window.location.href = "login.html";
        return; // Interrompe a execução do restante do script para index.html
    }
    // --- Fim da Verificação de Autenticação ---

    // Define o mês e ano atual no cabeçalho da página
    const data = new Date();
    const nomeMes = data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    // Capitaliza a primeira letra do nome do mês
    document.getElementById("mesAtual").textContent = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

    // Carrega dados salvos do localStorage
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
        dadosPorDia = JSON.parse(salvo);
    }

    // Preenche o seletor de dias e atualiza a tabela
    preencherDias();
    atualizarTabela();
};

// Adiciona um listener para o evento de submit do formulário de cadastro
document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    const agora = new Date();
    // Obtém o dia atual formatado para "Dia DD"
    const dia = agora.getDate().toString().padStart(2, '0');
    const nomeAba = "Dia " + dia;

    // Cria um objeto com os dados do registro a partir dos valores do formulário
    const registro = {
        Data: agora.toLocaleDateString(), // A data será sempre a do salvamento/atualização
        Hora: document.getElementById("hora").value,
        Vazao: document.getElementById("vazao").value,
        Bruta: document.getElementById("bruta").value,
        Decantada1: document.getElementById("dec1").value,
        Decantada2: document.getElementById("dec2").value,
        Filtrada1: document.getElementById("filt1").value,
        Filtrada2: document.getElementById("filt2").value,
        Tratada: document.getElementById("tratada").value,
        Cor: document.getElementById("cor").value,
        Dosagem: document.getElementById("dosagem").value,
        // Divide e trim (remove espaços) cada item de HF
        HF: document.getElementById("hf").value.split(",").map(item => item.trim()),
        Insumos: {
            Sulfato: document.getElementById("insumoSulfato").value,
            Hipoclorito: document.getElementById("insumoHipoclorito").value,
            Cal: document.getElementById("insumoCal").value,
            Fluossilicato: document.getElementById("insumoFluossilicato").value
        },
        Lavagem: {
            Hora: document.getElementById("horaLavagem").value,
            Filtro1: document.getElementById("filtro1Lavagem").value,
            Filtro2: document.getElementById("filtro2Lavagem").value,
        },
        Observacao: document.getElementById("observacao").value
    };

    // Lógica para adicionar ou atualizar um registro
    if (editandoRegistro !== null) {
        // Se `editandoRegistro` não é nulo, estamos em modo de edição
        dadosPorDia[editandoRegistro.dia][editandoRegistro.index] = registro;
        editandoRegistro = null; // Reseta o estado de edição
    } else {
        // Se não estamos editando, adiciona um novo registro
        if (!dadosPorDia[nomeAba]) {
            dadosPorDia[nomeAba] = [];
        }
        dadosPorDia[nomeAba].push(registro);
    }

    // Salva os dados atualizados no localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosPorDia));

    // Reseta o formulário após a submissão
    this.reset();
    // Restaura o texto do botão "Salvar" (caso tenha sido "Atualizar")
    document.getElementById("formulario").querySelector('button[type="submit"]').textContent = "Salvar";

    // Atualiza o seletor de dias e a tabela
    preencherDias();
    // Tenta manter o dia selecionado na dropdown, caso contrário, volta para o dia atual
    const diaAtualNaSelect = document.getElementById("selecionarDia").value;
    atualizarTabela(diaAtualNaSelect || nomeAba);
});

// Preenche o elemento select com as opções de dias que possuem registros
function preencherDias() {
    const select = document.getElementById("selecionarDia");
    select.innerHTML = ""; // Limpa as opções existentes

    // Adiciona uma opção para o dia atual, mesmo que não haja registros para ele ainda
    const hoje = new Date();
    const diaHoje = "Dia " + hoje.getDate().toString().padStart(2, '0');
    if (!dadosPorDia[diaHoje] || dadosPorDia[diaHoje].length === 0) {
        const optHoje = document.createElement("option");
        optHoje.value = diaHoje;
        optHoje.textContent = diaHoje;
        select.appendChild(optHoje);
    }

    // Ordena os dias numericamente para exibição no seletor
    const diasOrdenados = Object.keys(dadosPorDia).sort((a, b) => {
        const numA = parseInt(a.replace('Dia ', ''));
        const numB = parseInt(b.replace('Dia ', ''));
        return numA - numB;
    });

    // Adiciona as opções para os dias com registros
    for (const dia of diasOrdenados) {
        // Evita adicionar o dia de hoje novamente se ele já foi adicionado vazio ou com dados
        if (dia === diaHoje && dadosPorDia[diaHoje] && dadosPorDia[diaHoje].length > 0) {
            continue;
        }
        const opt = document.createElement("option");
        opt.value = dia;
        opt.textContent = dia;
        select.appendChild(opt);
    }
    // Seleciona o dia atual por padrão após preencher as opções
    document.getElementById("selecionarDia").value = diaHoje;
}

// Atualiza a tabela de registros com os dados do dia selecionado
function atualizarTabela(diaSelecionado = null) {
    const hoje = new Date();
    const diaHoje = hoje.getDate().toString().padStart(2, '0');
    // Define o dia a ser exibido: o selecionado ou o dia atual
    const nomeAba = diaSelecionado || "Dia " + diaHoje;
    document.getElementById("diaAtual").textContent = nomeAba;

    const tbody = document.querySelector("#tabela-registros tbody");
    tbody.innerHTML = ""; // Limpa o corpo da tabela

    // Verifica se existem dados para o dia selecionado
    if (dadosPorDia[nomeAba]) {
        // Itera sobre cada registro do dia
        dadosPorDia[nomeAba].forEach((reg, index) => {
            const tr = document.createElement("tr"); // Cria uma nova linha na tabela

            // Função auxiliar para criar células da tabela
            function td(text, highlight = false) {
                const td = document.createElement("td");
                td.textContent = text;
                if (highlight) {
                    td.style.color = "red"; // Adiciona destaque vermelho se highlight for true
                }
                return td;
            }

            // Adiciona as células com os dados do registro
            tr.appendChild(td(reg.Data));
            tr.appendChild(td(reg.Hora));
            tr.appendChild(td(reg.Vazao));
            tr.appendChild(td(reg.Bruta));
            tr.appendChild(td(reg.Decantada1));
            tr.appendChild(td(reg.Decantada2));
            // Destaca Filtrada1 e Filtrada2 se o valor for maior que 0.5
            tr.appendChild(td(reg.Filtrada1, parseFloat(reg.Filtrada1) > 0.5));
            tr.appendChild(td(reg.Filtrada2, parseFloat(reg.Filtrada2) > 0.5));
            tr.appendChild(td(reg.Tratada));
            tr.appendChild(td(reg.Cor));
            tr.appendChild(td(reg.Dosagem));
            // Junta os horários de funcionamento com " | "
            tr.appendChild(td((reg.HF || []).join(" | ")));

            // Formata e adiciona os dados de insumos
            const insumo = reg.Insumos || {};
            const insumoStr = `SA: ${insumo.Sulfato}, HC: ${insumo.Hipoclorito}, CH: ${insumo.Cal}, FS: ${insumo.Fluossilicato}`;
            tr.appendChild(td(insumoStr));

            // Formata e adiciona os dados de lavagem
            const lav = reg.Lavagem || {};
            const lavagemStr = `Hora: ${lav.Hora}, F1: ${lav.Filtro1}, F2: ${lav.Filtro2}`;
            tr.appendChild(td(lavagemStr));

            tr.appendChild(td(reg.Observacao || "")); // Adiciona observação (ou string vazia se nula)

            // Adiciona células para as ações (editar e deletar)
            const tdAcoes = document.createElement("td");
            tdAcoes.className = "acoes";
            tdAcoes.innerHTML = `
                <button onclick="editarRegistro('${nomeAba}', ${index})">✏️</button>
                <button onclick="deletarRegistro('${nomeAba}', ${index})">❌</button>`;
            tr.appendChild(tdAcoes);

            tbody.appendChild(tr); // Adiciona a linha ao corpo da tabela
        });
    }
}

// Exporta os dados para um arquivo Excel
function exportarExcel() {
    const wb = XLSX.utils.book_new(); // Cria um novo workbook do Excel

    // Ordena os dias numericamente para que as abas do Excel fiquem em ordem
    const diasOrdenados = Object.keys(dadosPorDia).sort((a, b) => {
        const numA = parseInt(a.replace('Dia ', ''));
        const numB = parseInt(b.replace('Dia ', ''));
        return numA - numB;
    });

    // Itera sobre cada dia com dados
    for (const dia of diasOrdenados) {
        // Mapeia os registros para um formato mais plano e adequado para o Excel
        const registrosFormatados = dadosPorDia[dia].map(reg => ({
            Data: reg.Data,
            Hora: reg.Hora,
            Vazao: reg.Vazao,
            Bruta: reg.Bruta,
            Dec1: reg.Decantada1,
            Dec2: reg.Decantada2,
            Filt1: reg.Filtrada1,
            Filt2: reg.Filtrada2,
            Tratada: reg.Tratada,
            Cor: reg.Cor,
            Dosagem: reg.Dosagem,
            HorarioFuncionamento: (reg.HF || []).join(" | "),
            Sulfato: reg.Insumos?.Sulfato, // Usa optional chaining para segurança
            Hipoclorito: reg.Insumos?.Hipoclorito,
            Cal: reg.Insumos?.Cal,
            Fluossilicato: reg.Insumos?.Fluossilicato,
            HoraLavagem: reg.Lavagem?.Hora,
            Filtro1Lavagem: reg.Lavagem?.Filtro1,
            Filtro2Lavagem: reg.Lavagem?.Filtro2,
            Observacao: reg.Observacao
        }));
        // Converte os dados formatados para uma planilha Excel
        const ws = XLSX.utils.json_to_sheet(registrosFormatados);
        // Adiciona a planilha ao workbook com o nome do dia
        XLSX.utils.book_append_sheet(wb, ws, dia);
    }
    // Escreve (baixa) o arquivo Excel
    XLSX.writeFile(wb, "cadastro_eta_mensal.xlsx");
}

/**
 * Preenche o formulário com os dados de um registro para edição.
 * @param {string} dia O nome da aba (ex: "Dia 01") onde o registro está.
 * @param {number} index O índice do registro dentro do array do dia.
 */
function editarRegistro(dia, index) {
    const registro = dadosPorDia[dia][index];

    if (registro) {
        // Preenche os campos do formulário com os dados do registro selecionado
        document.getElementById("hora").value = registro.Hora;
        document.getElementById("vazao").value = registro.Vazao;
        document.getElementById("bruta").value = registro.Bruta;
        document.getElementById("dec1").value = registro.Decantada1;
        document.getElementById("dec2").value = registro.Decantada2;
        document.getElementById("filt1").value = registro.Filtrada1;
        document.getElementById("filt2").value = registro.Filtrada2;
        document.getElementById("tratada").value = registro.Tratada;
        document.getElementById("cor").value = registro.Cor;
        document.getElementById("dosagem").value = registro.Dosagem;
        // Junta o array HF de volta para uma string separada por ", "
        document.getElementById("hf").value = (registro.HF || []).join(", ");

        if (registro.Insumos) {
            document.getElementById("insumoSulfato").value = registro.Insumos.Sulfato;
            document.getElementById("insumoHipoclorito").value = registro.Insumos.Hipoclorito;
            document.getElementById("insumoCal").value = registro.Insumos.Cal;
            document.getElementById("insumoFluossilicato").value = registro.Insumos.Fluossilicato;
        }

        if (registro.Lavagem) {
            document.getElementById("horaLavagem").value = registro.Lavagem.Hora;
            document.getElementById("filtro1Lavagem").value = registro.Lavagem.Filtro1;
            document.getElementById("filtro2Lavagem").value = registro.Lavagem.Filtro2;
        }
        document.getElementById("observacao").value = registro.Observacao;

        // Armazena o registro que está sendo editado para que o 'submit' saiba que é uma edição
        editandoRegistro = { dia: dia, index: index };

        // Altera o texto do botão de submissão para "Atualizar"
        document.getElementById("formulario").querySelector('button[type="submit"]').textContent = "Atualizar";

        // Rola para o topo da página para que o usuário veja o formulário preenchido
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Deleta um registro específico do localStorage e atualiza a tabela.
 * @param {string} dia O nome da aba (ex: "Dia 01") onde o registro está.
 * @param {number} index O índice do registro dentro do array do dia.
 */
function deletarRegistro(dia, index) {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
        dadosPorDia[dia].splice(index, 1); // Remove o registro do array

        // Se o array do dia ficar vazio, remove a chave do dia de dadosPorDia
        if (dadosPorDia[dia].length === 0) {
            delete dadosPorDia[dia];
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosPorDia)); // Salva as alterações no localStorage
        preencherDias(); // Atualiza a lista de dias no seletor (se um dia foi removido)
        
        // Tenta manter o dia selecionado na dropdown, caso contrário, volta para o dia atual
        const diaAtualNaSelect = document.getElementById("selecionarDia").value;
        atualizarTabela(diaAtualNaSelect);
    }
}

/**
 * Realiza o logout do usuário, removendo o status de autenticação e redirecionando para o login.
 */
function fazerLogout() {
    if (confirm("Tem certeza que deseja sair?")) {
        localStorage.removeItem(AUTH_KEY); // Remove o indicador de autenticação
        window.location.href = "login.html"; // Redireciona para a página de login
    }
}