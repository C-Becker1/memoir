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
CREATE TABLE IF NOT EXISTS `cloth_opinion` (
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

-- Volcando datos para la tabla memoria.cloth_opinion: ~15 rows (aproximadamente)
/*!40000 ALTER TABLE `cloth_opinion` DISABLE KEYS */;
INSERT INTO `cloth_opinion` (`ID`, `ID_Cloth`, `ID_User`, `Weather_Classification`, `GoodLooks_Calification`, `ID_Outfit`) VALUES
	(75, 1, 1, 1, 1, 2),
	(76, 1, 1, 2, 1, 2),
	(77, 1, 1, 3, 1, 2),
	(78, 1, 1, 4, 1, 2),
	(79, 1, 1, 5, 1, 2),
	(80, 2, 1, 1, 1, 2),
	(81, 2, 1, 2, 1, 2),
	(82, 2, 1, 3, 1, 2),
	(83, 2, 1, 4, 1, 2),
	(84, 2, 1, 5, 1, 2),
	(85, 4, 1, 1, 1, 2),
	(86, 4, 1, 3, 1, 2),
	(87, 4, 1, 5, 1, 2),
	(88, 4, 1, 2, 1, 2),
	(89, 4, 1, 4, 1, 2);
/*!40000 ALTER TABLE `cloth_opinion` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
