import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { Scene } from './scene';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;


  constructor(private webSocketService: WebSocketService) { 

    this.config = {
      type: Phaser.AUTO,
      width: 454,
      height: 313,
      scene: [ Scene ],
      parent: 'gameContainer',
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    };
    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnInit(): void {

  }

}
