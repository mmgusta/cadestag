import { Injectable } from '@angular/core';
import { Estagiario } from './Estagiario';
import { HttpClient } from '@angular/common/http';
import { SituacaoAtual } from './SituacaoAtual';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EstagiarioService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient:HttpClient) { }

  public findEstagiarios() {
      return this.httpClient.get<Estagiario[]>(this.baseUrl + '/estagiarios');
    ;
  }

  public findEstagiario(id:number) {
    return this.httpClient.get<Estagiario>(this.baseUrl + '/estagiarios/' + id);
  }

  public addEstagiario(estagiario:Estagiario) {
    return this.httpClient.post(this.baseUrl + '/estagiarios/', estagiario);
  }

  public editEstagiario(estagiario:Estagiario) {
    return this.httpClient.put(this.baseUrl + '/estagiarios/', estagiario);
  }

  public findSituacaoAtual() {
    return this.httpClient.get<SituacaoAtual[]>(this.baseUrl + '/situacaoAtual');
  ;
}
}
