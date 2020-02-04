import { Component, OnInit, ɵConsole } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import { Estagiario } from '../Estagiario';
import { EstagiarioService } from '../estagiario.service';
import { DialogEditEstagiarioComponent } from '../dialog/dialog-edit-estagiario/dialog-edit-estagiario.component';
import { DialogAddEstagiarioComponent } from '../dialog/dialog-add-estagiario/dialog-add-estagiario.component';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';


@Component({
  selector: 'app-lista-estagiario',
  templateUrl: './lista-estagiario.component.html',
  styleUrls: ['./lista-estagiario.component.css']
})
export class ListaEstagiarioComponent implements OnInit {

  estagiarios:Estagiario[] = [];

  displayedColumns: string[] = ['pendencias', 'cliente', 'nome', 'situacaoAtual', 'dtAdmissao', 'dtTerminoCurso', 'dtTerminoContrato', 'acoes'];
  dataSource = new MatTableDataSource<Estagiario>();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private estagService: EstagiarioService, private dialog: MatDialog) { 
    
  }
  
  ngOnInit() {
    
    this.findEstagiarios();
     
  }

  startEdit(index:number, idEstag:number){
    console.log(idEstag);
    const dialogRef = this.dialog.open(DialogEditEstagiarioComponent, {width:"45%", data:idEstag});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.findEstagiarios();
      }
    });
  }

  startAdd() {
    const dialogRef = this.dialog.open(DialogAddEstagiarioComponent, {width:"45%"});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.findEstagiarios();
      }
    });
  }

  deleteItem(idEstag:Number) {
    let msg = "Deseja deletar o estagiario selecionado?"
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {width:"20%", data: msg});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.findEstagiarios();
      }
    })
  }

  findEstagiarios() {
    this.estagService.findEstagiarios().subscribe(
      data => this.estagiarios = data,
      error => console.log(error),
      () => { this.dataSource.data = this.estagiarios }
    );
  }

}
