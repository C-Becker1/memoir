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

-- Volcando estructura para tabla memoria.outfit
CREATE TABLE IF NOT EXISTS srg.`outfit` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Información de cada outfit';

-- Volcando datos para la tabla memoria.outfit: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `outfit` DISABLE KEYS */;
INSERT INTO `outfit` (`ID`, `Name`, `Description`) VALUES
	(1, 'VESTIMENTA DE INVIERNO', 'VESTIMENTA PRINCIPALMENTE ORIENTADA AL INVIERNO'),
	(2, 'VESTIMENTA DE VERANO', 'VESTIMENTA PRINCIPALMENTE ORIENTADA AL VERANO'),
	(3, 'Vestimenta 1', 'Vestimenta 1'),
	(4, 'Vestimenta 2', 'Vestimenta 2'),
	(5, 'Vestimenta 3', 'Vestimenta 3'),
	(6, 'Vestimenta 4', 'Vestimenta 4'),
	(7, 'Vestimenta 5', 'Vestimenta 5'),
	(8, 'Vestimenta 6', 'Vestimenta 6'),
	(9, 'Vestimenta 7', 'Vestimenta 7'),
	(10, 'Vestimenta 8', 'Vestimenta 8'),
	(11, 'Vestimenta 9', 'Vestimenta 9'),
	(12, 'Vestimenta 10', 'Vestimenta 10');
/*!40000 ALTER TABLE `outfit` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
