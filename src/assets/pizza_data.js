export const pizzData = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    // image:
    //   "https://images.unsplash.com/photo-1593011044333-5f09b57ec1f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
    image: require("./pepperoni_pizza.png"),
    ingredients: ["Pepperoni"],
    price: 12.0,
  },
  {
    id: 2,
    name: "Veggie Pizza",
    // image:
    //   "https://images.unsplash.com/photo-1647658276624-cf9e182528c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    image: require("./veggie_pizza.png"),
    ingredients: [
      "Mushrooms",
      "white onions",
      "green peppers",
      "black olives",
      "spinach",
    ],
    price: 12.0,
  },
  {
    id: 3,
    name: "BBQ Chicken Pizza",
    // image:
    //   "https://images.unsplash.com/photo-1647594584533-f8279693446e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    image: require("./chicken_pizza.png"),
    ingredients: ["Sweet BBQ sauce", "grilled chicken", "bacon"],
    price: 13.0,
  },
  {
    id: 4,
    name: "Deluxe Pizza",
    // image:
    //   "https://images.unsplash.com/photo-1647661885996-e04586ef2560?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    image: require("./deluxe_pizza.png"),
    ingredients: [
      "Pepperoni",
      "white onions",
      "green peppers",
      "mushrooms",
      "italian sausage",
    ],
    price: 13.0,
  },
  {
    id: 5,
    name: "Glaze Pizza",
    // image:
    //   "https://images.unsplash.com/photo-1627561204953-5807b913dba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    image: require("./glaze_pizza.png"),
    ingredients: [
      "Basil",
      "italian sausage",
      "salami",
      "pepperoni",
      "balsamic glaze",
    ],
    price: 12.0,
  },
];

export const returnPizzaImage = (name) => {
  switch (name) {
    case "Pepperoni Pizza":
      return require("./pepperoni_pizza.png");
    case "Veggie Pizza":
      return require("./veggie_pizza.png");
    case "BBQ Chicken Pizza":
      return require("./chicken_pizza.png");
    case "Deluxe Pizza":
      return require("./chicken_pizza.png");
    case "Glaze Pizza":
      return require("./glaze_pizza.png");
  }
};
