/*
  Warnings:

  - You are about to drop the column `Concretado` on the `Materiales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `BloqueCurso` DROP FOREIGN KEY `BloqueCurso_MateriaID_fkey`;

-- DropForeignKey
ALTER TABLE `ContenidoBloqueCurso` DROP FOREIGN KEY `ContenidoBloqueCurso_BlqueID_fkey`;

-- AlterTable
ALTER TABLE `Materiales` DROP COLUMN `Concretado`,
    ADD COLUMN `EsPublica` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `Iconos` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NombreArchivo` VARCHAR(191) NOT NULL,
    `RutaArchivo` VARCHAR(191) NOT NULL,
    `LinkDeIcono` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BloqueCurso` ADD CONSTRAINT `BloqueCurso_MateriaID_fkey` FOREIGN KEY (`MateriaID`) REFERENCES `Curso`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContenidoBloqueCurso` ADD CONSTRAINT `ContenidoBloqueCurso_BlqueID_fkey` FOREIGN KEY (`BlqueID`) REFERENCES `BloqueCurso`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
