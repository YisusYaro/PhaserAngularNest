import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MoventsService } from './movents.service';
import { CreateMoventDto } from './dto/create-movent.dto';
import { UpdateMoventDto } from './dto/update-movent.dto';
import { Socket, Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { ConnectedSocket } from '@nestjs/websockets';


@WebSocketGateway({ cors: true, origin: 'http://localhost:3000' })
export class MoventsGateway {

  connectedPlayersByRoom: Map <string, string[]>

  constructor(private readonly moventsService: MoventsService) {

    this.connectedPlayersByRoom = new Map();

  }

  @WebSocketServer() server: Server;

  @SubscribeMessage('movent')
  movent(@MessageBody() movent: any, @ConnectedSocket() client: Socket) {
    client.join(movent.room);
    client.to(movent.room).emit('movent', movent); 
  }

  @SubscribeMessage('create-character')
  createCharacter(@MessageBody() newCharacter: any, @ConnectedSocket() client: Socket) {
    client.join(newCharacter.room);
    if (this.connectedPlayersByRoom.get(newCharacter.room) === undefined) {
      this.connectedPlayersByRoom.set(newCharacter.room, []);
    }
    if (!this.connectedPlayersByRoom.get(newCharacter.room).includes(newCharacter.id)) {
      this.connectedPlayersByRoom.get(newCharacter.room).push(newCharacter);
    }
    client.to(newCharacter.room).emit('create-character', newCharacter); 


    client.on('disconnect', async () => {
      const index = this.connectedPlayersByRoom.get(newCharacter.room).indexOf(newCharacter);
      if (index > -1) {
        this.connectedPlayersByRoom.get(newCharacter.room).splice(index, 1);
      }
      this.server.to(newCharacter.room).emit('get-current-characters', this.connectedPlayersByRoom.get(newCharacter.room)); //emit to all including sender
    });

  }

  @SubscribeMessage('get-current-characters')
  getCurrentCharacters(@MessageBody() room: any, @ConnectedSocket() client: Socket) {
    console.log(room.room);
    if(this.connectedPlayersByRoom.get(room.room) === undefined){
      client.emit('get-current-characters', []);
    }
    else{
      client.emit('get-current-characters', this.connectedPlayersByRoom.get(room.room));
    }
  }

  // @SubscribeMessage('findAllMovents')
  // findAll() {
  //   return this.moventsService.findAll();
  // }

  // @SubscribeMessage('findOneMovent')
  // findOne(@MessageBody() id: number) {
  //   return this.moventsService.findOne(id);
  // }

  // @SubscribeMessage('updateMovent')
  // update(@MessageBody() updateMoventDto: UpdateMoventDto) {
  //   return this.moventsService.update(updateMoventDto.id, updateMoventDto);
  // }

  // @SubscribeMessage('removeMovent')
  // remove(@MessageBody() id: number) {
  //   return this.moventsService.remove(id);
  // }
}
