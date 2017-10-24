package br.univel.agendaapi.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univel.agendaapi.model.Agenda;
import br.univel.agendaapi.repository.AgendaRepository;

@RestController
@RequestMapping("/api")
public class AgendaController {
	@Autowired
	AgendaRepository agendaRepository;
	
	@GetMapping("/agenda")
	public List<Agenda> getAllAgenda() {
		return agendaRepository.findAll();
	}
	
	@GetMapping("/agenda/{id}")
	public ResponseEntity<Agenda> getAgendaById(@PathVariable(value = "id") Long agendaId) {
		Agenda agenda = agendaRepository.findOne(agendaId);
		
		if (agenda == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok().body(agenda);
	}	
	
	@PostMapping("/agenda")
	public Agenda createAgenda(@Valid @RequestBody Agenda agenda) {
		return agendaRepository.save(agenda);
	}
	
	@DeleteMapping("/agenda/{id}")
    public ResponseEntity<Agenda> deleteAgenda(@PathVariable(value = "id") Long agendaId) {
		Agenda agenda = agendaRepository.findOne(agendaId);
		
		if (agenda == null) {
			return ResponseEntity.notFound().build();
		}
		
		agendaRepository.delete(agenda);
		return ResponseEntity.ok().body(agenda);
    }
	
	@PutMapping("/agenda/{id}")
	public Agenda updateAgenda(@Valid @RequestBody Agenda agenda) {
		return agendaRepository.save(agenda);
	}	
}
