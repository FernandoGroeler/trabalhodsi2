import { Component, OnInit } from '@angular/core';
import { AgendaService } from './agenda.service';
import { Agenda } from './agenda';

@Component({
  selector: 'agenda-agenda',
  templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit {
  public lista: Agenda[] = [];
  public contato = '';
  public nome = '';
  public telefoneFixo = '';
  public endereco = '';
  public email = '';
  public celular = '';

  constructor(private agendaService: AgendaService) { }

  ngOnInit() {
    this.carregaTodos();
  }

  public carregaTodos(): void {
    this.agendaService.loadAgenda()
      .subscribe(res => {
        this.lista = res;
      },
      err => {
        console.log(err);
      });
  }

  public salvarAgenda(): void {
    const agenda = new Agenda();
    agenda.contato = this.contato;
    agenda.nome = this.nome;
    agenda.telefoneFixo = this.telefoneFixo;
    agenda.endereco = this.endereco;
    agenda.email = this.email;
    agenda.celular = this.celular;

    this.agendaService.addAgenda(agenda)
      .subscribe(res => {
        console.log(res);
        this.carregaTodos();
      },
      err => {
        console.log(err);
      });
  }

  public apagarAgenda(id: number): void {
    this.agendaService.removeAgenda(id)
      .subscribe(res => {
        console.log(res);
        this.carregaTodos();
      },
      err => {
        console.log(err);
      });
  }
}
