import { Injectable } from '@angular/core';
import { Filme } from '../models/filme';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
private _filmes: Filme [] = [];
  constructor() { 
    
  }
 inserir(filme: Filme): void{
  this._filmes.push(filme);
  }
  editar(filmes: Filme, nome: string, direcao: string, genero: string, 
    classificacaoindi: string, duracao: string, data_lanc: string, resumo: string): boolean{
    for(let i=0; i< this.filmes.length; i++){
      if(this._filmes[i].id == filmes.id){
        this._filmes[i].nome = nome;
        this._filmes[i].direcao = direcao;
        this._filmes[i].genero = genero;
        this._filmes[i].classificacaoindi = classificacaoindi;
        this._filmes[i].duracao = duracao;
        this._filmes[i].data_lanc = data_lanc;
        this._filmes[i].resumo = resumo;
        return true;
      }
    }
    return false;
  }
  
  excluir(filmes: Filme): boolean{
    for(let i=0; i< this.filmes.length; i++){
      if(this._filmes[i].id == filmes.id){
        this._filmes.splice(i,1);
        return true;
      }
    }
    return false;
  }
   get filmes(): Filme[]{
    return this._filmes;
  }

  set filmes(filmes : Filme[]){
    this._filmes = filmes;
  }
}
