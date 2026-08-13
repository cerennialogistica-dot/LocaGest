SISTEMA DE GESTÃO DE LOCAÇÃO DE IMÓVEIS — ETAPA 3

Abra o arquivo index.html em um navegador moderno.

Principais recursos:
- Cadastros de locadores, locatários, imóveis, condomínios, contratos e despesas.
- Unidade consumidora, medidor e tarifa padrão no cadastro do imóvel.
- Recibo com aluguel, condomínio, IPTU, água, outras despesas e energia elétrica.
- Cálculo automático: consumo = leitura atual - leitura anterior.
- Cálculo automático do valor da energia pela tarifa por kWh.
- Histórico de recibos e status Pago/Em aberto.
- Dashboard com valores recebidos, atrasados, condomínio, IPTU e despesas.
- Dados salvos localmente no navegador (localStorage).

Ordem recomendada de cadastro:
Locadores > Locatários > Condomínios > Imóveis > Contratos > Recibos.


CORREÇÕES DA REVISÃO:
- Corrigido erro que impedia salvar novos cadastros e recibos (Utils.id inexistente).
- Impressão/PDF refeita em janela própria.
- JavaScript validado sintaticamente.


VERSÃO CONFIGURAÇÕES FUNCIONAIS:
- Dados da empresa e logomarca salvos no navegador.
- Tarifa de energia e boleto aplicados automaticamente.
- Personalização do recibo.
- Prazo do dashboard configurável.
- Backup JSON com exportação e restauração.
- Limpeza de cadastros preservando configurações.


VERSÃO 1.2 — MENSALIDADES E BAIXAS
- Conta de luz simplificada: informar apenas kWh utilizados e tarifa; total calculado automaticamente.
- Mensalidades criadas automaticamente para todos os meses de cada contrato ativo.
- Tela Mensalidades com status Em aberto / Em atraso / Pago.
- Botão Dar baixa: informa data e forma de pagamento, IPTU opcional, kWh, tarifa, água e outras despesas.
- Ao confirmar a baixa, o recibo é gerado e aberto para impressão/PDF.
- Baixa pode ser estornada.
- Seletor rápido de locador no topo: Todos os locadores ou um locador específico.
- Dashboard passa a respeitar o locador selecionado.


VERSÃO 1.3 — LOGIN POR LOCADOR
- Cada locador possui login próprio por senha.
- Não existe administrador nem diferença de permissões.
- Todos os logins possuem as mesmas funções.
- Login serve exclusivamente para separar os dados.
- Removido seletor de locador do topo.
- Imóveis e contratos novos ficam automaticamente vinculados ao locador logado.
- Dashboard, mensalidades, despesas e recibos são filtrados pelo ambiente do locador.
- Locadores já cadastrados sem senha usam inicialmente a senha 1234; altere em Meu cadastro.
- Sessão encerra ao fechar a aba/navegador.


CORREÇÃO V1.3.1
- Corrigido botão Criar locador no primeiro acesso.
- O primeiro cadastro agora acontece diretamente na tela de login, sem modal oculto.
- Incluído botão Criar outro locador na tela de login.
- Após criar o locador, o sistema entra automaticamente no ambiente correspondente.


V1.3.3 — PERFIL DO LOCADOR
- Removida a necessidade de cadastrar/selecionar locador dentro do ambiente.
- Cada login continua representando um único locador.
- Meu cadastro agora é uma tela exclusiva para editar o próprio perfil e senha.
- Imóveis e contratos recebem automaticamente o locador logado, sem campo de seleção.
- Novos locadores continuam sendo criados somente na tela de login.


V1.3.4 — RECIBOS SIMPLIFICADOS
- Removido o formulário manual de criação de recibo.
- Recibos passam a ser gerados pela baixa da mensalidade.
- Tela Recibos agora é um histórico.
- Filtros por pesquisa, locatário, imóvel e mês.
- Visualização do recibo em janela própria.
- Reimpressão e geração de PDF pelo histórico.
- Atalho direto para Mensalidades.


V1.3.5 — CORREÇÃO DE LOCATÁRIOS
- Corrigido cadastro de locatário que não aparecia na tela após salvar.
- Todo novo locatário agora é vinculado automaticamente ao locador logado.
- O locatário aparece imediatamente na lista, mesmo sem contrato criado.
- Mantida compatibilidade com locatários antigos que já estejam ligados a contratos.


V1.3.6 — NOME DAS UNIDADES / IMÓVEIS
- Adicionado campo obrigatório Nome do imóvel / unidade.
- Permite várias lojas, salas ou pontos de aluguel no mesmo endereço.
- O nome da unidade passa a ser a identificação principal.
- Contratos, mensalidades, recibos e despesas exibem Nome da unidade — Endereço.
- A lista de imóveis mostra Nome/Unidade, Endereço, Cidade e Situação.
- Imóveis antigos sem nome recebem provisoriamente Unidade 01, Unidade 02 etc. e podem ser editados.


