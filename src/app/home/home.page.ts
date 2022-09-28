import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private _pontoA = 0;
  private _pontoB = 0;
  constructor(private alertController: AlertController) {
    
  }
  async presentAlert(titulo : string, subtitulo : string, msg : string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  get pontoA(): number{
    return this._pontoA;
  }

  set pontoA(pontoA: number){
    this._pontoA = pontoA;
  }

  get pontoB(): number{
    return this._pontoB;
  }

  set pontoB(pontoB: number){
    this._pontoB = pontoB;
  }


  maisum(){
    if(this._pontoA < 12){
    this.pontoA ++;
    if (this._pontoA == 12){
      this.presentAlert("Vitória!!", "Parabéns", "Equipe A venceu!");
      this.zerar();
    }
    }
  }

  menosum(){
    if(this._pontoA > 0){
    this._pontoA --;
    }
  }

  menosumB(){
    if(this._pontoB > 0){
    this._pontoB --;
    }
  }

  maisumB(){
    if(this._pontoB < 12){
    this.pontoB ++;
    if (this._pontoB == 12){
      this.presentAlert("Vitória!!", "Parabéns", "Equipe B venceu!");
      this.zerar();
    }
    }
  }
  maistres(){
    if(this._pontoA <= 9){
    this._pontoA = this._pontoA + 3
    }else if(this._pontoA == 10){
      this._pontoA = this._pontoA + 2;
    }else if (this._pontoA == 11){
      this._pontoA = this._pontoA + 1;
    }
    
    if (this._pontoA == 12){
      this.presentAlert("Vitória!!", "Parabéns", "Equipe A venceu!");
      this.zerar();
    
    }
  }

  menostres(){
    if(this._pontoA > 0){
    this._pontoA = this._pontoA - 3;
    }
  }

  maistresB(){
    if(this._pontoB <= 9){
    this._pontoB = this._pontoB + 3;
    
    }else if(this._pontoB == 10){
      this._pontoB = this._pontoB + 2;
    }else if (this._pontoB == 11){
      this._pontoB = this._pontoB + 1;
    }
    if (this._pontoB == 12){
      this.presentAlert("Vitória!!", "Parabéns", "Equipe B venceu!");
      this.zerar();
  }

  }

  menostresB(){
    if(this._pontoB > 0){
    this._pontoB = this._pontoB - 3;
    }
  }

  zerar(){
    this._pontoA = 0;
    this._pontoB = 0;
  }

  zerarA(){
    this._pontoA = 0;
  }

  zerarB(){
    this._pontoB = 0;
  }
}



