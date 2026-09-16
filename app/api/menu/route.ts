import { db, ensureMenu } from "@/lib/db";
export async function GET() { await ensureMenu(); const { rows } = await db.execute("SELECT * FROM menu_items WHERE available = 1 ORDER BY id"); return Response.json(rows); }
