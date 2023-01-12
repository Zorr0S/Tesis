-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: tesis-backend
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bloque`
--

DROP TABLE IF EXISTS `Bloque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bloque` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MateriaID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Bloque_MateriaID_fkey` (`MateriaID`),
  CONSTRAINT `Bloque_MateriaID_fkey` FOREIGN KEY (`MateriaID`) REFERENCES `Materia` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bloque`
--

/*!40000 ALTER TABLE `Bloque` DISABLE KEYS */;
INSERT INTO `Bloque` VALUES
(1,'Bloque 1','INtroduccion a las matematicas discretas',1),
(2,'Bloque 2 ','Matematica booleana',1);
/*!40000 ALTER TABLE `Bloque` ENABLE KEYS */;

--
-- Table structure for table `Carrera`
--

DROP TABLE IF EXISTS `Carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Carrera` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FacultadID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Carrera_FacultadID_fkey` (`FacultadID`),
  CONSTRAINT `Carrera_FacultadID_fkey` FOREIGN KEY (`FacultadID`) REFERENCES `Facultad` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carrera`
--

/*!40000 ALTER TABLE `Carrera` DISABLE KEYS */;
INSERT INTO `Carrera` VALUES
(1,'Ingenieria en software',1);
/*!40000 ALTER TABLE `Carrera` ENABLE KEYS */;

--
-- Table structure for table `ContenidoBloque`
--

DROP TABLE IF EXISTS `ContenidoBloque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ContenidoBloque` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BlqueID` int(11) NOT NULL,
  `MaterialID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ContenidoBloque_MaterialID_fkey` (`MaterialID`),
  KEY `ContenidoBloque_BlqueID_fkey` (`BlqueID`),
  CONSTRAINT `ContenidoBloque_BlqueID_fkey` FOREIGN KEY (`BlqueID`) REFERENCES `Bloque` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `ContenidoBloque_MaterialID_fkey` FOREIGN KEY (`MaterialID`) REFERENCES `Materiales` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContenidoBloque`
--

/*!40000 ALTER TABLE `ContenidoBloque` DISABLE KEYS */;
INSERT INTO `ContenidoBloque` VALUES
(1,'Introduccion a matematicas discretas',NULL,1,1);
/*!40000 ALTER TABLE `ContenidoBloque` ENABLE KEYS */;

--
-- Table structure for table `Etiquetas`
--

DROP TABLE IF EXISTS `Etiquetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Etiquetas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Etiquetas`
--

/*!40000 ALTER TABLE `Etiquetas` DISABLE KEYS */;
/*!40000 ALTER TABLE `Etiquetas` ENABLE KEYS */;

--
-- Table structure for table `Facultad`
--

DROP TABLE IF EXISTS `Facultad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Facultad` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Facultad`
--

/*!40000 ALTER TABLE `Facultad` DISABLE KEYS */;
INSERT INTO `Facultad` VALUES
(1,'Ejemplo');
/*!40000 ALTER TABLE `Facultad` ENABLE KEYS */;

--
-- Table structure for table `Materia`
--

DROP TABLE IF EXISTS `Materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Materia` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SemestreID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Materia_SemestreID_fkey` (`SemestreID`),
  CONSTRAINT `Materia_SemestreID_fkey` FOREIGN KEY (`SemestreID`) REFERENCES `Semestre` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Materia`
--

/*!40000 ALTER TABLE `Materia` DISABLE KEYS */;
INSERT INTO `Materia` VALUES
(1,'Matemáticas Discretas ',NULL,1),
(2,'Algebra Lineal ',NULL,1),
(3,'Fundamentos de Computación ',NULL,1),
(4,'Comprensión y Producción de Textos',NULL,1),
(5,'Administración y Contabilidad ',NULL,1),
(6,'Cálculo Diferencial e Integral ',NULL,2),
(7,'Arquitectura de Computadoras I',NULL,2),
(8,'Comprensión y producción de textos en Inglés ',NULL,2),
(9,'Programación I ',NULL,2),
(10,'Sistemas Operativos ',NULL,2),
(11,'Costos',NULL,2),
(12,'Teoría de la Computación ',NULL,3),
(13,'Arquitectura de Computadoras II ',NULL,3),
(14,'Estructura de Datos ',NULL,3),
(15,'Programación II',NULL,3),
(16,'Probabilidad y estadística ',NULL,3),
(17,'Valores y Ética Profesional ',NULL,3);
/*!40000 ALTER TABLE `Materia` ENABLE KEYS */;

