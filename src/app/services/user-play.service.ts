import { Injectable } from '@angular/core';
import { IPoint, IReversi } from '../models/game-table.model';
import { ComputerPlayService } from './computer-play.service';
import { UserPlayService } from './play-table.service';

@Injectable({
  providedIn: 'root',
})
export class PlayTableService {

  constructor(private userPlayService: UserPlayService, private computerPlayService: ComputerPlayService) {
   
  }

  playWithCell = (point: IPoint, table: IReversi[][]) => {
    if(table[point.Row][point.Column].value === ''){
      this.userPlayService.playGame(point,table,'X');
      setTimeout(() => {
        this.computerPlayService.computerPlay(table);
      }, 1000);
    }
  } 

}