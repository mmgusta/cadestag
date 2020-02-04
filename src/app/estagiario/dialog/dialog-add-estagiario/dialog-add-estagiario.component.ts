import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as _moment from 'moment';

import { EstagiarioService } from '../../estagiario.service';
import { SituacaoAtual } from '../../SituacaoAtual';
import { Estagiario } from '../../estagiario';
import { MatDialogRef } from '@angular/material';

const moment = _moment;

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-add-estagiario',
  templateUrl: './dialog-add-estagiario.component.html',
  styleUrls: ['./dialog-add-estagiario.component.css'],
  providers: [ 
              DatePipe,
              {
                provide: DateAdapter,
                useClass: MomentDateAdapter,
                deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
              },
              { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
            ]
})
export class DialogAddEstagiarioComponent implements OnInit {

  public situacoes: SituacaoAtual[];
  public addForm: FormGroup;
  public estagiario: Estagiario;
  
  constructor(private estagService: EstagiarioService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogAddEstagiarioComponent>,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      id:'',
      nome:'',
      pendencias:'',
      cliente:'',
      contratoOk:'',
      situacaoAtual:'',
      dtAdmissao: '',
      dtTerminoCurso: '',
      dtTerminoContrato: '',
      recesso: '',
      dtDesligEfetivRenov: '',
      potencial: '',
      particularidade: '',
      obs: ''
    });

    this.estagService.findSituacaoAtual().subscribe(
      data => this.situacoes = data,
      error => console.log(error)
    )
  }

  onSubmit() {
    this.estagiario = this.addForm.value;

    this.estagiario.dtAdmissao = this.datePipe.transform(this.estagiario.dtAdmissao, 'dd/MM/yyyy');
    this.estagiario.dtTerminoContrato = this.datePipe.transform(this.estagiario.dtTerminoContrato, 'dd/MM/yyyy');
    this.estagiario.dtTerminoCurso = this.datePipe.transform(this.estagiario.dtTerminoCurso, 'dd/MM/yyyy');
    this.estagiario.dtDesligEfetivRenov = this.datePipe.transform(this.estagiario.dtDesligEfetivRenov, 'dd/MM/yyyy');

    this.estagService.addEstagiario(this.estagiario).subscribe(
      () => {
        this.dialogRef.close(true);
      }
    );

  }

}
