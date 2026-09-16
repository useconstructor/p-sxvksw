import { db, ensureMenu } from "@/lib/db";
import Marisol from "@/components/marisol";

export const dynamic = "force-dynamic";

export default async function Home() {
  await ensureMenu();
  const { rows } = await db.execute("SELECT * FROM menu_items WHERE available = 1 ORDER BY id");
  return <Marisol initialItems={rows.map((row) => ({
    id: Number(row.id), name: String(row.name), category: String(row.category),
    description: String(row.description), price: Number(row.price), ingredients: String(row.ingredients),
    dietary: String(row.dietary), portion: String(row.portion), pairing: String(row.pairing),
  }))} />;
}
