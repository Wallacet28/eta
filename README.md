# 💧 Projeto ETA - Cadastro Mensal de Estação de Tratamento de Água

Este projeto é uma aplicação web desenvolvida para facilitar o **cadastro, visualização e exportação dos dados de controle de uma Estação de Tratamento de Água (ETA)**. O sistema permite registrar dados operacionais e de qualidade da água ao longo das 24 horas do dia, organizar os turnos, armazenar dados de insumos e exportar as informações para uma planilha `.xlsx` compatível com o Excel, preservando a estrutura utilizada pelas equipes operacionais.

---

## 🛠 Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **Biblioteca XLSX** (`SheetJS`) para exportação da tabela para Excel
- **Responsivo** e adaptado para desktop

---

## 🌐 Funcionalidades

- Cadastro completo dos dados por hora (00h às 24h)
- Organização de turnos e insumos
- Validação dos campos (ex: uso de vírgula em campos numéricos)
- Exportação em formato Excel `.xlsx` mantendo os dados organizados
- Interface simples e intuitiva
- Dados destacados em vermelho caso ultrapassem valores críticos (ex: turbidez > 0,50)

---

## 🧾 Campos do Formulário

### 1. ⏰ Informações por Hora
| Campo                  | Descrição                                                                 |
|------------------------|---------------------------------------------------------------------------|
| **Hora**              | Cada linha da tabela representa uma hora do dia (00h às 24h)              |
| **Vazão**             | Medida de volume de água tratada por hora                                 |
| **Turbidez Bruta**    | Nível de turbidez da água bruta                                            |
| **Turbidez Decantada 1 e 2** | Níveis de turbidez após o processo de decantação                    |
| **Turbidez Filtrada 1 e 2** | Níveis de turbidez após a filtração                                  |
| **Turbidez Tratada**  | Nível final de turbidez após o tratamento completo                        |
| **pH Bruta**          | pH da água antes do tratamento                                             |
| **pH Filtrada**       | pH da água após filtragem                                                  |
| **pH Tratada**        | pH final da água tratada                                                   |
| **Cor Aparente Bruta**| Nível de cor da água bruta                                                 |
| **Cor Filtrada**      | Nível de cor após filtragem                                                |
| **Cor Tratada**       | Nível de cor final da água tratada                                         |
| **Cloro Residual Livre** | Teor de cloro livre presente na água tratada                           |
| **Flúor**             | Quantidade de flúor adicionado                                             |
| **Temperatura da Água**| Medida da temperatura da água                                             |
| **Jar Test**          | Resultado do teste de jarros para controle de coagulação                   |
| **Dosagem**           | Dosagem dos produtos químicos utilizados                                   |

---

### 2. 🧪 Insumos Utilizados

| Campo                        | Descrição                                      |
|-----------------------------|-----------------------------------------------|
| **Sulfato de Alumínio**     | Quantidade usada no processo de coagulação    |
| **Hipoclorito de Cálcio**   | Quantidade usada para desinfecção             |
| **Cal Hidratada**           | Para ajuste de pH                             |
| **Fluossilicato de Sódio**  | Usado para fluoretação da água                |

---

### 3. 🕐 Turnos de Trabalho

| Campo          | Descrição                              |
|----------------|-----------------------------------------|
| **Turno**      | Indicação do turno (Manhã, Tarde, Noite)|

---

### 4. 🚿 Lavagem de Filtros

| Campo                  | Descrição                                      |
|------------------------|-----------------------------------------------|
| **Hora da Lavagem**    | Registro do horário em que o filtro foi lavado|
| **Filtro 1 Lavado**    | Marcação se o filtro 1 foi lavado             |
| **Filtro 2 Lavado**    | Marcação se o filtro 2 foi lavado             |

---

### 5. ✍️ Observações e Responsável

| Campo              | Descrição                                              |
|--------------------|--------------------------------------------------------|
| **Observações**    | Campo livre para anotações adicionais                  |
| **Assinatura**     | Nome do responsável pelo preenchimento dos dados       |

---

## 📁 Como Usar

1. Abra o arquivo `index.html` no seu navegador
2. Preencha os campos do formulário conforme o controle da ETA
3. Clique no botão `Exportar` para gerar o arquivo Excel
4. O arquivo `.xlsx` será baixado com todos os dados preenchidos

---

## 🧠 Validações e Automatizações

- Campos de turbidez **acima de 0,50** aparecem em **vermelho**
- Todos os campos numéricos devem ser preenchidos com **vírgula**, não ponto
- O mês atual aparece dinamicamente no cabeçalho
- Dados são exportados mantendo o layout da planilha oficial

---

## 👨‍💻 Desenvolvedor

**Wallace Tadeu**  
Desenvolvedor Front-End e Técnico em Desenvolvimento de Sistemas  
📍 Senhora de Oliveira, MG  
📧 wallacet28@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/wallace-silva-205902211)

---

## 📌 Observações Finais

Este sistema foi desenvolvido para **uso interno em estações de tratamento**, garantindo controle rigoroso e padronizado dos parâmetros exigidos por órgãos de vigilância sanitária e ambiental. Ele pode ser adaptado para diferentes estações e rotinas.

---

## 📝 Licença

Este projeto é de uso interno, mas pode ser adaptado para outras prefeituras e companhias de saneamento com a devida autorização.

