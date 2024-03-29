export default {
  
  /** SECTION TITLES */
  myContacts: 'Meus Contatos',
  addContact: 'Adicionar Contato',
  myPlaces: 'Meus Locais',
  addPlace: 'Adicionar Local',
  alerts: 'Alertas',
  registerOccurrence: 'Registrar Ocorrência',
  viewOccurrence: 'Ocorrência',
  reportOccurrence: 'Denunciar Ocorrência',
  pickLocation: 'Escolher Localização',
  

  /** SECTION MESSAGES */
  // Map
  noOccurrences: 'Ufa, nenhuma ocorrência aqui',

  // Emergency Mode
  emergencyMode: 'Modo de Emergência',
  emergencyModeDisable: 'Clique aqui para desativar',
  emergencyModeEnabled: 'Modo de emergência ativado',
  emergencyModeDisabled: 'Modo de emergência desativado',

  // Register Occurrence
  registerOccurrenceDetailMessage: 'Detalhar o que aconteceu comigo ou com outra pessoa',
  registerOccurrenceEmergencyMessage: 'Estou em uma emergência',
  registerOccurrenceEmergencyBottomMessage: 'Avisar meus contatos',

  // Detail Occurrence
  detailOccurrenceMessage: 'Forneça o maior número de detalhes possíveis para que os outros usuários possam ficar atentos ao perigo',
  detailOccurrenceVictim: 'Eu',
  detailOccurrenceNotVictim: 'Outra pessoa',
  detailOccurrenceWhenNow: 'Agora',
  detailOccurrenceWhenHalfHourAgo: '30 minutos atrás',
  detailOccurrenceWhenMoreThanAHourAgo: 'Mais de 1 hora atrás',
  
  // View Occurrence
  viewOccurrenceReport: 'Denunciar',
  viewOccurrenceAlreadyReported: 'Esta ocorrência já foi denunciada',
  viewOccurrenceVictim: 'Com ele(a) mesmo(a)',
  viewOccurrenceNotVictim: 'Com outra pessoa',
  viewOccurrenceReactions: 'Reações',
  viewOccurrenceReaction0: 'Curtir',
  viewOccurrenceReaction1: 'Ainda acontecendo',
  viewOccurrenceReaction2: 'Não está mais acontecendo',
  viewOccurrenceReacted: 'Você reagiu com "{reaction}"',
  viewOccurrenceDisreacted: 'Você removeu a reação "{reaction}"',
  viewOccurrenceOppositeReaction: 'Já existe uma reação oposta',
  viewOccurrenceComments: 'Comentários',
  viewOccurrenceNewCommentPlaceholder: 'Escreva seu comentário aqui...',
  viewOccurrenceNoComments: 'Nenhum comentário foi encontrado',
  viewOccurrenceCommentConfirmDeleteDialogTitle: 'Deletar Comentário',
  viewOccurrenceCommentConfirmDeleteDialogMessage: 'Você tem certeza que deseja deletar o seu comentário?',

  // Report Occurrence
  reportOccurrenceDescriptionHint: 'Descreva sua denúncia...',
  reportOccurrenceSendSuccess: 'Sua denúncia foi enviada',

  // My Contacts
  myContactsMessage: 'Um contato é alguém que receberá notificações via aplicativo e/ou SMS caso você alerte que está em perigo ou cadastre uma ocorrência com a opção "Notificar contatos" selecionada',
  myContactsNoResults: 'Nenhum contato cadastrado ainda',
  myContactsPickNumber: 'Escolha um número',
  myContactsCreateMessage: 'Corrija os dados do seu contato para adicioná-lo',
  myContactsImportedNumber: 'Número importado:',
  
  // My Places
  myPlacesMessage: 'Um local é uma localização onde você receberá notificações de ocorrências registradas próximas ao local, de acordo com a distância e categorias definidas por você.',
  myPlacesNoResults: 'Nenhum local cadastrado ainda',
  
  // Alerts
  alertsMessage: 'Aqui você pode configurar os alertas que você recebe do aplicativo',
  alertsOnlyWhenAppIsOpened: 'Apenas se o app estiver aberto',
  alertsEvenWhenAppIsClosed: 'Mesmo que o app esteja fechado',


  /** DIALOGS */
  // Emergency Mode
  emergencyModeEnableDialogMessage: 'Seus contatos serão alertados que você está em uma emergência',
  emergencyModeDisableDialogMessage: 'O modo de emergência será desativado e seus contatos serão notificados',

  // Detail Occurrence
  detailOccurrenceRegisterDialogTitle: 'Ocorrência Registrada',
  detailOccurrenceRegisterDialogMessage: 'Sua ocorrência foi registrada com sucesso',

  // My Contacts
  myContactsNoPhoneDialogTitle: 'Nenhum número encontrado',
  myContactsNoPhoneDialogMessage: 'O contato escolhido não possui nenhum número, escolha outro ou adicione um número ao contato',
  myContactsUnsupportedFormatDialogTitle: 'Formato desconhecido',
  myContactsUnsupportedFormatDialogMessage: 'O número possui um formato desconhecido. Clique em OK e corrija-o na próxima tela',
  myContactsConfirmPhoneDialogTitle: 'Confirmar número',
  myContactsConfirmPhoneDialogMessage: 'O número de seu contato foi formatado, isto está certo?\n\n{name}\n{phone}',
  myContactsAddDialogTitle: 'Contato Adicionado',
  myContactsAddDialogMessage: 'O seu contato foi adicionado com sucesso, você pode visualizá-lo na lista de contatos',
  myContactsConfirmDeleteDialogTitle: 'Deletar Contato',
  myContactsConfirmDeleteDialogMessage: 'Você tem certeza que deseja deletar o contato {name}?',
  myContactsDeleteDialogMessage: 'O contato foi deletado com sucesso',
  
  // My Places
  myPlacesAddDialogTitle: 'Local Adicionado',
  myPlacesAddDialogMessage: 'O seu local foi adicionado com sucesso, você pode visualizá-lo na lista de locais',
  myPlacesConfirmDeleteDialogTitle: 'Deletar Local',
  myPlacesConfirmDeleteDialogMessage: 'Você tem certeza que deseja deletar o local {name}?',
  myPlacesDeleteDialogMessage: 'O local foi deletado com sucesso',


  // Alerts
  alertsSaveDialogTitle: 'Configurações Salvas',
  alertsSaveDialogMessage: 'Suas configurações foram salvas com sucesso'
}