-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT[],
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "image" VARCHAR(40) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_title_idx" ON "Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");
