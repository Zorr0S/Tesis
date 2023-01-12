-- CreateTable
CREATE TABLE `Tipo_Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Idiomas` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Tipo_user` ENUM('ADMIN', 'PROFESOR', 'USER', 'INVITADO') NOT NULL DEFAULT 'USER',
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellidos` VARCHAR(191) NOT NULL,
    `Numero_Cuenta` VARCHAR(191) NULL,
    `Correo` VARCHAR(191) NOT NULL,
    `Contrasena` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usuarios_Correo_key`(`Correo`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipo_Material` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Tipo` VARCHAR(191) NOT NULL,
    `Terminaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etiquetas` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NivelDeAgregacions` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materiales` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Direccion` VARCHAR(191) NOT NULL,
    `Titulo` VARCHAR(191) NOT NULL,
    `MetaDatos` VARCHAR(191) NULL,
    `LocalPath` VARCHAR(191) NULL,
    `NombreArchivo` VARCHAR(191) NULL,
    `EsLocal` BOOLEAN NOT NULL DEFAULT false,
    `AuthorID` INTEGER NOT NULL DEFAULT 1,
    `TipoMaterialId` INTEGER NOT NULL,
    `Identificador` VARCHAR(191) NOT NULL,
    `Catalogo` VARCHAR(191) NULL,
    `IDIdioma` INTEGER NOT NULL DEFAULT 1,
    `Ambito` VARCHAR(191) NULL,
    `Estructura` VARCHAR(191) NULL,
    `IDNivelAgregacion` INTEGER NOT NULL DEFAULT 1,
    `Version` VARCHAR(191) NULL,
    `Estado` VARCHAR(191) NULL,
    `Contribucion` VARCHAR(191) NULL,
    `TipoContribucion` VARCHAR(191) NULL,
    `Entidad` VARCHAR(191) NULL,
    `TipoInteractividad` INTEGER NULL,
    `TipRecurso` INTEGER NOT NULL DEFAULT 1,
    `DensidadSemantica` VARCHAR(191) NULL,
    `TipoDestinatario` INTEGER NULL,
    `Contexto` VARCHAR(191) NULL,
    `RangoDeEdad` VARCHAR(191) NOT NULL,
    `Dificultad` VARCHAR(191) NULL,
    `TiempoTipicoAprendizadje` VARCHAR(191) NULL,
    `DescripcionRecurso` VARCHAR(191) NULL,
    `ConocimientoPrevio` VARCHAR(191) NULL,
    `ObjetivosDidacticos` VARCHAR(191) NULL,
    `TipoConocimiento` INTEGER NULL,
    `IdiomaUtilizado` VARCHAR(191) NULL,
    `ProcesoCognitivo` VARCHAR(191) NULL,
    `Proposito` VARCHAR(191) NULL,
    `RutaTaxonomica` VARCHAR(191) NULL,
    `Fuente` VARCHAR(191) NULL,
    `Taxon` VARCHAR(191) NULL,
    `Entrada` VARCHAR(191) NULL,
    `Descripcion` VARCHAR(191) NULL,
    `PalabrasClave` VARCHAR(191) NULL,
    `Concretado` BOOLEAN NOT NULL DEFAULT false,
    `contenidoCursoID` INTEGER NULL,

    FULLTEXT INDEX `Materiales_Titulo_idx`(`Titulo`),
    FULLTEXT INDEX `Materiales_Descripcion_idx`(`Descripcion`),
    FULLTEXT INDEX `Materiales_PalabrasClave_idx`(`PalabrasClave`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoRecursoEducativo` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoInteractividad` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Destinatario` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoConocimiento` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seguimiento` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `RecursoID` INTEGER NOT NULL,
    `UsuarioID` INTEGER NOT NULL,
    `PrimerVisto` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UltimaVisto` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `PorcentajeVisto` DOUBLE NULL DEFAULT 0,
    `TiempoVisto` INTEGER NULL DEFAULT 0,
    `RutaVista` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facultad` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrera` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `FacultadID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanEstudio` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `CarreraID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semestre` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `PlanID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `SemestreID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bloque` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `MateriaID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContenidoBloque` (
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
    `Descripcion` INTEGER NOT NULL,
    `Identificador` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BloqueCurso` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `CursoID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContenidoCurso` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Titulo` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `BloqueCursoID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Token` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EtiquetasToMateriales` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EtiquetasToMateriales_AB_unique`(`A`, `B`),
    INDEX `_EtiquetasToMateriales_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContenidoBloqueToMateriales` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContenidoBloqueToMateriales_AB_unique`(`A`, `B`),
    INDEX `_ContenidoBloqueToMateriales_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_AuthorID_fkey` FOREIGN KEY (`AuthorID`) REFERENCES `usuarios`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_TipoMaterialId_fkey` FOREIGN KEY (`TipoMaterialId`) REFERENCES `Tipo_Material`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_IDIdioma_fkey` FOREIGN KEY (`IDIdioma`) REFERENCES `Idiomas`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_IDNivelAgregacion_fkey` FOREIGN KEY (`IDNivelAgregacion`) REFERENCES `NivelDeAgregacions`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_TipRecurso_fkey` FOREIGN KEY (`TipRecurso`) REFERENCES `TipoRecursoEducativo`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_TipoInteractividad_fkey` FOREIGN KEY (`TipoInteractividad`) REFERENCES `TipoInteractividad`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_TipoDestinatario_fkey` FOREIGN KEY (`TipoDestinatario`) REFERENCES `Destinatario`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_TipoConocimiento_fkey` FOREIGN KEY (`TipoConocimiento`) REFERENCES `TipoConocimiento`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_contenidoCursoID_fkey` FOREIGN KEY (`contenidoCursoID`) REFERENCES `ContenidoCurso`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seguimiento` ADD CONSTRAINT `Seguimiento_UsuarioID_fkey` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seguimiento` ADD CONSTRAINT `Seguimiento_RecursoID_fkey` FOREIGN KEY (`RecursoID`) REFERENCES `Materiales`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrera` ADD CONSTRAINT `Carrera_FacultadID_fkey` FOREIGN KEY (`FacultadID`) REFERENCES `Facultad`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanEstudio` ADD CONSTRAINT `PlanEstudio_CarreraID_fkey` FOREIGN KEY (`CarreraID`) REFERENCES `Carrera`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Semestre` ADD CONSTRAINT `Semestre_PlanID_fkey` FOREIGN KEY (`PlanID`) REFERENCES `PlanEstudio`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_SemestreID_fkey` FOREIGN KEY (`SemestreID`) REFERENCES `Semestre`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bloque` ADD CONSTRAINT `Bloque_MateriaID_fkey` FOREIGN KEY (`MateriaID`) REFERENCES `Materia`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContenidoBloque` ADD CONSTRAINT `ContenidoBloque_BlqueID_fkey` FOREIGN KEY (`BlqueID`) REFERENCES `Bloque`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BloqueCurso` ADD CONSTRAINT `BloqueCurso_CursoID_fkey` FOREIGN KEY (`CursoID`) REFERENCES `Curso`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContenidoCurso` ADD CONSTRAINT `ContenidoCurso_BloqueCursoID_fkey` FOREIGN KEY (`BloqueCursoID`) REFERENCES `BloqueCurso`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtiquetasToMateriales` ADD CONSTRAINT `_EtiquetasToMateriales_A_fkey` FOREIGN KEY (`A`) REFERENCES `Etiquetas`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtiquetasToMateriales` ADD CONSTRAINT `_EtiquetasToMateriales_B_fkey` FOREIGN KEY (`B`) REFERENCES `Materiales`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContenidoBloqueToMateriales` ADD CONSTRAINT `_ContenidoBloqueToMateriales_A_fkey` FOREIGN KEY (`A`) REFERENCES `ContenidoBloque`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContenidoBloqueToMateriales` ADD CONSTRAINT `_ContenidoBloqueToMateriales_B_fkey` FOREIGN KEY (`B`) REFERENCES `Materiales`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
