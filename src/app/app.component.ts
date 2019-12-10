import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PIR';

  table = [];

  S01 = [];
  S11 = [];
  S02 = [];
  S12 = [];

  log = [];

  db00;
  db01;
  db10;
  db11;
  result;

  constructor() {
    // init table and S variable
    // this.random(4);
    this.example();
    // this.resultX();
    this.init();
  }

  ngOnInit() {}

  init(){
    this.db00 = this.walk( this.S01, this.S02, 0, 'S01' , 'S02');
    this.db01 = this.walk( this.S01, this.S12, 1, 'S01' , 'S12');
    this.db10 = this.walk( this.S11, this.S02, 2, 'S11', 'S02' );
    this.db11 = this.walk( this.S11, this.S12, 3, 'S11', 'S12' );
    this.endResult();
  }

  random(n){
    for (let i = 0; i < n; i++) {
      const row = [];
      const r1 = this.randomBit();
      this.S01[i] = r1;
      this.S11[i] = r1;
      const r2 = this.randomBit();
      this.S02[i] = r2;
      this.S12[i] = r2;
      for (let j = 0; j < n; j++) {
        row[j] = this.randomBit();
      }
      this.table.push(row);
    }
  }

  example(){
    this.table = [
      [0,1,0,0],
      [1,1,0,1],
      [0,1,1,1],
      [0,0,1,0],
    ];
    this.S01 = [0,1,1,0];
    this.S11 = [0,1,0,0];
    this.S02 = [1,1,0,1];
    this.S12 = [0,1,0,1];
  }

  randomBit(){
    const f = Math.random();
    if( f < 0.5) return 0;
    else return 1;
  }

  flip( i: number ) {
    if(i === 0) return 1;
    else return 0;
  }

  walk( a: number[], b: number[], db = -1, aName = '', bName = ''){
    let bit;
    if( db !== -1 ){
      this.log[db] = [];
    }
    for( let i = 0; i< a.length; i++){
      if(a[i] === 0) continue;
      for( let j = 0; j< b.length; j++){
        if(b[j] === 0) continue;
        if(bit === undefined){
          bit = this.table[j][i];
          if(db !== -1){
            this.log[db] = [`DB<sub>${i+1},${j+1}</sub> = ` + this.table[j][i]];
          }
        }else{
          bit = this.xor(bit, this.table[j][i]);
          if( db !== -1 ){
            this.log[db].push([`&#8853; DB<sub>${i+1},${j+1}</sub>(${this.table[j][i]}) = ${bit}`]);
          }
        }
      }
    }
    if( bit === undefined ) bit = 0;
    return bit;
  }

  xor(i: number, j: number){
    if( i === j ) return 0;
    else return 1;
  }

  endResult() {
    let a = this.walk( this.S01, this.S02 );
    a = this.xor(a, this.walk( this.S01, this.S12 ));
    a = this.xor(a, this.walk( this.S11, this.S02 ));
    a = this.xor(a, this.walk( this.S11, this.S12 ));
    this.result = a;
    return a;
  }

  resultX(): number {
    for( let i = 0; i < this.S01.length; i++ ) {
      if( this.S01[i] !== this.S11[i] ){
        return i;
      }
    }
  }

  resultY(): number {
    for( let i = 0; i < this.S02.length; i++ ) {
      if( this.S02[i] !== this.S12[i] ){
        return i;
      }
    }
  }

}
