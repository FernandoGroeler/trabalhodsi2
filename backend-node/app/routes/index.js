const agendaRoutes = require('./agenda_routes');

module.exports = function(app, pool) {
  agendaRoutes(app, pool);
}
