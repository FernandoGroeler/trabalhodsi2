package br.univel.agendaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.univel.agendaapi.model.Agenda;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

}
