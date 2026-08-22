/* =========================
   CARRINHO
========================= */

let carrinho = [];


/* =========================
   ADICIONAR PRODUTO
========================= */

function adicionar(nome, preco) {

  const produto =
    carrinho.find(
      item => item.nome === nome
    );


  if (produto) {

    produto.quantidade++;

  } else {

    carrinho.push({

      nome: nome,

      preco: preco,

      quantidade: 1

    });

  }


  atualizarCarrinho();
}


/* =========================
   ALTERAR QUANTIDADE
========================= */

function alterarQuantidade(index, valor) {

  if (!carrinho[index]) {

    return;

  }


  carrinho[index].quantidade += valor;


  if (
    carrinho[index].quantidade <= 0
  ) {

    carrinho.splice(index, 1);

  }


  atualizarCarrinho();
}


/* =========================
   FORMATAR DINHEIRO
========================= */

function dinheiro(valor) {

  return Number(valor)

    .toFixed(2)

    .replace(".", ",");

}


/* =========================
   TAXA DE ENTREGA
========================= */

function obterTaxa() {

  const bairro =
    document.getElementById("bairro");


  if (
    !bairro ||
    bairro.value === ""
  ) {

    return 0;

  }


  return Number(bairro.value);
}


/* =========================
   ATUALIZAR CARRINHO
========================= */

function atualizarCarrinho() {

  const lista =
    document.getElementById(
      "listaCarrinho"
    );


  lista.innerHTML = "";


  let subtotal = 0;


  /* CARRINHO VAZIO */

  if (carrinho.length === 0) {

    lista.innerHTML = `

      <div class="vazio">

        Seu carrinho está vazio.

      </div>

    `;

  }


  /* PRODUTOS */

  carrinho.forEach(
    function(item, index) {


      const valor =
        item.preco *
        item.quantidade;


      subtotal += valor;


      const div =
        document.createElement(
          "div"
        );


      div.className = "item";


      div.innerHTML = `

        <div class="item-info">

          <div class="item-nome">

            ${item.nome}

          </div>


          <div class="item-preco">

            R$ ${dinheiro(
              item.preco
            )}

            cada

          </div>

        </div>


        <div class="controles">

          <button

            class="btn-qtd"

            onclick="
              alterarQuantidade(
                ${index},
                -1
              )
            "

          >
            −
          </button>


          <span class="qtd">

            ${item.quantidade}

          </span>


          <button

            class="btn-qtd"

            onclick="
              alterarQuantidade(
                ${index},
                1
              )
            "

          >
            +
          </button>

        </div>

      `;


      lista.appendChild(div);

    }
  );


  /* VALORES */

  const taxa =
    obterTaxa();


  const total =
    subtotal + taxa;


  document.getElementById(
    "subtotal"
  ).innerText =
    dinheiro(subtotal);


  document.getElementById(
    "taxa"
  ).innerText =
    dinheiro(taxa);


  document.getElementById(
    "total"
  ).innerText =
    dinheiro(total);


  verificarFormulario();
}


/* =========================
   VERIFICAR FORMULÁRIO
========================= */

function verificarFormulario() {

  const nome =
    document.getElementById(
      "nome"
    ).value.trim();


  const telefone =
    document.getElementById(
      "telefone"
    ).value.trim();


  const endereco =
    document.getElementById(
      "endereco"
    ).value.trim();


  const bairro =
    document.getElementById(
      "bairro"
    ).value;


  const pagamento =
    document.getElementById(
      "pagamento"
    ).value;


  const tudoPreenchido =

    carrinho.length > 0 &&

    nome !== "" &&

    telefone !== "" &&

    endereco !== "" &&

    bairro !== "" &&

    pagamento !== "";


  const botao =
    document.getElementById(
      "btnWhatsApp"
    );


  if (tudoPreenchido) {

    botao.disabled = false;

    botao.innerHTML =
      "📱 Enviar Pedido pelo WhatsApp";

  } else {

    botao.disabled = true;

    botao.innerHTML =
      "🔒 Preencha os dados para enviar";

  }
}


/* =========================
   ENVIAR WHATSAPP
========================= */

function enviarWhatsApp() {

  /* SEGURANÇA */

  if (carrinho.length === 0) {

    alert(
      "Adicione pelo menos um produto."
    );

    return;
  }


  const nome =
    document.getElementById(
      "nome"
    ).value.trim();


  const telefone =
    document.getElementById(
      "telefone"
    ).value.trim();


  const endereco =
    document.getElementById(
      "endereco"
    ).value.trim();


  const bairroElement =
    document.getElementById(
      "bairro"
    );


  const pagamento =
    document.getElementById(
      "pagamento"
    ).value;


  const observacoes =
    document.getElementById(
      "observacoes"
    ).value.trim();


  /* VERIFICAÇÃO */

  if (

    !nome ||

    !telefone ||

    !endereco ||

    !bairroElement.value ||

    !pagamento

  ) {

    alert(
      "Preencha todos os campos obrigatórios."
    );

    verificarFormulario();

    return;
  }


  /* BAIRRO */

  const bairro =
    bairroElement.options[
      bairroElement.selectedIndex
    ].text;


  /* PRODUTOS */

  let subtotal = 0;

  let produtos = "";


  carrinho.forEach(
    function(item) {


      const valor =
        item.preco *
        item.quantidade;


      subtotal += valor;


      produtos +=

        `• ${item.quantidade}x ` +

        `${item.nome} ` +

        `— R$ ${dinheiro(
          valor
        )}\n`;

    }
  );


  /* VALORES */

  const taxa =
    obterTaxa();


  const total =
    subtotal + taxa;


  /* =========================
     WHATSAPP DA EMPRESA
  ========================== */

  const numeroWhatsApp =
    "5512996785101";


  /* =========================
     MENSAGEM
  ========================== */

  const mensagem =

`🍱 *MARMITEX DA NANÁ*

━━━━━━━━━━━━━━━━

👤 *CLIENTE*

Nome: ${nome}
Telefone: ${telefone}

━━━━━━━━━━━━━━━━

📍 *ENTREGA*

Endereço: ${endereco}
Bairro: ${bairro}

━━━━━━━━━━━━━━━━

🍽️ *PEDIDO*

${produtos}
━━━━━━━━━━━━━━━━

💰 Subtotal: R$ ${dinheiro(
  subtotal
)}

🛵 Entrega: R$ ${dinheiro(
  taxa
)}

💵 *TOTAL: R$ ${dinheiro(
  total
)}*

━━━━━━━━━━━━━━━━

💳 *PAGAMENTO*

${pagamento}

━━━━━━━━━━━━━━━━

📝 *OBSERVAÇÕES*

${observacoes || "Nenhuma"}

━━━━━━━━━━━━━━━━

Obrigado por pedir com a
*Marmitex da Naná!* ❤️`;


  /* =========================
     ABRIR WHATSAPP
  ========================== */

  const url =

    "https://wa.me/" +

    numeroWhatsApp +

    "?text=" +

    encodeURIComponent(
      mensagem
    );


  window.open(
    url,
    "_blank"
  );
}


/* =========================
   ATUALIZAÇÃO AUTOMÁTICA
========================= */

document.addEventListener(
  "input",
  function() {

    verificarFormulario();

  }
);


document.addEventListener(
  "change",
  function() {

    verificarFormulario();

    atualizarCarrinho();

  }
);


/* =========================
   INICIAR
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    atualizarCarrinho();

    verificarFormulario();

  }
);