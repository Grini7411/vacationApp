import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');


export function raiseRefresh() {
  socket.emit('refreshRequired',{})
}

function subscribeToRefresh(cb) {
    socket.on('refresh', msg => {
      cb()
      console.log("yes")}
    )
    
  }
  export { subscribeToRefresh };
  