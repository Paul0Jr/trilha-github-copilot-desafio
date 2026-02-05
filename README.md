# 💳 Validador de Cartão de Crédito

Um validador robusto e profissional de cartões de crédito em Node.js que implementa o **algoritmo de Luhn** e suporta **10 bandeiras internacionais**. Ideal para projetos que precisam validar dados de cartão com segurança.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Bandeiras Suportadas](#bandeiras-suportadas)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Exemplos de Uso](#exemplos-de-uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Algoritmo de Luhn](#algoritmo-de-luhn)
- [API Reference](#api-reference)
- [Exemplos de Números de Teste](#exemplos-de-números-de-teste)
- [Segurança](#segurança)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## 🎯 Visão Geral

Este projeto é um validador de cartão de crédito completo que:

- ✅ Identifica automaticamente a bandeira do cartão
- ✅ Valida o número usando o **algoritmo de Luhn**
- ✅ Verifica o comprimento específico de cada bandeira
- ✅ Fornece feedback detalhado sobre erros
- ✅ Mascara números de cartão para segurança
- ✅ Interface interativa via terminal
- ✅ Totalmente modular e exportável para outros projetos

Perfeito para:
- Gateways de pagamento
- Processadores de cartão
- Plataformas de e-commerce
- Projetos de educação em segurança

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🔍 **Detecção de Bandeira** | Identifica automaticamente a bandeira do cartão |
| ✔️ **Validação de Luhn** | Implementa o algoritmo padrão internacional de checksum |
| 📏 **Validação de Comprimento** | Verifica se o número tem o comprimento correto para a bandeira |
| 🔒 **Mascaramento** | Exibe apenas 4 primeiros e 4 últimos dígitos |
| 📊 **Formatação** | Formata números em grupos de 4 dígitos |
| 🎨 **Interface Interativa** | Entrada de dados via terminal com feedback visual |
| 📦 **Modular** | Funções exportáveis para uso em outros projetos |

---

## 💳 Bandeiras Suportadas

### Bandeiras Internacionais

| Bandeira | Início | Comprimento | Status |
|----------|--------|-------------|--------|
| **Visa** | 4 | 13, 16 | ✅ Suportada |
| **MasterCard** | 51-55, 2221-2720 | 16 | ✅ Suportada |
| **American Express** | 34, 37 | 15 | ✅ Suportada |
| **Discover** | 6011, 65, 644-649, 622126-622925 | 16 | ✅ Suportada |
| **Diners Club** | 36, 38, 39 | 14 | ✅ Suportada |
| **JCB** | 3528-3589 | 16-19 | ✅ Suportada |
| **Voyager** | 36 | 14 | ✅ Suportada |
| **EnRoute** | 2014, 2149 | 15 | ✅ Suportada |
| **HiperCard** | 6062 | 16-19 | ✅ Suportada |
| **Aura** | 5078 | 19 | ✅ Suportada |

---

## 📦 Requisitos

- **Node.js**: v14.0 ou superior
- **npm**: v6.0 ou superior
- Nenhuma dependência externa

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/validador-cartao.git
cd validador-cartao