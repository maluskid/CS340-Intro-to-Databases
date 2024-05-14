-- MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_maluskid
-- ------------------------------------------------------
-- Server version	10.6.17-MariaDB-log

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
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `CustomerID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerName` varchar(50) DEFAULT NULL,
  `AddressLine1` varchar(50) DEFAULT NULL,
  `AddressLine2` varchar(50) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `PostalCode` varchar(50) DEFAULT NULL,
  `YTDPurchases` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Bike World','600025 Bollinger Canyon Road',NULL,'San Ramon','California','94583',NULL),(2,'Metro Sports','482505 Warm Springs Blvd.',NULL,'Fremont','California','94536',NULL),(3,'Mud Skidz Bike Wrld','400222 Gnarly Ln.',NULL,'Santa Cruz','California','97777',NULL);
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Invoices`
--

DROP TABLE IF EXISTS `Invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Invoices` (
  `InvoiceID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerID` int(11) DEFAULT NULL,
  `InvoiceDate` datetime DEFAULT NULL,
  `TermsCodeID` varchar(50) DEFAULT NULL,
  `TotalDue` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`InvoiceID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `TermsCodeID` (`TermsCodeID`),
  CONSTRAINT `Invoices_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customers` (`CustomerID`),
  CONSTRAINT `Invoices_ibfk_2` FOREIGN KEY (`TermsCodeID`) REFERENCES `TermsCode` (`TermsCodeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoices`
--

LOCK TABLES `Invoices` WRITE;
/*!40000 ALTER TABLE `Invoices` DISABLE KEYS */;
INSERT INTO `Invoices` VALUES (1,2,'2014-02-07 00:00:00','NET30',2388.98),(2,1,'2014-02-02 00:00:00','210NET30',2443.35),(3,1,'2014-02-09 00:00:00','NET30',8752.32);
/*!40000 ALTER TABLE `Invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TermsCode`
--

DROP TABLE IF EXISTS `TermsCode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TermsCode` (
  `TermsCodeID` varchar(50) NOT NULL,
  `Description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`TermsCodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TermsCode`
--

LOCK TABLES `TermsCode` WRITE;
/*!40000 ALTER TABLE `TermsCode` DISABLE KEYS */;
INSERT INTO `TermsCode` VALUES ('210NET30','2% discount in 10 days Net 30'),('NET15','Payment due in 15 days.'),('NET30','Payment due in 30 days.');
/*!40000 ALTER TABLE `TermsCode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsg_cert`
--

DROP TABLE IF EXISTS `bsg_cert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bsg_cert` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_cert`
--

LOCK TABLES `bsg_cert` WRITE;
/*!40000 ALTER TABLE `bsg_cert` DISABLE KEYS */;
INSERT INTO `bsg_cert` VALUES (1,'Raptor'),(2,'Viper'),(3,'Mechanic'),(4,'Command');
/*!40000 ALTER TABLE `bsg_cert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsg_cert_people`
--

DROP TABLE IF EXISTS `bsg_cert_people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bsg_cert_people` (
  `cid` int(11) NOT NULL DEFAULT 0,
  `pid` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`cid`,`pid`),
  KEY `pid` (`pid`),
  CONSTRAINT `bsg_cert_people_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `bsg_cert` (`id`),
  CONSTRAINT `bsg_cert_people_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `bsg_people` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_cert_people`
--

LOCK TABLES `bsg_cert_people` WRITE;
/*!40000 ALTER TABLE `bsg_cert_people` DISABLE KEYS */;
INSERT INTO `bsg_cert_people` VALUES (1,7),(2,2),(2,4),(3,8),(3,9),(4,2),(4,3),(4,6);
/*!40000 ALTER TABLE `bsg_cert_people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsg_people`
--

DROP TABLE IF EXISTS `bsg_people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bsg_people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `homeworld` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `homeworld` (`homeworld`),
  CONSTRAINT `bsg_people_ibfk_1` FOREIGN KEY (`homeworld`) REFERENCES `bsg_planets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_people`
--

LOCK TABLES `bsg_people` WRITE;
/*!40000 ALTER TABLE `bsg_people` DISABLE KEYS */;
INSERT INTO `bsg_people` VALUES (1,'William','Adama',3,61),(2,'Lee','Adama',3,30),(3,'Laura','Roslin',3,NULL),(4,'Kara','Thrace',3,NULL),(5,'Gaius','Baltar',3,NULL),(6,'Saul','Tigh',NULL,71),(7,'Karl','Agathon',1,NULL),(8,'Galen','Tyrol',1,32),(9,'Callandra','Henderson',NULL,NULL);
/*!40000 ALTER TABLE `bsg_people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsg_planets`
--

DROP TABLE IF EXISTS `bsg_planets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bsg_planets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `population` bigint(20) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `capital` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsg_planets`
--

LOCK TABLES `bsg_planets` WRITE;
/*!40000 ALTER TABLE `bsg_planets` DISABLE KEYS */;
INSERT INTO `bsg_planets` VALUES (1,'Gemenon',2800000000,'Old Gemenese','Oranu'),(2,'Leonis',2600000000,'Leonese','Luminere'),(3,'Caprica',4900000000,'Caprican','Caprica City'),(7,'Sagittaron',1700000000,NULL,'Tawa'),(16,'Aquaria',25000,NULL,NULL),(17,'Canceron',6700000000,NULL,'Hades'),(18,'Libran',2100000,NULL,NULL),(19,'Picon',1400000000,NULL,'Queestown'),(20,'Scorpia',450000000,NULL,'Celeste'),(21,'Tauron',2500000000,'Tauron','Hypatia'),(22,'Virgon',4300000000,NULL,'Boskirk');
/*!40000 ALTER TABLE `bsg_planets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnostic`
--

DROP TABLE IF EXISTS `diagnostic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diagnostic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostic`
--

LOCK TABLES `diagnostic` WRITE;
/*!40000 ALTER TABLE `diagnostic` DISABLE KEYS */;
INSERT INTO `diagnostic` VALUES (1,'MySQL is working for maluskid!');
/*!40000 ALTER TABLE `diagnostic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-18  6:38:33
