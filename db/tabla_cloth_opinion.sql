-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.27 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla memoria.cloth_opinion
CREATE TABLE IF NOT EXISTS srg.`cloth_opinion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Cloth` int DEFAULT NULL,
  `ID_User` int DEFAULT NULL,
  `Weather_Classification` int DEFAULT NULL,
  `GoodLooks_Calification` int DEFAULT NULL,
  `ID_Outfit` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Cloth` (`ID_Cloth`),
  KEY `ID_User` (`ID_User`),
  KEY `ID_Outfit` (`ID_Outfit`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Opinion de un usuario a una prenda en particular';

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
