import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as _moment from 'moment';

import { Estagiario } from '../../Estagiario';
import { EstagiarioService } from '../../estagiario.service';
import { SituacaoAtual } from '../../SituacaoAtual';

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
  selector: 'app-dialog-edit-estagiario',
  templateUrl: './dialog-edit-estagiario.component.html',
  styleUrls: ['./dialog-edit-estagiario.component.css'],
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
export class DialogEditEstagiarioComponent implements OnInit {

  public estagiario: Estagiario;
  public situacoes: SituacaoAtual[];
  public editForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogEditEstagiarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private estagService: EstagiarioService,
    private fb: FormBuilder,
    private datePipe: DatePipe) {

      
    }

  ngOnInit() {

    this.editForm = this.fb.group({
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
    
    this.estagService.findEstagiario(this.data).subscribe(
      data => this.estagiario = data,
      error => console.log(error),
      () => { 
              this.updateForm();
            }
    )
  }

  onSubmit() {
    let estagiarioEdit = new Estagiario();
    estagiarioEdit = this.editForm.value;

    estagiarioEdit.dtAdmissao = this.datePipe.transform(estagiarioEdit.dtAdmissao, 'dd/MM/yyyy');
    estagiarioEdit.dtTerminoContrato = this.datePipe.transform(estagiarioEdit.dtTerminoContrato, 'dd/MM/yyyy');
    estagiarioEdit.dtTerminoCurso = this.datePipe.transform(estagiarioEdit.dtTerminoCurso, 'dd/MM/yyyy');
    estagiarioEdit.dtDesligEfetivRenov = this.datePipe.transform(estagiarioEdit.dtDesligEfetivRenov, 'dd/MM/yyyy');


    this.estagService.editEstagiario(estagiarioEdit).subscribe(
      () => {
        this.dialogRef.close(true);
      }
    );

    
  }

  updateForm() {
    
    let dtAdmissaoAux = this.estagiario.dtAdmissao !== null ? this.estagiario.dtAdmissao.split('/') : '';
    let dtTerminoCursoAux = this.estagiario.dtTerminoCurso !== null ? this.estagiario.dtTerminoCurso.split('/') : '';
    let dtTerminoContratoAux = this.estagiario.dtTerminoContrato !== null ? this.estagiario.dtTerminoContrato.split('/') : '';
    let dtDesligEfetivRenovAux = this.estagiario.dtDesligEfetivRenov !== null ? this.estagiario.dtDesligEfetivRenov.split('/') : '';
    
    this.editForm.patchValue({
      id:this.estagiario.id,
      nome: this.estagiario.nome,
      pendencias:this.estagiario.pendencias,
      cliente:this.estagiario.cliente,
      contratoOk:this.estagiario.contratoOk,
      situacaoAtual:this.estagiario.situacaoAtual.id,
      dtAdmissao:dtAdmissaoAux !== '' ? new Date(
                            Number(dtAdmissaoAux[2]),
                            Number(dtAdmissaoAux[1]) - 1,
                            Number(dtAdmissaoAux[0])
                        ) : '',
      dtTerminoCurso:dtTerminoCursoAux !== '' ? new Date(
                            Number(dtTerminoCursoAux[2]),
                            Number(dtTerminoCursoAux[1]) - 1,
                            Number(dtTerminoCursoAux[0])
                        ) : '',
      dtTerminoContrato:dtTerminoContratoAux !== '' ? new Date(
                            Number(dtTerminoContratoAux[2]),
                            Number(dtTerminoContratoAux[1]) - 1,
                            Number(dtTerminoContratoAux[0])
                        ) : '',
      recesso:this.estagiario.recesso,
      dtDesligEfetivRenov:dtDesligEfetivRenovAux !== '' ? new Date(
                            Number(dtDesligEfetivRenovAux[2]),
                            Number(dtDesligEfetivRenovAux[1]) - 1,
                            Number(dtDesligEfetivRenovAux[0])
                        ) : '',
      potencial:this.estagiario.potencial,
      particularidade:this.estagiario.particularidade,
      obs:this.estagiario.obs
    });
  }

}
