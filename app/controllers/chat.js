module.exports.iniciaChat = (application, req, res) => {

  var dadosForm = req.body
  
  req.assert('apelido', 'Apelido é Obrigatório.').notEmpty()
  req.assert('apelido', 'Apelido deve conter entre 6 e 15 caracteres.').len(6, 15)

  var erros = req.validationErrors()

  if(erros){
    res.render('index', {validacao : erros})
    return
  }

  application.get('io').emit(
    'msgParaCliente',
    {apelido: dadosForm.apelido, mensagem: 'Entrou'}
   )

  res.render('chat', {dadosForm: dadosForm})
 
}