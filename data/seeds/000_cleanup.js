const cleaner = require("knex-cleaner");

exports.seed = function(knex) {
  return cleaner.clean(knex);
};

// Cleaner will prevent FK errors when trying to truncate
// the tables that have FK pointing to them
