exports.seed = function(knex, Promise) {
  return knex("dishes").insert([
    { name: "Sweet Potato Fries" },
    { name: "Roasted Chickpea Snacks" },
    { name: "Loaded Baked Potatoes" },
    { name: "Mozzarella Cheese Balls" }
  ]);
};
