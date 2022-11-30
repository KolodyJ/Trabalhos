import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Filme } from '../models/filme';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FilmeFirebaseService {
private PATH : string = 'Filmes';
  constructor(private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage) { }

  getFilme(id:string){
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getFilmes(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

  inserirFilme(filme: Filme){
    return this.angularFirestore.collection(this.PATH).add({
      nome: filme.nome,direcao: filme.direcao,
      genero: filme.genero, classificacaoindi: filme.classificacaoindi,
      duracao: filme.duracao, data_lanc: filme.data_lanc, resumo: filme.resumo,
      downloadURL: filme.downloadURL
    });
  }

  editarFilme(filme: Filme, id: string){
    return this.angularFirestore.collection(this.PATH).doc(id).update({
      nome: filme.nome,direcao: filme.direcao,
      genero: filme.genero, classificacaoindi: filme.classificacaoindi,
      duracao: filme.duracao, data_lanc: filme.data_lanc, resumo: filme.resumo,
      downloadURL: filme.downloadURL
    });
  }

  excluirFilme(id: string){
    return this.angularFirestore.collection(this.PATH).doc(id).delete();
  }

  enviarImagem(imagem: any, filme: Filme){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.log("Tipo Não Suportado!");
      return;
    }
    
    const path = `avatar/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);

    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp=>{
          filme.downloadURL = resp;
          this.inserirFilme(filme);
        })
      })
    ).subscribe()
    return task;
  }
  
  editarImagem(imagem: any, filme: Filme){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.log("Tipo Não Suportado!");
      return;
    }
    
    const path = `avatar/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);

    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp=>{
          filme.downloadURL = resp;
          this.editarFilme(filme, filme.id);
        })
      }) 
    ).subscribe()
    return task;
    
  }

  
  
  

}
