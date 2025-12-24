"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../generated/prisma/client");
var adapter_mariadb_1 = require("@prisma/adapter-mariadb");
var adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL);
var prisma = new client_1.PrismaClient({ adapter: adapter });
exports.default = prisma;
