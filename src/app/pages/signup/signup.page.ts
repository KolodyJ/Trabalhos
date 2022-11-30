import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formCadastrar: FormGroup;
  isSubmitted : boolean = false;

    constructor(private alertController: AlertController,
      private router: Router, 
      private formBuild: FormBuilder,
      private auth: AuthService) { }

  ngOnInit() {
    this.formCadastrar = this.formBuild.group({
      email : ["", [Validators.required, Validators.email]],
      senha : ["", [Validators.required, Validators.minLength(6)]],
      confSenha : ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.formCadastrar.valid){
      this.presentAlert('Catálogo', 'Erro ao Logar', 'Todos os Campos são Obrigatórios');
      return false;
    }else{
      this.cadastrar();
    }
  }

  private cadastrar(){
    this.auth.signUp(this.formCadastrar.value['email'],
    this.formCadastrar.value['senha'])
    .then((res) => {
      this.presentAlert("Catálogo", "Cadastar", "Cadastro Efetuado!")
      this.router.navigate(['/signin']);
    })
    .catch((error) => {
      this.presentAlert("Catálogo", "Erro", "Tente Novamente!");
      console.log(error);
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


}
