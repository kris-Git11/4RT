-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2019 at 07:00 PM
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
-- Database: `wisp`
--

-- --------------------------------------------------------

--
-- Table structure for table `profili`
--

CREATE TABLE `profili` (
  `ID` int(25) NOT NULL,
  `NAZIV` varchar(25) COLLATE utf16_croatian_ci NOT NULL,
  `BRZNA` varchar(25) COLLATE utf16_croatian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_croatian_ci;

--
-- Dumping data for table `profili`
--

INSERT INTO `profili` (`ID`, `NAZIV`, `BRZNA`) VALUES
(1, 'profil1', '5k/5k');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `IME` varchar(25) COLLATE utf16_croatian_ci DEFAULT NULL,
  `PREZIME` varchar(25) COLLATE utf16_croatian_ci DEFAULT NULL,
  `PROFIL` varchar(25) COLLATE utf16_croatian_ci DEFAULT NULL,
  `IP` varchar(15) COLLATE utf16_croatian_ci DEFAULT NULL,
  `MAC` varchar(50) COLLATE utf16_croatian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_croatian_ci;

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
  MODIFY `ID` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
