/*
  Warnings:

  - A unique constraint covering the columns `[RecursoID,UsuarioID]` on the table `Seguimiento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Seguimiento_RecursoID_UsuarioID_key` ON `Seguimiento`(`RecursoID`, `UsuarioID`);
