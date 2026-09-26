# barbearia_ruy_costa
Projeto Barbearia

Claro. Abaixo está um `README.md` pronto para colocar no GitHub, apresentando o projeto de forma profissional e destacando que ele é **100% frontend, sem backend**.

````
# 💈 Barbearia Ruy Costa

Landing page moderna e responsiva desenvolvida para a **Barbearia Ruy Costa**, localizada na Vila da Saúde, São Paulo.

O projeto foi desenvolvido com uma estética **dark, sofisticada e premium**, utilizando predominantemente preto e branco para representar a identidade visual da barbearia.

O site possui sistema de solicitação de agendamento através do WhatsApp, sem necessidade de backend ou banco de dados.

---

## ✨ Preview

> Landing page responsiva com foco em experiência do usuário, apresentação da barbearia e conversão através do WhatsApp.

### Principais características

- 🎨 Design dark e premium
- 📱 Layout totalmente responsivo
- 💈 Apresentação da barbearia
- ⭐ Seção de avaliações
- 📸 Galeria de imagens
- 📍 Localização
- 📞 Informações de contato
- 💬 Integração com WhatsApp
- 📅 Modal de solicitação de agendamento
- ✨ Microinterações e animações
- 🌙 Interface otimizada para tema escuro
- ♿ Recursos básicos de acessibilidade
- 🔎 SEO básico

---

## 🚀 Tecnologias

O projeto foi desenvolvido utilizando apenas tecnologias frontend:

- HTML5
- CSS3
- JavaScript Vanilla
- Tailwind CSS

### Não utiliza

- ❌ Node.js
- ❌ React
- ❌ Next.js
- ❌ Vue
- ❌ Angular
- ❌ PHP
- ❌ Banco de dados
- ❌ Backend

O projeto pode ser executado diretamente através do arquivo:

```text
index.html
````

---

 ## 📅 Sistema de Agendamento

 O site possui um sistema de **solicitação de agendamento** desenvolvido em JavaScript.

 O fluxo funciona da seguinte maneira:

```
Cliente
   ↓
Escolhe a data
   ↓
Escolhe um horário
   ↓
Preenche os dados
   ↓
Confere o resumo
   ↓
Solicita pelo WhatsApp
   ↓
Barbearia confirma o horário
```

 ### Importante

 O sistema **não realiza reservas em tempo real**.

 Os horários exibidos são configurados no JavaScript e servem como opções de horário para o cliente.

 A confirmação final é realizada pela Barbearia Ruy Costa através do WhatsApp.

 Isso permite manter o projeto totalmente frontend, sem necessidade de servidor ou banco de dados.

---

 ## 💬 WhatsApp

 O formulário de agendamento gera automaticamente uma mensagem contendo os dados preenchidos pelo cliente.

 Exemplo:

```
Olá, Ruy! Gostaria de solicitar um horário.

Nome: João da Silva
Telefone: (11) 99999-9999

Data desejada: 26/09/2026
Horário desejado: 15:30

Serviço: Corte

Observação:
Gostaria de realizar um corte no período da tarde.

Estou ciente de que o horário está sujeito à confirmação.

Obrigado!
```

 A mensagem é codificada com `encodeURIComponent()` e enviada através do WhatsApp.

---

 ## 🖤 Identidade Visual

 A interface utiliza uma paleta predominantemente preta e branca.

 ### Paleta

 | Cor | Hex |
| --- | --- |
| Preto principal | `#050505` |
| Preto secundário | `#0D0D0D` |
| Cards | `#151515` |
| Branco | `#FFFFFF` |
| Branco secundário | `#E5E5E5` |
| Cinza | `#9CA3AF` |

A proposta visual é transmitir:

 - Sofisticação
- Exclusividade
- Masculinidade
- Elegância
- Confiança
- Modernidade

---

 ## 📱 Responsividade

 O projeto foi desenvolvido seguindo uma abordagem responsiva, adaptando a interface para:

 - 📱 Smartphones
