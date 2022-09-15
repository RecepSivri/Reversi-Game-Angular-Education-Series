import { Injectable } from '@angular/core';
import { IPoint, IReversi } from '../models/game-table.model';
import { UserPlayService } from './play-table.service';

@Injectable({
  providedIn: 'root',
})
export class ComputerPlayService {

  piece!: string;
  oppositePiece!: string;

  constructor(private userPlayService: UserPlayService) { 
  }

  choosePiece(piece: string){
    this.piece = piece;

    if(this.piece === 'X'){
      this.oppositePiece = 'O'
    }else{
      this.oppositePiece = 'X'
    }
  }

  computerPlay(table: IReversi[][]){

    this.choosePiece('O');
    for(let i = 0; i < table.length; ++i){
      for(let j = 0; j < table[0].length; ++j){
        if(table[i][j].value === ''){
          table[i][j].maxMovement = this.getMovementCount(i,j, table);
        }
      }
    }
    const point = this.findmaxPoint(table);
    if(point){
      this.userPlayService.playGame(point, table, 'O');
      this.playUserWhiteAudio();
    }

    this.resetMaxMovement(table);
  }

  returnMovementCountCell = (point: IPoint, table: IReversi[][], piece: string) => {
    this.choosePiece(piece);
    return this.getMovementCount(point.Row, point.Column, table);
  }

  getTotalMovementAbility(table: IReversi[][], piece: string){
    this.choosePiece(piece);
    let total = 0;
    for(let i = 0; i < table.length; ++i){
      for(let j = 0; j < table[0].length; ++j){
        if(table[i][j].value === ''){
          total += this.getMovementCount(i,j, table);
        }
      }
    }

    return total;
  }

  resetMaxMovement(table: IReversi[][]){
    for(let i = 0; i < table.length; ++i){
      for(let j = 0; j < table[0].length; ++j){
          table[i][j].maxMovement = 0;
      }
    }
  }

  findmaxPoint(table: IReversi[][]){
    let max:number = 0;
    let maxPoint: IPoint | undefined = undefined;
    for(let i = 0; i < table.length; ++i){
      for(let j = 0; j < table[0].length; ++j){
          if( max < table[i][j].maxMovement){
            maxPoint = {Row:i, Column: j };
          }
      }
    }

    return maxPoint;
  }

  getMovementCount(row: number, column:number, table: IReversi[][]){
    const columnDown = this.checkWithColumnDown({Row:row, Column:column}, table);
    const columnUp = this.checkWithColumnUp({Row:row, Column:column}, table);
    const rowRight = this.checkWithRowRight({Row:row, Column:column}, table);
    const rowLeft = this.checkWithRowLeft({Row:row, Column:column}, table);
    const upLeft = this.checkWithUpLeft({Row:row, Column:column}, table);
    const downRight =  this.checkWithDownRight({Row:row, Column:column}, table);
    const upRight = this.checkWithUpRight({Row:row, Column:column}, table);
    const downLeft = this.checkWithDownLeft({Row:row, Column:column}, table)
    return  columnDown + columnUp + rowRight + rowLeft + upLeft + downRight + upRight + downLeft;
  }


  playUserWhiteAudio(){
    let audio = new Audio();
    audio.src = "../../assets/sound-1.mp3";
    audio.load();
    audio.play();
  }

  checkWithColumnDown(point: IPoint, table: IReversi[][]){
    let i = point.Row-1;
    let counter = 0;
    while(i >= 0 && table[i][point.Column].value === this.oppositePiece){
      --i;
      ++counter;
    }
    if(i >= 0 && table[i][point.Column].value === this.piece && counter > 0){
      return counter;
    }else
    return 0;
  }

  checkWithColumnUp(point: IPoint, table: IReversi[][]){
    let i = point.Row+1;
    let counter = 0;
    while(i < table.length && table[i][point.Column].value === this.oppositePiece){
      ++i;
      ++counter;
    }
    if(i < table.length && table[i][point.Column].value === this.piece && counter > 0){
      return counter;
    }else
    return 0;
  }

  checkWithRowRight(point: IPoint, table: IReversi[][]){
    let i = point.Column-1;
    let counter = 0;
    while(i >= 0 && table[point.Row][i].value === this.oppositePiece){
      --i;
      ++counter;
    }
    if(i >= 0 &&  table[point.Row][i].value === this.piece && counter > 0){
      return counter;
    }else
    return 0;
  }

  checkWithRowLeft(point: IPoint, table: IReversi[][]){
    let i = point.Column+1;
    let counter = 0;
    while(i < table.length && table[point.Row][i].value === this.oppositePiece){
      ++i;
      ++counter;
    }
    if(i < table.length && table[point.Row][i].value=== this.piece && counter > 0){
      return counter;
    }else
    return 0;
  }

  checkWithUpLeft(point: IPoint, table: IReversi[][]){
    let i = point.Row+1;
    let j = point.Column+1;
    let counter = 0;
    while(i < table.length && j < table.length && table[i][j].value === this.oppositePiece){
      ++i;
      ++j;
      ++counter;
    }
    if(i < table.length && j < table.length && table[i][j].value === this.piece && counter > 0){
      return counter;
    }else
    return 0;
  }

  checkWithDownRight(point: IPoint, table: IReversi[][]){
    let i = point.Row-1;
    let j = point.Column-1;
    let counter = 0;
    while(i >= 0 && j >=0 && table[i][j].value === this.oppositePiece){
      --i;
      --j;
      ++counter;
    }
    if(i >= 0 && j >= 0 && table[i][j].value === this.piece && counter > 0){
      return counter;
    }else
    return 0;
  }

  checkWithUpRight(point: IPoint, table: IReversi[][]){
    let i = point.Row-1;
    let j = point.Column+1;
    let counter = 0;
    while(i >= 0 && j < table.length && table[i][j].value === this.oppositePiece){
      --i;
      ++j;
      ++counter;
    }
    if(i >= 0 && j < table.length && table[i][j].value === this.piece && counter > 0){
      return counter;
    }else
    return 0;
  }

  checkWithDownLeft(point: IPoint, table: IReversi[][]){
    let i = point.Row+1;
    let j = point.Column-1;
    let counter = 0;
    while(i < table.length && j >=0 && table[i][j].value === this.oppositePiece){
      ++i;
      --j;
      ++counter;
    }
    if(i < table.length && j >=0 && table[i][j].value === this.piece && counter > 0){
      return counter;
    }else
    return 0;
  }
}