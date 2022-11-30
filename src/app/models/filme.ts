export class Filme {
  private _id: any;
  private _nome: string;
  private _direcao: string;
  private _genero: string;
  private _classificacaoindi: string;
  private _duracao: string;
  private _data_lanc: string;
  private _resumo: string;
  private _downloadURL: string;

  constructor(nome: string, direcao:string, genero: string, classificacaoindi: string, 
      duracao: string, data_lanc:string, resumo: string, downloadURL: string){
      let chave = new Date;
      this._id = chave.getTime();
      this._nome = nome;
      this._direcao = direcao;
      this.genero = genero;
      this._classificacaoindi = classificacaoindi;
      this. _duracao = duracao;
      this._data_lanc = data_lanc;
      this._resumo = resumo;
     
  }
  get id(): any{
      return this._id;
  }

  get nome() : string{
      return this._nome;
  }

  set nome(nome:string){
      this._nome = nome;
  }

  get direcao(): string{
      return this._direcao;
  }

  set direcao(direcao: string){
      this._direcao = direcao;
  }

  get genero(): string{
      return this._genero;
  }

  set genero(genero: string){
      this._genero = genero;
  }

  get classificacaoindi(): string{
      return this._classificacaoindi;
  }

  set classificacaoindi(classificacaoindi: string){
      this._classificacaoindi = classificacaoindi;
  }

  get duracao(): string{
      return this._duracao;
  }

  set duracao(duracao:  string){
      this._duracao = duracao;
  }

  get data_lanc(): string{
      return this._data_lanc
  }
  
  set data_lanc(data_lanc: string){
      this._data_lanc = data_lanc;
  }

  get resumo(): string{
      return this._resumo;
  }

  set resumo(resumo: string){
      this._resumo = resumo;
  }

  get downloadURL(): string{
    return this._downloadURL;
}

set downloadURL(downloadURL: string){
    this._downloadURL = this.downloadURL;
}
}