- 📲 Tablets
- 💻 Notebooks
- 🖥️ Desktops
- 🖥️ Monitores maiores

 O modal de agendamento, formulário, navegação e botão flutuante do WhatsApp também foram adaptados para dispositivos móveis.

---

 ## ✨ Animações

 O projeto utiliza microinterações para melhorar a experiência do usuário.

 Entre elas:

 - Fade-in
- Slide-up
- Hover effects
- Transições suaves
- Animação do modal
- Seleção de horários
- Efeitos nas imagens
- Animação do botão WhatsApp
- Alteração da navbar durante o scroll

 As animações respeitam a preferência do usuário através de:

```
prefers-reduced-motion
```

---

 ## 📂 Estrutura do Projeto

```
barbearia-ruy-costa/
│
├── index.html
│
├── assets/
│   ├── images/
│   └── icons/
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── README.md
```

---

 ## ⚙️ Como executar

 Não é necessário instalar dependências.

 Clone o repositório:

```
git clone https://github.com/SEU-USUARIO/barbearia-ruy-costa.git
```

 Entre na pasta:

```
cd barbearia-ruy-costa
```

 Depois basta abrir:

```
index.html
```

 no navegador.

 Também é possível utilizar uma extensão como **Live Server** no VS Code para desenvolvimento local.

---

 ## 🛠️ Personalização

 ### Alterar horários

 Os horários podem ser configurados diretamente no JavaScript.

 Exemplo:

```
const agenda = {
    segunda: [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30"
    ],

    terca: [
        "09:00",
        "09:30",
        "10:00",
        "10:30"
    ]
};
```

 Isso permite alterar facilmente os horários exibidos no sistema de agendamento.

---

 ## 📍 Informações da Barbearia

 **Barbearia Ruy Costa**

 📍 Av. Miguel Estefno, 2014\
 Vila da Saúde, São Paulo - SP\
 CEP: 04301-001

 📞 `(11) 98702-6977`

 💬 WhatsApp: `(11) 98702-6977`

 📱 Instagram: `@Ruy_barber_c`

 ⭐ Avaliação: `5,0`

 📝 Total de avaliações: `4`

---

 ## 🔐 Privacidade

 O projeto não possui banco de dados ou backend.

 As informações preenchidas no formulário são utilizadas apenas para gerar a mensagem de solicitação de agendamento no WhatsApp.

 Nenhum dado é armazenado pelo site.

---

 ## 📈 SEO

 O projeto possui implementação básica de SEO, incluindo:

 - `<title>`
- Meta description
- Viewport
- HTML semântico
- Headings estruturados
- Open Graph
- Dados estruturados para negócio local

---

 ## ♿ Acessibilidade

 Foram considerados princípios básicos de acessibilidade, incluindo:

 - Contraste adequado
- Labels nos formulários
- Navegação por teclado
- Estados de foco
- `aria-label` quando necessário
- HTML semântico
- Suporte a `prefers-reduced-motion`

---

 ## 🌐 Deploy

 Por ser um projeto totalmente estático, pode ser hospedado em serviços como:

 - GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Qualquer hospedagem tradicional de arquivos estáticos

 Não é necessário servidor backend.

---

 ## 📄 Licença

 Este projeto foi desenvolvido para a **Barbearia Ruy Costa**.

 Os direitos sobre identidade visual, logotipo, imagens e informações comerciais pertencem aos respectivos proprietários.

 O código pode ser utilizado como referência para fins de estudo e desenvolvimento, respeitando os direitos sobre os elementos proprietários.

---

 ## 👨‍💻 Desenvolvimento

 Projeto desenvolvido utilizando tecnologias frontend modernas, com foco em:

 **Design + Performance + Responsividade + Conversão**

---

 ### 💈 Barbearia Ruy Costa

 **Estilo que marca presença.**

```

```
