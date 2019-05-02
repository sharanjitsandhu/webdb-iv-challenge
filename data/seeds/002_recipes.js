exports.seed = function(knex, Promise) {
  return knex("recipes").insert([
    { name: "idk", dish_id: 1 },
    { name: "idk.", dish_id: 2 },
    { name: "idk..", dish_id: 3 },
    { name: "idk...", dish_id: 4 }
  ]);
};
