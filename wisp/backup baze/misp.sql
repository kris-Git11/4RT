-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2019 at 05:28 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `misp`
--

-- --------------------------------------------------------

--
-- Table structure for table `profili`
--

CREATE TABLE `profili` (
  `ID` int(25) NOT NULL,
  `NAZIV` varchar(25) COLLATE utf16_croatian_ci NOT NULL,
  `brzina` varchar(25) COLLATE utf16_croatian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_croatian_ci;

--
-- Dumping data for table `profili`
--

INSERT INTO `profili` (`ID`, `NAZIV`, `brzina`) VALUES
(1, 'profilGold', '1000k/1000k'),
(2, 'profil9', '1000k/1000k');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `IME` varchar(25) COLLATE utf16_croatian_ci DEFAULT NULL,
  `PREZIME` varchar(25) COLLATE utf16_croatian_ci DEFAULT NULL,
  `MAC` varchar(50) COLLATE utf16_croatian_ci DEFAULT NULL,
  `SSID` varchar(25) COLLATE utf16_croatian_ci DEFAULT NULL,
  `IP` varchar(15) COLLATE utf16_croatian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_croatian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `IME`, `PREZIME`, `MAC`, `SSID`, `IP`) VALUES
(1, 'Gabriel', 'Medvar', 'mac1', 'medvar01', '0'),
(2, 'Benjamin', 'Medvar', 'mac2', 'medvar01', '1'),
(3, 'Leonard', 'Medvar', 'mac3', 'medvar01', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `profili`
--
ALTER TABLE `profili`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profili`
--
ALTER TABLE `profili`
  MODIFY `ID` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
