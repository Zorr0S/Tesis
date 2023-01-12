-- AlterTable
ALTER TABLE `Grupo` ADD COLUMN `Icono` VARCHAR(191) NOT NULL DEFAULT 'https://source.unsplash.com/random';

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `FechaDeNacimiento` DATETIME(3) NULL;
