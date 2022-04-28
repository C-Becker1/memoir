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

-- Volcando estructura para tabla memoria.outfit_opinion
CREATE TABLE IF NOT EXISTS `outfit_opinion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Outfit` int DEFAULT NULL,
  `ID_User` int DEFAULT NULL,
  `Weather_Classification` int DEFAULT NULL,
  `GoodLooks_Calification` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Outfit` (`ID_Outfit`),
  KEY `ID_User` (`ID_User`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Opinion de un usuario sobre un outfit';

-- Volcando datos para la tabla memoria.outfit_opinion: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `outfit_opinion` DISABLE KEYS */;
INSERT INTO `outfit_opinion` (`ID`, `ID_Outfit`, `ID_User`, `Weather_Classification`, `GoodLooks_Calification`) VALUES
	(72, 2, 1, 1, 1),
	(73, 2, 1, 2, 1),
	(74, 2, 1, 3, 1),
	(75, 2, 1, 4, 1),
	(76, 2, 1, 5, 1);
/*!40000 ALTER TABLE `outfit_opinion` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
