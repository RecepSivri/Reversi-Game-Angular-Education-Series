import { Injectable } from '@angular/core';
import { IPoint, IReversi } from '../models/game-table.model';

@Injectable({
  providedIn: 'root',
})
export class UserPlayService {


  constructor() { }

  piece!: string;
  oppositePiece!: string;
  choosePiece(piece: string){
    this.piece = piece;

    if(this.piece === 'X'){
      this.oppositePiece = 'O'
    }else{
      this.oppositePiece = 'X'
    }
  }
  
  playGame(point: IPoint,table: IReversi[][], piece: string){
    this.choosePiece(piece);
    const totalMovement = this.checkWithColumnDown(point, table) + this.checkWithColumnUp(point, table)
     + this.checkWithRowRight(point, table) + this.checkWithRowLeft(point, table) + this.checkWithUpLeft(point, table)
     + this.checkWithDownRight(point, table) + this.checkWithUpRight(point, table) + this.checkWithDownLeft(point, table);

    if(totalMovement > 0){
      this.playUserBlackAudio();
    }
  }

  checkWithColumnDown(point: IPoint, table: IReversi[][]){
    let i = point.Row-1;
    let counter = 0;
    while(i >= 0 && table[i][point.Column].value === this.oppositePiece){
      --i;
      ++counter;
    }
    if(i >= 0 && table[i][point.Column].value === this.piece && counter > 0){
      let i = point.Row-1;
      while(i >= 0 && table[i][point.Column].value === this.oppositePiece){
        table[i][point.Column].value = this.piece
        --i;
      }
      table[point.Row][point.Column].value = this.piece
    }
    return counter;
  }

  checkWithColumnUp(point: IPoint, table: IReversi[][]){
    let i = point.Row+1;
    let counter = 0;
    while(i < table.length && table[i][point.Column].value === this.oppositePiece){
      ++i;
      ++counter;
    }
    if(i < table.length && table[i][point.Column].value === this.piece && counter > 0){
      let i = point.Row+1;
      while(i < table.length && table[i][point.Column].value === this.oppositePiece){
        table[i][point.Column].value = this.piece
        ++i;
      }
      table[point.Row][point.Column].value = this.piece
    }
    return counter;
  }

  checkWithRowRight(point: IPoint, table: IReversi[][]){
    let i = point.Column-1;
    let counter = 0;
    while(i >= 0 && table[point.Row][i].value === this.oppositePiece){
      --i;
      ++counter;
    }
    if(i >= 0 && table[point.Row][i].value=== this.piece && counter > 0){
      let i = point.Column-1;
      while(i >= 0 && table[point.Row][i].value === this.oppositePiece){
        table[point.Row][i].value = this.piece
        --i;
      }
      table[point.Row][point.Column].value = this.piece
    }
    return counter;
  }

  checkWithRowLeft(point: IPoint, table: IReversi[][]){
    let i = point.Column+1;
    let counter = 0;
    while(i < table.length && table[point.Row][i].value === this.oppositePiece){
      ++i;
      ++counter;
    }
    if(i < table.length && table[point.Row][i].value=== this.piece && counter > 0){
      let i = point.Column+1;
      while(i < table.length && table[point.Row][i].value === this.oppositePiece){
        table[point.Row][i].value = this.piece;
        ++i;
      }
      table[point.Row][point.Column].value = this.piece;
    }
    return counter;
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
      let i = point.Row+1;
      let j = point.Column+1;
      while(i < table.length && j < table.length && table[i][j].value === this.oppositePiece){
        table[i][j].value = this.piece
        ++i;
        ++j;
      }
      table[point.Row][point.Column].value = this.piece
    }
    return counter;
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
    if(i >= 0 && j >=0 && table[i][j].value === this.piece && counter > 0){
      let i = point.Row-1;
      let j = point.Column-1;
      while(i >= 0 && j >= 0 && table[i][j].value === this.oppositePiece){
        table[i][j].value = this.piece
        --i;
        --j;
      }
      table[point.Row][point.Column].value = this.piece
    }
    return counter;
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
      let i = point.Row-1;
      let j = point.Column+1;
      while(i >= 0 && j < table.length && table[i][j].value === this.oppositePiece){
        table[i][j].value = this.piece
        --i;
        ++j;
      }
      table[point.Row][point.Column].value = this.piece
    }
    return counter;
  }


  checkWithDownLeft(point: IPoint, table: IReversi[][]){
    let i = point.Row+1;
    let j = point.Column-1;
    let counter = 0;
    while(i < table.length && j >= 0 && table[i][j].value === this.oppositePiece){
      ++i;
      --j;
      ++counter;
    }
    if(i < table.length && j >= 0 && table[i][j].value === this.piece && counter > 0){
      let i = point.Row+1;
      let j = point.Column-1;
      while(i < table.length && j >= 0  && table[i][j].value === this.oppositePiece){
        table[i][j].value = this.piece
        ++i;
        --j;
      }
      table[point.Row][point.Column].value = this.piece
    }
    return counter;
  }

  playUserBlackAudio(){
    let audio = new Audio();
    audio.src = "../../assets/sound-2.mp3";
    audio.load();
    audio.play();
  }

}