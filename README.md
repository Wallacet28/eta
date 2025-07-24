# 💧 Sistema de Cadastro da ETA - Estação de Tratamento de Água

Este projeto foi desenvolvido para facilitar o registro de dados operacionais da ETA (Estação de Tratamento de Água), com foco em simplicidade, organização e possibilidade de exportação para planilhas Excel. Os dados são armazenados localmente no navegador, permitindo o preenchimento offline e exportação posterior.

---

## 🚀 Funcionalidades

- Tela de login inicial com verificação simples.
- Cadastro diário dos dados da ETA (automatizado com o mês e o dia atual).
- Campos personalizáveis para registro de medições e insumos.
- Armazenamento local automático (localStorage).
- Exportação dos dados preenchidos para planilha Excel `.xlsx`.
- Interface responsiva e amigável.
- Assinatura do funcionário ao final do cadastro.

---

## 📋 Campos do Formulário
> Estes campo possui validação sendo obrigatório o preenchemento
- **Horário atual**
- **Vazão**
- **Bruta**
- **Decantada 1**
- **Decantada 2**
- **Filtrada 1**
- **Filtrada 2**
- **Tratada**
- **Cor**
- **Dosagem**
> Este campo não exige validação 
- **Horário de Funcionamento**
- **Insumos:**
- **Sulfato**
- **Hipoclorito**
- **Cal**
- **Fluossilicato**
- **Hora da Lavagem**
- **Filtro 1 - Lavagem**
- **Filtro 2 - Lavagem**
- **Observações**
- **Assinatura do Funcionário**

> Nenhum campo exige validação rígida, permitindo flexibilidade total ao operador.

---

## 🧑‍💻 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (puro)
- [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) para exportação de planilhas

---



