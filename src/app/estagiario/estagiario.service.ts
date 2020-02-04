import { Injectable } from '@angular/core';
import { Estagiario } from './Estagiario';
import { HttpClient } from '@angular/common/http';
import { SituacaoAtual } from './SituacaoAtual';

@Injectable({
  providedIn: 'root'
})
export class EstagiarioService {

  constructor(private httpClient:HttpClient) { }

  public findEstagiarios() {
      return this.httpClient.get<Estagiario[]>('http://localhost:8080/estagiarios');
    ;
  }

  public findEstagiario(id:number) {
    return this.httpClient.get<Estagiario>('http://localhost:8080/estagiarios/' + id);
  }

  public addEstagiario(estagiario:Estagiario) {
    console.log(estagiario);
    return this.httpClient.post('http://localhost:8080/estagiarios/', estagiario);
  }

  public editEstagiario(estagiario:Estagiario) {
    return this.httpClient.put('http://localhost:8080/estagiarios/', estagiario);
  }

  public findSituacaoAtual() {
    return this.httpClient.get<SituacaoAtual[]>('http://localhost:8080/situacaoAtual');
  ;
}
}
