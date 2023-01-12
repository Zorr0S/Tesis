/*
  Warnings:

  - Added the required column `CreadorID` to the `CursoGuia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CursoGuia` ADD COLUMN `CreadorID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CursoGuia` ADD CONSTRAINT `CursoGuia_CreadorID_fkey` FOREIGN KEY (`CreadorID`) REFERENCES `usuarios`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
