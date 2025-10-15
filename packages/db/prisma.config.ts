import path from "node:path";
import type { PrismaConfig } from "prisma";
import dotenv from "dotenv";

dotenv.config({
	path: "../../apps/web/.env",
});

export default {
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
} satisfies PrismaConfig;
