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

-- Volcando estructura para tabla memoria.cloth
CREATE TABLE IF NOT EXISTS srg.`cloth` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `IMG_Route` varchar(200) DEFAULT NULL,
  `ClothCategory` varchar(15) DEFAULT NULL,
  `ClothCategoryName` varchar(25) DEFAULT NULL,
  `Floral` bit(1) DEFAULT NULL,
  `Graphic` bit(1) DEFAULT NULL,
  `Striped` bit(1) DEFAULT NULL,
  `Embroidered` bit(1) DEFAULT NULL,
  `Pleated` bit(1) DEFAULT NULL,
  `Solid` bit(1) DEFAULT NULL,
  `Lattice` bit(1) DEFAULT NULL,
  `Long_Sleeve` bit(1) DEFAULT NULL,
  `Short_Sleeve` bit(1) DEFAULT NULL,
  `Sleeveless` bit(1) DEFAULT NULL,
  `Maxi_Length` bit(1) DEFAULT NULL,
  `Mini_Length` bit(1) DEFAULT NULL,
  `No_Dress` bit(1) DEFAULT NULL,
  `Crew_Neckline` bit(1) DEFAULT NULL,
  `V_Neckline` bit(1) DEFAULT NULL,
  `Square_Neckline` bit(1) DEFAULT NULL,
  `No_Neckline` bit(1) DEFAULT NULL,
  `Denim` bit(1) DEFAULT NULL,
  `Chiffon` bit(1) DEFAULT NULL,
  `Cotton` bit(1) DEFAULT NULL,
  `Leather` bit(1) DEFAULT NULL,
  `Faux` bit(1) DEFAULT NULL,
  `Knit` bit(1) DEFAULT NULL,
  `Tight` bit(1) DEFAULT NULL,
  `Loose` bit(1) DEFAULT NULL,
  `Conventional` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20001 DEFAULT CHARSET=utf8mb4 COMMENT='Información de las prendas';

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