V1.3.7 — CONDOMÍNIO AUTOMÁTICO NO CONTRATO
- Ao selecionar o imóvel no contrato, o sistema identifica o condomínio vinculado ao imóvel.
- O Valor do condomínio é preenchido automaticamente usando o valor fixo do cadastro de Condomínios.
- O campo fica somente leitura no contrato para evitar digitação divergente.
- Ao trocar o imóvel, o valor é atualizado automaticamente.
- Imóvel sem condomínio vinculado recebe R$ 0,00.
- Alterações futuras do valor devem ser feitas no cadastro de Condomínios.


V1.3.8 — OUTRAS COBRANÇAS IDENTIFICADAS
- Substituído o campo único Outras despesas por Outras cobranças.
- Botão + Adicionar cobrança permite criar quantas cobranças extras forem necessárias.
- Cada cobrança possui Descrição e Valor.
- Cada linha pode ser removida antes da confirmação.
- Total a receber é recalculado automaticamente.
- Recibo detalha cada cobrança extra separadamente.
- Recibos antigos com Outras despesas continuam compatíveis.


V1.3.9 — ORDEM DE VENCIMENTO E MODAIS PROTEGIDOS
- Mensalidades agora são exibidas do vencimento mais próximo para o mais distante.
- Meses mais antigos/próximos ficam no topo da lista.
- Clicar fora de uma janela de cadastro não fecha mais o formulário.
- A proteção vale também para Dar baixa e demais janelas do sistema.
- Janelas fecham apenas por X, Cancelar ou após concluir/salvar a operação.


V1.4.0 — RECIBO PROFISSIONAL
- Novo layout A4 profissional para recibos.
- Cabeçalho com dados do locador, logomarca e identificação do documento.
- Número automático sequencial por ano: REC-AAAA-0001.
- Competência, locatário e imóvel/unidade destacados.
- Quadro com período, vencimento, pagamento e forma de pagamento.
- Demonstrativo financeiro organizado.
- Energia detalhada com kWh, tarifa, UC/medidor e valor.
- Outras cobranças permanecem identificadas individualmente.
- Total pago em destaque.
- Declaração formal de quitação e área de assinatura.
- Impressão/PDF otimizada para papel A4.


V1.4.1 — PERFIS INDEPENDENTES E MÁSCARAS
- Meu Cadastro é individual por login/locador.
- Configurações e dados usados nos recibos também são separados por login.
- Trocar de login carrega somente o perfil e as configurações daquele locador.
- Locatários, imóveis, condomínios, contratos e despesas são vinculados ao ambiente atual.
- Listas de seleção respeitam o login atual, evitando cruzamento de cadastros.
- Máscara automática de CPF: 000.000.000-00.
- Máscara automática de CNPJ: 00.000.000/0000-00.
- Máscara automática de celular: (00) 00000-0000.
- Máscara automática de telefone fixo: (00) 0000-0000.
- Máscara automática de CEP: 00000-000.
- Máscaras aplicadas também ao Meu Cadastro, locatários e criação de novos logins.


V1.4.2 — AJUSTE DE ALINHAMENTO
- Corrigido alinhamento da tela Meu Cadastro.
- Duas colunas com mesma largura.
- Campos, labels e bordas alinhados.
- Endereço e Observações ocupam corretamente a largura total.
- Botão Salvar alinhado ao rodapé do formulário.
- Mantida adaptação para celular em uma única coluna.

V1.5.0 — REVISÃO FINAL / PRODUÇÃO
- Limpeza automática, uma única vez, dos dados operacionais usados nos testes.
- Mantidos os logins dos locadores, Meu Cadastro e Configurações de cada login.
- Locatários, imóveis, condomínios, contratos, mensalidades, despesas e recibos começam limpos.
- Corrigido botão superior de Salvar Configurações.
- Corrigida opção Limpar cadastros: agora limpa somente o ambiente do login atual e não apaga o acesso.
- Exportação CSV passa a exportar somente os registros do login atual.
- Ordenação não interfere nos registros de outros logins.
- Exclusão protegida: imóvel/locatário com contrato não pode ser excluído; contrato com pagamentos deve ser encerrado, não excluído.
- Removida função antiga de recibo que referenciava formulário já desativado.
- Removida notificação sem função da barra superior.
- Mensalidades simplificadas sem coluna redundante do locador.
- Dashboard ajustado para considerar despesas vinculadas diretamente ao login.
- Refinamento visual geral: cards, tabelas, formulários, modais, botões, espaçamentos e responsividade.
- Validação de sintaxe executada em todos os arquivos JavaScript.
