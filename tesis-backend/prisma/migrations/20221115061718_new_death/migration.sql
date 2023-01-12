/*
  Warnings:

  - You are about to drop the column `IDPlantilla` on the `CursoGuia` table. All the data in the column will be lost.
  - You are about to drop the column `MateriaID` on the `CursoGuia` table. All the data in the column will be lost.
  - You are about to drop the column `GuiaID` on the `Grupo` table. All the data in the column will be lost.
  - You are about to drop the column `Icono` on the `Grupo` table. All the data in the column will be lost.
  - You are about to drop the column `contenidoCursoID` on the `Materiales` table. All the data in the column will be lost.
  - You are about to drop the `ContenidoCurso` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `MateriaID` to the `BloqueCurso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Materiales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Genero` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ContenidoCurso` DROP FOREIGN KEY `ContenidoCurso_BloqueCursoID_fkey`;

-- DropForeignKey
ALTER TABLE `CursoGuia` DROP FOREIGN KEY `CursoGuia_MateriaID_fkey`;

-- DropForeignKey
ALTER TABLE `Grupo` DROP FOREIGN KEY `Grupo_GuiaID_fkey`;

-- DropForeignKey
ALTER TABLE `Materiales` DROP FOREIGN KEY `Materiales_contenidoCursoID_fkey`;

-- AlterTable
ALTER TABLE `BloqueCurso` ADD COLUMN `MateriaID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CursoGuia` DROP COLUMN `IDPlantilla`,
    DROP COLUMN `MateriaID`,
    ADD COLUMN `Icono` VARCHAR(191) NOT NULL DEFAULT 'https://source.unsplash.com/random';

-- AlterTable
ALTER TABLE `Grupo` DROP COLUMN `GuiaID`,
    DROP COLUMN `Icono`;

-- AlterTable
ALTER TABLE `Materiales` DROP COLUMN `contenidoCursoID`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `RutaTaxonomica` VARCHAR(191) NULL DEFAULT 'Default';

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `Genero` ENUM('HOMBRE', 'MUJER') NOT NULL,
    ADD COLUMN `Icono` VARCHAR(191) NOT NULL DEFAULT 'https://source.unsplash.com/random';

-- DropTable
DROP TABLE `ContenidoCurso`;

-- CreateTable
CREATE TABLE `Plantilla` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `Publica` BOOLEAN NOT NULL DEFAULT false,
    `CreadorID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BloquePlantilla` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `MateriaID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContenidoBloquePlantilla` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Titulo` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `BlqueID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `Publica` BOOLEAN NOT NULL DEFAULT false,
    `CreadorID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContenidoBloqueCurso` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Titulo` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `BlqueID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CursoGuiaToGrupo` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CursoGuiaToGrupo_AB_unique`(`A`, `B`),
    INDEX `_CursoGuiaToGrupo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContenidoBloquePlantillaToMateriales` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContenidoBloquePlantillaToMateriales_AB_unique`(`A`, `B`),
    INDEX `_ContenidoBloquePlantillaToMateriales_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CursoToCursoGuia` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CursoToCursoGuia_AB_unique`(`A`, `B`),
    INDEX `_CursoToCursoGuia_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContenidoBloqueCursoToMateriales` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContenidoBloqueCursoToMateriales_AB_unique`(`A`, `B`),
    INDEX `_ContenidoBloqueCursoToMateriales_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plantilla` ADD CONSTRAINT `Plantilla_CreadorID_fkey` FOREIGN KEY (`CreadorID`) REFERENCES `usuarios`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BloquePlantilla` ADD CONSTRAINT `BloquePlantilla_MateriaID_fkey` FOREIGN KEY (`MateriaID`) REFERENCES `Plantilla`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContenidoBloquePlantilla` ADD CONSTRAINT `ContenidoBloquePlantilla_BlqueID_fkey` FOREIGN KEY (`BlqueID`) REFERENCES `BloquePlantilla`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_CreadorID_fkey` FOREIGN KEY (`CreadorID`) REFERENCES `usuarios`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BloqueCurso` ADD CONSTRAINT `BloqueCurso_MateriaID_fkey` FOREIGN KEY (`MateriaID`) REFERENCES `Curso`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContenidoBloqueCurso` ADD CONSTRAINT `ContenidoBloqueCurso_BlqueID_fkey` FOREIGN KEY (`BlqueID`) REFERENCES `BloqueCurso`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoGuiaToGrupo` ADD CONSTRAINT `_CursoGuiaToGrupo_A_fkey` FOREIGN KEY (`A`) REFERENCES `CursoGuia`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoGuiaToGrupo` ADD CONSTRAINT `_CursoGuiaToGrupo_B_fkey` FOREIGN KEY (`B`) REFERENCES `Grupo`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContenidoBloquePlantillaToMateriales` ADD CONSTRAINT `_ContenidoBloquePlantillaToMateriales_A_fkey` FOREIGN KEY (`A`) REFERENCES `ContenidoBloquePlantilla`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContenidoBloquePlantillaToMateriales` ADD CONSTRAINT `_ContenidoBloquePlantillaToMateriales_B_fkey` FOREIGN KEY (`B`) REFERENCES `Materiales`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoToCursoGuia` ADD CONSTRAINT `_CursoToCursoGuia_A_fkey` FOREIGN KEY (`A`) REFERENCES `Curso`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoToCursoGuia` ADD CONSTRAINT `_CursoToCursoGuia_B_fkey` FOREIGN KEY (`B`) REFERENCES `CursoGuia`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContenidoBloqueCursoToMateriales` ADD CONSTRAINT `_ContenidoBloqueCursoToMateriales_A_fkey` FOREIGN KEY (`A`) REFERENCES `ContenidoBloqueCurso`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContenidoBloqueCursoToMateriales` ADD CONSTRAINT `_ContenidoBloqueCursoToMateriales_B_fkey` FOREIGN KEY (`B`) REFERENCES `Materiales`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
