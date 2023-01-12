/*
  Warnings:

  - Made the column `PorcentajeVisto` on table `Seguimiento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TiempoVisto` on table `Seguimiento` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Seguimiento` MODIFY `PorcentajeVisto` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `TiempoVisto` INTEGER NOT NULL DEFAULT 0;
