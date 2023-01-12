/*
  Warnings:

  - A unique constraint covering the columns `[Codigo]` on the table `Grupo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `materiales` ADD COLUMN `Estatus` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `seguimiento` ALTER COLUMN `UltimaVisto` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Grupo_Codigo_key` ON `Grupo`(`Codigo`);
