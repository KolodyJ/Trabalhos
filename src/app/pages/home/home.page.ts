import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilmeFirebaseService } from 'src/app/services/filme-firebase.service';
import { Filme } from '../../models/filme';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filmes : Filme[];

  constructor(private router: Router,
    private filmeservice: FilmeFirebaseService,
    private auth: AuthService) {
      console.log(this.auth.getUsuarioLogado());
      this.filmeservice.getFilmes()
      .subscribe(resp => {
        this.filmes = resp.map(filme=>{
          return{
            id : filme.payload.doc.id,
            ...filme.payload.doc.data() as Filme
          } as Filme
        });
      });
  }

  irParaCadastroPage(): void{
    this.router.navigate(['/cadastro']);
  }

    irParaDetalharPage(filme: Filme):void{
      this.router.navigateByUrl('/detalhar', {
        state: { objeto:filme }
      });
    }

}
