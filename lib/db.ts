import { createClient } from "@libsql/client";

export const db = createClient({ url: process.env.TURSO_DATABASE_URL ?? "file:marisol.db", authToken: process.env.TURSO_AUTH_TOKEN });

const seed = [
  ["Al Pastor Tacos","Tacos","Marinated pork with pineapple, onion, and cilantro on corn tortillas",4.95,"Pork, pineapple, onion, cilantro","Gluten free","One taco","Agua de Jamaica"],
  ["Carne Asada Tacos","Tacos","Grilled beef with lime, radish, and jalapeño on flour tortillas",5.50,"Beef, lime, radish, jalapeño","High protein","One taco","Michelada"],
  ["Baja Fish Tacos","Tacos","Beer battered mahi mahi with cabbage slaw and chipotle crema",5.75,"Mahi mahi, cabbage, chipotle crema","Pescatarian","One taco","Agua Fresca de Sandía"],
  ["Burrito Rojo","Burritos","Slow cooked beef, rice, beans, and roasted pepper in red sauce",9.95,"Beef, rice, beans, roasted pepper","High protein","One generous burrito","Michelada"],
  ["Burrito Verde","Burritos","Chicken tomatillo with avocado and sour cream",9.95,"Chicken, tomatillo, avocado, sour cream","High protein","One generous burrito","Horchata"],
  ["Burrito California","Burritos","Grilled shrimp, brown rice, black beans, and pico de gallo",10.95,"Shrimp, brown rice, black beans, pico","Pescatarian","One generous burrito","Agua de Jamaica"],
  ["Agua Fresca de Sandía","Drinks","Refreshing watermelon with lime and mint",3.50,"Watermelon, lime, mint","Vegan","16 ounce glass","Baja Fish Tacos"],
  ["Horchata","Drinks","Creamy rice milk with vanilla and cinnamon",3.75,"Rice, vanilla, cinnamon","Vegetarian","16 ounce glass","Burrito Verde"],
  ["Michelada","Drinks","Ice cold Mexican lager with lime juice and a hot sauce rim",5.95,"Lager, lime, house spice","Contains alcohol","16 ounce glass","Carne Asada Tacos"],
  ["Agua de Jamaica","Drinks","Tart hibiscus flower tea served cold",3.50,"Hibiscus, cane sugar, citrus","Vegan","16 ounce glass","Al Pastor Tacos"],
  ["Café de Olla","Drinks","Traditional Mexican coffee with cinnamon and piloncillo",2.95,"Coffee, cinnamon, piloncillo","Vegan","8 ounce cup","Tres Leches Cake Slice"],
  ["Flan Casero","Desserts","Smooth custard with caramelized sugar",4.50,"Egg, milk, caramel","Vegetarian","Single serving","Café de Olla"],
  ["Churros with Chocolate","Desserts","Crispy fried dough with warm Mexican hot chocolate for dipping",5.00,"Flour, cinnamon, chocolate","Vegetarian","Four churros","Café de Olla"],
  ["Tres Leches Cake Slice","Desserts","Traditional sponge cake soaked in a three milk blend",4.95,"Sponge cake, cream, milk","Vegetarian","One slice","Café de Olla"],
  ["Elote Asado","Appetizers","Fire roasted corn with chile, lime, cotija, and cilantro",4.95,"Corn, cotija, lime, chile","Vegetarian, gluten free","One whole corn","Agua de Jamaica"],
  ["Family Taco Table","Family Meals","A festive spread of twelve tacos with rice, beans, salsa, and aguas frescas",36.95,"Mixed taco fillings, rice, beans, salsa","Serves four","Four person feast","Two aguas frescas"],
] as const;

export async function ensureMenu() {
  await db.execute(`CREATE TABLE IF NOT EXISTS menu_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL, price REAL NOT NULL, ingredients TEXT NOT NULL, dietary TEXT NOT NULL, portion TEXT NOT NULL, pairing TEXT NOT NULL, available INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')))`);
  const count = await db.execute("SELECT COUNT(*) AS total FROM menu_items");
  if (Number(count.rows[0].total) === 0) for (const item of seed) await db.execute({ sql: "INSERT INTO menu_items (name,category,description,price,ingredients,dietary,portion,pairing) VALUES (?,?,?,?,?,?,?,?)", args: [...item] });
}
