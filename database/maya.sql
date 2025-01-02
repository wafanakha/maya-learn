-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: maya2
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `step`
--

DROP TABLE IF EXISTS `step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `step` (
  `step_id` int NOT NULL AUTO_INCREMENT,
  `isi_table` varchar(1000) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `lesson_id` int NOT NULL,
  `judul_step` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`step_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `step_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `tutorial` (`lesson_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `step`
--

LOCK TABLES `step` WRITE;
/*!40000 ALTER TABLE `step` DISABLE KEYS */;
INSERT INTO `step` VALUES (15,'d','stepImg-1735710456456.jpg',15,'s'),(18,'asldkfna asldfkn\r\n\r\nasdlkfnasl;kdfnasldf\r\n\r\nalsdfnkldnfk\r\n','stepImg-1735732066701.jpg',18,'asdfasolknvzoic'),(19,'pdohonglken adfadf \r\nasday akadnald a\r\nfdasdflkasndfsa\r\nfs\r\ndf\r\nasdfaskndfalsdkfnasdf\r\nasdfsadf','stepImg-1735732066710.jpg',18,'lmao xd'),(20,'balalknasl;fnaslk;fna;slkdfa;lsknfd','stepImg-1735736824285.jpg',19,'cari suku cadang'),(21,'yayayayayayayayayya','stepImg-1735736824295.com_wallpaper.jpg',19,'tinggal buat'),(23,'shinoknoknoknonon',NULL,22,'nonkonooono'),(24,'mnbvcxz','stepImg-1735752471644.jpg',22,'ijjhipoihonnlnlknlknklnl');
/*!40000 ALTER TABLE `step` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorial`
--

DROP TABLE IF EXISTS `tutorial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorial` (
  `lesson_id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(50) NOT NULL,
  `durasi` varchar(20) NOT NULL,
  `isi_course` varchar(10000) NOT NULL,
  `tumb_image` varchar(100) DEFAULT NULL,
  `tipe` varchar(50) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`lesson_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tutorial_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorial`
--

LOCK TABLES `tutorial` WRITE;
/*!40000 ALTER TABLE `tutorial` DISABLE KEYS */;
INSERT INTO `tutorial` VALUES (15,'Membuat server menggunakan azure','30 menit','lalalal ladida','tumbnailImg-1735710456454.jpg','Technology',1),(18,'Membuat mobil bersama van diesel','2 jam','walalweknaflakdnfasldfkna;sldfknafk alsdkfn asdflk \r\n\r\nasdfknasldfknsldkfnlasdfnlaskdfnlsdkfnfd','tumbnailImg-1735732066691.jpg','otomotif',1),(19,'Membuat Rocket sederhana','50 jam','cara membuat rocket real no fake, blueprint didapatkan dari atlantis','tumbnailImg-1735736824272.jpg','technology',1),(22,'Membuat Pesawat Terbang sederhana','40 Jam','yesyesyesyesyeyseyseysyesyeyseysyeseys','tumbnailImg-1735752471635.jpeg','Teknologi',1);
/*!40000 ALTER TABLE `tutorial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(100) DEFAULT NULL,
  `tokenexpire` int DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'wafanakha17@gmail.com','Muhammad','$2b$10$d6O.9/QBuyh...n9EYnth.1g6pNB9d5AY9/EkWINn9KwvSf0/tcjm','',NULL),(2,'','','$2b$10$9MmZZOQumL7YjkcUBsQSlOGmFsGs4GUiHqWfqTNlEZuSVSKRhYpTO',NULL,NULL),(3,'wafanakha55@gmail.com','Muhammad','$2b$10$WUhnwtQplssnPANhzReL..vgCAG5.YaUaLH.6k2w2ACqzpBuQgPke',NULL,NULL),(5,'wafanakha10@gmail.com','Muhammad Afiq Tamamul Wafa','$2b$10$TnAsK1mG7m8m45qkNimcFuUzLlNElUp/Kb4gYbnXfC9LKG383t9Vu',NULL,NULL),(6,'wafanakha18@gmail.com','saya','$2b$10$3KPYEHbWfa9cHIQ5qqYB5.1RWtdXkZuJTacHYmmZCBQN0M.btorrC',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-02 15:03:46
