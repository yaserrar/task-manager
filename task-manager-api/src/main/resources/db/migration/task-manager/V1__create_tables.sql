-- CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

CREATE TABLE "_user" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "role"  VARCHAR(255) DEFAULT 'user' NOT NULL
);


CREATE TABLE "task" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "status" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "creator_id" INTEGER REFERENCES "_user" (id) NOT NULL
);