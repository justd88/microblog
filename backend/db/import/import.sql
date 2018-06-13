CREATE DATABASE  IF NOT EXISTS `dev` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dev`;
-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: dev
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
INSERT INTO `connections` VALUES (1,1,2),(2,1,3),(3,2,1),(4,1,1),(5,2,3),(6,3,3),(7,4,4),(8,5,5),(9,6,6),(10,7,7),(11,8,8),(12,9,9),(13,10,10);
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) DEFAULT NULL,
  `content` tinytext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Hello','2018-06-11 12:59:12'),(2,2,'Bello','2018-06-11 13:00:07'),(8,1,'sdsd','2018-06-12 07:37:33'),(9,1,'asdasdasd','2018-06-12 07:38:41'),(28,1,'multi\\nline','2018-06-12 09:30:06'),(32,1,'minden fasza','2018-06-13 06:43:38'),(33,1,'klklk','2018-06-13 07:10:07'),(34,1,'New feature Test Post','2018-06-13 09:11:02'),(35,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in dolor ligula. Praesent at massa ante. Vivamus eget orci sed magna euismod massa nunc','2018-06-13 09:23:02'),(36,1,'New feature Test Post','2018-06-13 09:57:50'),(37,1,'New feature Test Post','2018-06-13 09:58:13'),(38,1,'dfgdfgdfg','2018-06-13 10:03:01'),(39,1,'sdfsdfsdfs','2018-06-13 10:06:55'),(45,1,'New feature Test Post','2018-06-13 15:29:46'),(47,1,'New feature Test Post','2018-06-13 15:31:43'),(49,1,'New feature Test Post','2018-06-13 15:33:19');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Silas'),(2,'Leonhard'),(3,'Ketti'),(4,'Donalt'),(5,'Berna'),(6,'Aurlie'),(7,'Nanci'),(8,'Rey'),(9,'Cordy'),(10,'Marcelle');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-13 18:53:51