--
-- Table structure for table `Materiales`
--

DROP TABLE IF EXISTS `Materiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Materiales` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Direccion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TipoMaterialId` int(11) NOT NULL,
  `AuthorID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Materiales_AuthorID_fkey` (`AuthorID`),
  KEY `Materiales_TipoMaterialId_fkey` (`TipoMaterialId`),
  CONSTRAINT `Materiales_AuthorID_fkey` FOREIGN KEY (`AuthorID`) REFERENCES `usuarios` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `Materiales_TipoMaterialId_fkey` FOREIGN KEY (`TipoMaterialId`) REFERENCES `Tipo_Material` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Materiales`
--

/*!40000 ALTER TABLE `Materiales` DISABLE KEYS */;
INSERT INTO `Materiales` VALUES
(1,'http://galois.azc.uam.mx/mate/LIBROS/matematicasdiscretas1.pdf',1,1);
/*!40000 ALTER TABLE `Materiales` ENABLE KEYS */;

--
-- Table structure for table `PlanEstudio`
--

DROP TABLE IF EXISTS `PlanEstudio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PlanEstudio` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CarreraID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `PlanEstudio_CarreraID_fkey` (`CarreraID`),
  CONSTRAINT `PlanEstudio_CarreraID_fkey` FOREIGN KEY (`CarreraID`) REFERENCES `Carrera` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PlanEstudio`
--

/*!40000 ALTER TABLE `PlanEstudio` DISABLE KEYS */;
INSERT INTO `PlanEstudio` VALUES
(1,'Plan de estudios de ejemplo',1);
/*!40000 ALTER TABLE `PlanEstudio` ENABLE KEYS */;

--
-- Table structure for table `Semestre`
--

DROP TABLE IF EXISTS `Semestre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Semestre` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PlanID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Semestre_PlanID_fkey` (`PlanID`),
  CONSTRAINT `Semestre_PlanID_fkey` FOREIGN KEY (`PlanID`) REFERENCES `PlanEstudio` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Semestre`
--

/*!40000 ALTER TABLE `Semestre` DISABLE KEYS */;
INSERT INTO `Semestre` VALUES
(1,'Primer Semestre',1),
(2,'Segundo Semestre',1),
(3,'Tercer Semestre',1),
(4,'Cuarto Semestre',1),
(5,'Quinton Semestre',1),
(6,'Sexto Semestre',1),
(7,'Septimo Semestre',1),
(8,'Octavo Semestre',1),
(9,'Noveno Semestre',1);
/*!40000 ALTER TABLE `Semestre` ENABLE KEYS */;

--
-- Table structure for table `Tipo_Material`
--

DROP TABLE IF EXISTS `Tipo_Material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tipo_Material` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Tipo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tipo_Material`
--

/*!40000 ALTER TABLE `Tipo_Material` DISABLE KEYS */;
INSERT INTO `Tipo_Material` VALUES
(1,'Documento');
/*!40000 ALTER TABLE `Tipo_Material` ENABLE KEYS */;

--
-- Table structure for table `Tipo_Usuario`
--

DROP TABLE IF EXISTS `Tipo_Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tipo_Usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tipo_Usuario`
--

/*!40000 ALTER TABLE `Tipo_Usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tipo_Usuario` ENABLE KEYS */;

--
-- Table structure for table `_EtiquetasToMateriales`
--

DROP TABLE IF EXISTS `_EtiquetasToMateriales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_EtiquetasToMateriales` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL,
  UNIQUE KEY `_EtiquetasToMateriales_AB_unique` (`A`,`B`),
  KEY `_EtiquetasToMateriales_B_index` (`B`),
  CONSTRAINT `_EtiquetasToMateriales_ibfk_1` FOREIGN KEY (`A`) REFERENCES `Etiquetas` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_EtiquetasToMateriales_ibfk_2` FOREIGN KEY (`B`) REFERENCES `Materiales` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_EtiquetasToMateriales`
--

/*!40000 ALTER TABLE `_EtiquetasToMateriales` DISABLE KEYS */;
/*!40000 ALTER TABLE `_EtiquetasToMateriales` ENABLE KEYS */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Apellidos` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Numero_Cuenta` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Correo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Contrasena` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tipo_user` enum('ADMIN','PROFESOR','USER','INVITADO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES
(1,'Admin','administrador',NULL,'admin@gmail.com','1234567','ADMIN');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-30 23:06:53
