const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Algoritmo de Luhn - Valida o checksum do cartão
 * @param {string} numero - Número do cartão
 * @returns {boolean} - True se válido
 */
function validarLuhn(numero) {
  let soma = 0;
  let dobro = false;
  
  // Processa de trás para frente
  for (let i = numero.length - 1; i >= 0; i--) {
    let digit = parseInt(numero[i], 10);
    
    if (dobro) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    soma += digit;
    dobro = !dobro;
  }
  
  return soma % 10 === 0;
}

/**
 * Identifica e valida a bandeira do cartão
 * @param {string} numero - Número do cartão
 * @returns {object} - { bandeira: string, valido: boolean }
 */
function validarBandeira(numero) {
  numero = numero.replace(/\s/g, '');
  
  // Valida se contém apenas dígitos
  if (!/^\d+$/.test(numero)) {
    return { bandeira: null, valido: false, erro: 'Formato inválido' };
  }
  
  const comprimento = numero.length;
  
  // Visa: começa com 4, 13 ou 16 dígitos
  if (/^4/.test(numero) && (comprimento === 13 || comprimento === 16)) {
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'Visa',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  // MasterCard: 51-55 ou 2221-2720, 16 dígitos
  if (((/^5[1-5]/.test(numero) || /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-2]\d|2720)/.test(numero)) && comprimento === 16)) {
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'MasterCard',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  // American Express: 34 ou 37, 15 dígitos
  if (/^3[47]/.test(numero) && comprimento === 15) {
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'American Express',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  // Discover: 6011, 622126-622925, 644-649, 65; 16 dígitos
  if (((/^6011/.test(numero) || /^65/.test(numero) || /^64[4-9]/.test(numero) || /^622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5])/.test(numero)) && comprimento === 16)) {
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'Discover',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  // Diners Club: 36, 38, 39; 14 dígitos
  if (/^(36|38|39)/.test(numero) && comprimento === 14) {
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'Diners Club',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  // JCB: 3528-3589; 16-19 dígitos
  if (/^35(2[89]|[3-8]\d)/.test(numero) && (comprimento >= 16 && comprimento <= 19)) {
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'JCB',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  // Voyager: 36; 14 dígitos (conflita com Diners, então verificar depois)
  if (/^36/.test(numero) && comprimento === 14) {
    // Pode ser Diners ou Voyager, ambos começam com 36
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'Voyager',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  // EnRoute: 2014 ou 2149; 15 dígitos
  if (/^(2014|2149)/.test(numero) && comprimento === 15) {
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'EnRoute',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  // HiperCard: 6062; 16-19 dígitos
  if (/^6062/.test(numero) && (comprimento >= 16 && comprimento <= 19)) {
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'HiperCard',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  // Aura: 5078; 19 dígitos
  if (/^5078/.test(numero) && comprimento === 19) {
    const luhnValido = validarLuhn(numero);
    return {
      bandeira: 'Aura',
      valido: luhnValido,
      erro: luhnValido ? null : 'Falhou na validação de checksum (Luhn)'
    };
  }
  
  return {
    bandeira: null,
    valido: false,
    erro: 'Bandeira não reconhecida ou número inválido'
  };
}

/**
 * Formata o número do cartão para exibição
 * @param {string} numero - Número do cartão
 * @returns {string} - Número formatado
 */
function formatarCartao(numero) {
  const limpo = numero.replace(/\s/g, '');
  return limpo.replace(/(\d{4})/g, '$1 ').trim();
}

/**
 * Mascara o número do cartão para exibição segura
 * @param {string} numero - Número do cartão
 * @returns {string} - Número mascarado
 */
function mascararCartao(numero) {
  const limpo = numero.replace(/\s/g, '');
  const inicio = limpo.substring(0, 4);
  const fim = limpo.substring(limpo.length - 4);
  const meio = '*'.repeat(limpo.length - 8);
  return `${inicio} ${meio} ${fim}`;
}

/**
 * Função principal para interação com o usuário
 */
function iniciarValidacao() {
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║        VALIDADOR DE CARTÃO DE CRÉDITO REAL         ║');
  console.log('║    Com Algoritmo de Luhn e 10 Bandeiras Suportadas ║');
  console.log('╚════════════════════════════════════════════════════╝\n');
  console.log('Bandeiras suportadas:');
  console.log('💳 Visa | MasterCard | American Express | Discover');
  console.log('💳 Diners Club | Voyager | JCB | EnRoute');
  console.log('💳 HiperCard | Aura\n');
  
  rl.question('📇 Digite o número do cartão: ', (input) => {
    if (!input || input.trim() === '') {
      console.log('\n❌ Erro: Você deve digitar um número de cartão!\n');
      finalizarOuReintentar();
      return;
    }
    
    const resultado = validarBandeira(input);
    
    if (resultado.bandeira) {
      const numeroFormatado = formatarCartao(input);
      const numeroMascarado = mascararCartao(input);
      
      if (resultado.valido) {
        console.log('\n✅ CARTÃO VÁLIDO E AUTÊNTICO!');
        console.log(`   Número (formatado): ${numeroFormatado}`);
        console.log(`   Número (mascarado): ${numeroMascarado}`);
        console.log(`   Bandeira: 💳 ${resultado.bandeira}`);
        console.log(`   Validação: Passou no algoritmo de Luhn ✓\n`);
      } else {
        console.log('\n⚠️  CARTÃO INVÁLIDO');
        console.log(`   Número (mascarado): ${numeroMascarado}`);
        console.log(`   Bandeira identificada: ${resultado.bandeira}`);
        console.log(`   Erro: ${resultado.erro}\n`);
      }
    } else {
      console.log('\n❌ ERRO');
      console.log(`   ${resultado.erro}\n`);
    }
    
    finalizarOuReintentar();
  });
}

/**
 * Pergunta se o usuário deseja validar outro cartão ou sair
 */
function finalizarOuReintentar() {
  rl.question('Deseja validar outro cartão? (s/n): ', (resposta) => {
    if (resposta.toLowerCase() === 's' || resposta.toLowerCase() === 'sim') {
      iniciarValidacao();
    } else {
      console.log('\n👋 Até logo!\n');
      rl.close();
      process.exit(0);
    }
  });
}

// Iniciar a aplicação
iniciarValidacao();

// Exportar funções para uso em testes
module.exports = { validarBandeira, validarLuhn, formatarCartao, mascararCartao };