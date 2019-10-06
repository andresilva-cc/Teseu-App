export default {
  
  /** SECTION TITLES */
  myContacts: 'Meus Contatos',
  addContact: 'Adicionar Contato',
  myPlaces: 'Meus Locais',
  addPlace: 'Adicionar Local',
  alerts: 'Alertas',
  registerOccurrence: 'Registrar Ocorrência',
  pickLocation: 'Escolher Localização',
  

  /** SECTION MESSAGES */
  // Register Occurrence
  registerOccurrenceDetailMessage: 'Detalhar o que aconteceu comigo ou com outra pessoa',
  registerOccurrenceEmergencyMessage: 'Estou em uma emergência',
  registerOccurrenceEmergencyBottomMessage: 'Avisar meus contatos',

  // My Contacts
  myContactsMessage: 'Um contato é alguém que receberá notificações via aplicativo e/ou SMS caso você alerte que está em perigo ou cadastre uma ocorrência com a opção "Notificar contatos" selecionada',
  myContactsNoResults: 'Nenhum contato cadastrado ainda',
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
  // My Contacts
  myContactsNoPhoneDialogTitle: 'Nenhum número encontrado',
  myContactsNoPhoneDialogMessage: 'O contato escolhido não possui nenhum número, escolha outro ou adicione um número ao contato',
  myContactsMultiplePhonesDialogTitle: 'Erro',
  myContactsMultiplePhonesDialogMessage: 'O contato possui {quantity} números. Ainda não é possível adicionar contatos com mais de um número :(',
  myContactsUnsupportedFormatDialogTitle: 'Formato desconhecido',
  myContactsUnsupportedFormatDialogMessage: 'O número possui um formato desconhecido. Clique em OK e corrija-o na próxima tela',
  myContactsConfirmPhoneDialogTitle: 'Confirmar número',
  myContactsConfirmPhoneDialogMessage: 'O número de seu contato foi formatado, isto está certo?\n\n{name}\n{phone}',
  myContactsAddDialogTitle: 'Contato Adicionado',
  myContactsAddDialogMessage: 'O seu contato foi adicionado com sucesso, você pode visualizá-lo na lista de contatos',
  myContactsConfirmDeleteDialogTitle: 'Deletar Contato',
  myContactsConfirmDeleteDialogMessage: 'Você tem certeza que deseja deletar o contato {name}?',
  myContactsDeleteDialogTitle: 'Contato Deletado',
  myContactsDeleteDialogMessage: 'O contato foi deletado com sucesso',
  
  // My Places
  myPlacesAddDialogTitle: 'Local Adicionado',
  myPlacesAddDialogMessage: 'O seu local foi adicionado com sucesso, você pode visualizá-lo na lista de locais',
  myPlacesConfirmDeleteDialogTitle: 'Deletar Local',
  myPlacesConfirmDeleteDialogMessage: 'Você tem certeza que deseja deletar o local {name}?',
  myPlacesDeleteDialogTitle: 'Local Deletado',
  myPlacesDeleteDialogMessage: 'O local foi deletado com sucesso',


  // Alerts
  alertsSaveDialogTitle: 'Configurações Salvas',
  alertsSaveDialogMessage: 'Suas configurações foram salvas com sucesso'
}