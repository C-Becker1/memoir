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
CREATE TABLE IF NOT EXISTS `outfit` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Información de cada outfit';

-- Volcando datos para la tabla memoria.outfit: ~50 rows (aproximadamente)
/*!40000 ALTER TABLE `outfit` DISABLE KEYS */;
INSERT INTO `outfit` (`ID`, `Name`, `Description`) VALUES
	(1, 'Vestimenta 1', 'Vestimenta 1'),
	(2, 'Vestimenta 2', 'Vestimenta 2'),
	(3, 'Vestimenta 3', 'Vestimenta 3'),
	(4, 'Vestimenta 4', 'Vestimenta 4'),
	(5, 'Vestimenta 5', 'Vestimenta 5'),
	(6, 'Vestimenta 6', 'Vestimenta 6'),
	(7, 'Vestimenta 7', 'Vestimenta 7'),
	(8, 'Vestimenta 8', 'Vestimenta 8'),
	(9, 'Vestimenta 9', 'Vestimenta 9'),
	(10, 'Vestimenta 10', 'Vestimenta 10'),
	(11, 'Vestimenta 11', 'Vestimenta 11'),
	(12, 'Vestimenta 12', 'Vestimenta 12'),
	(13, 'Vestimenta 13', 'Vestimenta 13'),
	(14, 'Vestimenta 14', 'Vestimenta 14'),
	(15, 'Vestimenta 15', 'Vestimenta 15'),
	(16, 'Vestimenta 16', 'Vestimenta 16'),
	(17, 'Vestimenta 17', 'Vestimenta 17'),
	(18, 'Vestimenta 18', 'Vestimenta 18'),
	(19, 'Vestimenta 19', 'Vestimenta 19'),
	(20, 'Vestimenta 20', 'Vestimenta 20'),
	(21, 'Vestimenta 21', 'Vestimenta 21'),
	(22, 'Vestimenta 22', 'Vestimenta 22'),
	(23, 'Vestimenta 23', 'Vestimenta 23'),
	(24, 'Vestimenta 24', 'Vestimenta 24'),
	(25, 'Vestimenta 25', 'Vestimenta 25'),
	(26, 'Vestimenta 26', 'Vestimenta 26'),
	(27, 'Vestimenta 27', 'Vestimenta 27'),
	(28, 'Vestimenta 28', 'Vestimenta 28'),
	(29, 'Vestimenta 29', 'Vestimenta 29'),
	(30, 'Vestimenta 30', 'Vestimenta 30'),
	(31, 'Vestimenta 31', 'Vestimenta 31'),
	(32, 'Vestimenta 32', 'Vestimenta 32'),
	(33, 'Vestimenta 33', 'Vestimenta 33'),
	(34, 'Vestimenta 34', 'Vestimenta 34'),
	(35, 'Vestimenta 35', 'Vestimenta 35'),
	(36, 'Vestimenta 36', 'Vestimenta 36'),
	(37, 'Vestimenta 37', 'Vestimenta 37'),
	(38, 'Vestimenta 38', 'Vestimenta 38'),
	(39, 'Vestimenta 39', 'Vestimenta 39'),
	(40, 'Vestimenta 40', 'Vestimenta 40'),
	(41, 'Vestimenta 41', 'Vestimenta 41'),
	(42, 'Vestimenta 42', 'Vestimenta 42'),
	(43, 'Vestimenta 43', 'Vestimenta 43'),
	(44, 'Vestimenta 44', 'Vestimenta 44'),
	(45, 'Vestimenta 45', 'Vestimenta 45'),
	(46, 'Vestimenta 46', 'Vestimenta 46'),
	(47, 'Vestimenta 47', 'Vestimenta 47'),
	(48, 'Vestimenta 48', 'Vestimenta 48'),
	(49, 'Vestimenta 49', 'Vestimenta 49'),
	(50, 'Vestimenta 50', 'Vestimenta 50');
/*!40000 ALTER TABLE `outfit` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
