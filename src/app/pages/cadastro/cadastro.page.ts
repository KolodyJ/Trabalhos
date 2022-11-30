/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FilmeFirebaseService } from 'src/app/services/filme-firebase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
form_cadastrar: FormGroup;
isSubmitted: boolean = false;
imagem: any;

  constructor(private alertController: AlertController,
    private router: Router,
    private filmeService: FilmeFirebaseService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,) { }

    ngOnInit() {
      this.form_cadastrar = this.formBuilder.group({
        nome: ["",[Validators.required]],
        direcao: ["",[Validators.required]],
        genero: ["",[Validators.required]],
        classificacaoindi: ["",[Validators.required]],
        duracao: ["",[Validators.required]],
        data_lanc: ["",[Validators.required]],
        resumo: ["",[Validators.required]],
        imagem: ["",[Validators.required]]
      })
    }

  get errorControl(){
    return this.form_cadastrar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      this.presentAlert('Catálogo', 'Erro no Cadastro', 'Todos os Campos são Obrigatórios');
      return false;
    }else{
      this.cadastrar();
    }
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  private cadastrar() : void{
    this.showLoading("Aguarde", 100000);
      this.filmeService.enviarImagem(this.imagem,this.form_cadastrar.value)
      .then(()=>{
        this.loadingCtrl.dismiss();
        this.presentAlert("Catálogo", "Cadastrar", "Catálogo Salvo!");
        this.router.navigate(["/home"]);
      })
      .catch((error)=>{
        this.loadingCtrl.dismiss();
        console.log(error);
        this.presentAlert("Catálogo", "Cadastrar", "Erro ao salvar Catálogo!");
      })
      this.router.navigate(['/home']);
  }

  async presentAlert(titulo : string, subtitulo: string, msg : string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: ['OK'],
    })
        await alert.present();
  }


  async showLoading(message: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: duracao,
    });

    loading.present();
  }
}

