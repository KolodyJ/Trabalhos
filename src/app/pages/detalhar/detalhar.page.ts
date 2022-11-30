import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Filme } from 'src/app/models/filme';
import { FilmeFirebaseService } from 'src/app/services/filme-firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
filme: Filme;
edicao: boolean = true;
form_cadastrar: FormGroup;
isSubmitted: boolean = false;
imagem: any;

  constructor(private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private filmeService: FilmeFirebaseService,
    private formBuilder: FormBuilder,) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.filme = nav.extras.state.objeto;
    this.form_cadastrar = this.formBuilder.group({
    nome: [this.filme.nome,[Validators.required]],
    direcao: [this.filme.direcao,[Validators.required]],
    genero: [this.filme.genero,[Validators.required]],
    classificacaoindi: [this.filme.classificacaoindi,[Validators.required]],
    duracao: [this.filme.duracao,[Validators.required]],
    data_lanc: [this.filme.data_lanc,[Validators.required]],
    resumo: [this.filme.resumo,[Validators.required]],

    });
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
      this.salvar();
    }
  }

  alterarEdicao(): void{
    if(this.edicao == false){
      this.edicao = true;
    }else{
      this.edicao = false;
    }
  }

  salvar(){
    this.filmeService.editarFilme(this.form_cadastrar.value, this.filme.id)
    .then(()=>{
      this.presentAlert('Catálogo', 'Editar', 'Filme editado com Sucesso!');
      this.router.navigate(['/home']);
    })
    .catch(()=>{
      this.presentAlert('Catálogo', 'Editar', 'Erro ao Editar!!');
    })
  }


  excluir(){
    this.presentConfirmAlert("Catálogo", "Excluir filme",
    "Você deseja realmente excluir o filme?");
  }

  private excluirFilme(){
    this.filmeService.excluirFilme(this.filme.id)
    .then(()=>{
      this.presentAlert('Catálogo', 'Editar', 'filme editado com Sucesso!');
      this.router.navigate(['/home']);
    })
    .catch(()=>{
      this.presentAlert('Catálogo', 'Editar', 'Erro ao Editar!!');
    })
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

  async presentConfirmAlert(titulo : string, subtitulo: string, msg : string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: [
        {text: 'Cancelar',
         role: 'cancelar',
         handler: ()=>{console.log("cancelou")}},
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler:(acao) =>{
            this.excluirFilme();
          }
        }
      ],
    })
        await alert.present();
  }

  private validar(campo: any) : boolean{
    if(!campo){
      return false;
    }else{
      return true;
    }
  }

  async showLoading(message: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: duracao,
    });

    loading.present();
  }

}
