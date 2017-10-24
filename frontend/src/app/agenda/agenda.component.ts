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
  public atualizar = false;
  public agendaAtualizar: Agenda;

  constructor(private agendaService: AgendaService) { }

  ngOnInit() {
    this.carregaTodos();
  }

  public salvarAgenda(): void {
    if (this.atualizar) {
      this.atualizar = false;
      this.agendaAtualizar.contato = this.contato;
      this.agendaAtualizar.nome = this.nome;
      this.agendaAtualizar.telefoneFixo = this.telefoneFixo;
      this.agendaAtualizar.endereco = this.endereco;
      this.agendaAtualizar.email = this.email;
      this.agendaAtualizar.celular = this.celular;

      this.agendaService.updateAgenda(this.agendaAtualizar)
        .subscribe(res => {
          console.log(res);
          this.carregaTodos();
        },
        err => {
          console.log(err);
        })
    } else {
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

  public atualizarAgenda(agenda: Agenda) {
    this.agendaService.updateAgenda(agenda)
      .subscribe(res => {
        console.log(res);
        this.carregaTodos();
      },
      err => {
        console.log(err);
      });
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

  public carregaAgenda(agenda: Agenda): void {
    this.atualizar = true;

    this.contato = agenda.contato;
    this.nome = agenda.nome;
    this.telefoneFixo = agenda.telefoneFixo;
    this.endereco = agenda.endereco;
    this.email = agenda.email;
    this.celular = agenda.celular;

    this.agendaAtualizar = agenda;
  }
}
