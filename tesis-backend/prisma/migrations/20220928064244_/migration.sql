/*
  Warnings:

  - You are about to drop the column `CursoID` on the `BloqueCurso` table. All the data in the column will be lost.
  - You are about to drop the `Curso` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BloqueCurso` DROP FOREIGN KEY `BloqueCurso_CursoID_fkey`;

-- AlterTable
ALTER TABLE `BloqueCurso` DROP COLUMN `CursoID`;

-- AlterTable
ALTER TABLE `Materia` ADD COLUMN `Publica` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `Curso`;

-- CreateTable
CREATE TABLE `CursoGuia` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NULL,
    `IDPlantilla` INTEGER NOT NULL,
    `MateriaID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Icono` VARCHAR(191) NULL,
    `GuiaID` INTEGER NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `CreadorID` INTEGER NOT NULL,
    `Codigo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RelacionMatriculados` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RelacionMatriculados_AB_unique`(`A`, `B`),
    INDEX `_RelacionMatriculados_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CursoGuia` ADD CONSTRAINT `CursoGuia_MateriaID_fkey` FOREIGN KEY (`MateriaID`) REFERENCES `Materia`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_CreadorID_fkey` FOREIGN KEY (`CreadorID`) REFERENCES `usuarios`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_GuiaID_fkey` FOREIGN KEY (`GuiaID`) REFERENCES `CursoGuia`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RelacionMatriculados` ADD CONSTRAINT `_RelacionMatriculados_A_fkey` FOREIGN KEY (`A`) REFERENCES `Grupo`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RelacionMatriculados` ADD CONSTRAINT `_RelacionMatriculados_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
