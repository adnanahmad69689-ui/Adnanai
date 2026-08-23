import fs from "node:fs/promises";
import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to export the current portfolio data.");
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  const [rows] = await connection.execute(`
    SELECT
      id, kind, title, label, description, imageUrl, imageAlt, imageKey, publicUrl,
      detailsJson, \`trigger\`, aiProcess, output, approvalRequired, status, sortOrder,
      createdAt, updatedAt
    FROM portfolio_items
    ORDER BY kind ASC, sortOrder ASC, id ASC
  `);

  await fs.writeFile(
    "/tmp/adnan-ai-current-portfolio.json",
    JSON.stringify(rows, null, 2),
    "utf8",
  );
  console.log(`Exported ${rows.length} portfolio records.`);
} finally {
  await connection.end();
}
