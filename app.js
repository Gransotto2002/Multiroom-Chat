var app = require('./config/server')










/* Porta de escuta */

var server = app.listen(3000, () => {
  console.log('Servidor On na portal 3000');
})

const io = require('socket.io')(server)
app.set('io', io)
/* Criando conexão por Websocket */

io.on('connection', socket => {
  socket.on('msgParaServidor', data => {
    socket.emit('msgParaCliente', {apelido : data.apelido, mensagem : data.mensagem})
    socket.broadcast.emit('msgParaCliente', {apelido : data.apelido, mensagem : data.mensagem})

    if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
      socket.emit('participantesParaCliente', {apelido : data.apelido})
      socket.broadcast.emit('participantesParaCliente', {apelido : data.apelido})
    }  
  })

})

