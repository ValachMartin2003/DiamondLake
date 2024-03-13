-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Már 13. 12:22
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `diamondlake`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `events`
--

CREATE TABLE `events` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `begin` date NOT NULL,
  `end` date NOT NULL,
  `deposit` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `events_item`
--

CREATE TABLE `events_item` (
  `events_id` int(10) NOT NULL,
  `room_id` int(10) NOT NULL,
  `price` int(10) NOT NULL,
  `person_number` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `programok`
--

CREATE TABLE `programok` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `img` varchar(50) NOT NULL,
  `expiration` datetime NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `programok`
--

INSERT INTO `programok` (`id`, `name`, `img`, `expiration`, `description`) VALUES
(1, 'Családi nap', 'csaladinap.png', '2024-06-22 10:00:00', 'A Diamond Lake Wellness szálloda különleges gyereknap programokat kínál, amelyek izgalmas és szórakoztató élményeket nyújtanak a kicsiknek és nagyoknak egyaránt. A rendezvények között szerepelhetnek vidám családi játékok, kreatív műhelyek és akár családi sportversenyek is, hogy mindenki jól szórakozzon és emlékezetes pillanatokkal gazdagodjon a szálloda vendégei között.'),
(2, 'Nyári buli', 'Nyaribuli.png', '2024-07-05 21:00:00', 'Nyári BULI'),
(3, 'Szabaduló szoba', 'Szabaduloszoba.png', '2024-09-17 13:00:00', 'Szabaduló szoba'),
(4, 'Valentínnap', 'Valentinnap.png', '2024-02-14 00:00:00', 'Valentín'),
(5, 'Husvét', 'Husvet.png', '2024-03-31 00:00:00', 'Husvét');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `room`
--

CREATE TABLE `room` (
  `id` int(10) NOT NULL,
  `type` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `houseroom` int(10) NOT NULL,
  `wifi` tinyint(1) NOT NULL,
  `minibar` tinyint(1) NOT NULL,
  `aircondicional` tinyint(1) NOT NULL,
  `tv` tinyint(1) NOT NULL,
  `price` int(11) NOT NULL,
  `img` varchar(50) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `room_img`
--

CREATE TABLE `room_img` (
  `id` int(10) NOT NULL,
  `room_id` int(10) NOT NULL,
  `image` varchar(50) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `type`
--

CREATE TABLE `type` (
  `id` char(1) NOT NULL,
  `type` varchar(10) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `type`
--

INSERT INTO `type` (`id`, `type`, `name`) VALUES
('F', 'GENDER', 'nő'),
('M', 'GENDER', 'férfi'),
('A', 'USER', 'adminisztátor'),
('G', 'USER', 'vendég'),
('L', 'USER', 'vezető'),
('N', 'USER', 'nincs hitelesítve'),
('U', 'USER', 'felhasználó'),
('W', 'USER', 'dolgozó');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` char(1) NOT NULL DEFAULT 'G',
  `name` varchar(100) NOT NULL,
  `born` date DEFAULT NULL,
  `gender` char(1) NOT NULL,
  `country_code` varchar(3) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `valid` tinyint(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `type`, `name`, `born`, `gender`, `country_code`, `phone`, `address`, `email`, `password`, `valid`) VALUES
(1, 'U', 'Bálint Bence Dániel', NULL, 'M', NULL, NULL, NULL, 'balint.bencedaniel-2019@keri.mako.hu', '1234Aa', 1),
(2, 'U', 'Bálint Gergő', NULL, 'M', NULL, NULL, NULL, 'balint.gergo-2019@keri.mako.hu', '1234Aa', 1),
(3, 'U', 'Földi Ákos Ádám', NULL, 'M', NULL, NULL, NULL, 'foldi.akosadam-2019@keri.mako.hu', '1234Aa', 1),
(4, 'U', 'Kányási Dávid Gergő', NULL, 'M', NULL, NULL, NULL, 'kanyasi.davidgergo-2019@keri.mako.hu', '1234Aa', 1),
(5, 'U', 'Kiss Benjámin Zoltán', NULL, 'M', NULL, NULL, NULL, 'kiss.benyaminzoltan-2019@keri.mako.hu', '1234Aa', 1),
(6, 'U', 'Surányi Csenge', '2004-04-09', 'F', '36', '702744229', '6900, Makó Szilágyi Dezső utca 25', 'suranyi.csenge-2019@keri.mako.hu', 'Lovasok33', 1),
(7, 'U', 'Szabó Martin Tamás', NULL, 'M', NULL, NULL, NULL, 'szabo.martintamas-2019@keri.mako.hu', '1234Aa', 1),
(8, 'U', 'Tóth Barnabás Gyula', NULL, 'M', NULL, NULL, NULL, 'toth.barnabasgyula-2019@keri.mako.hu', '1234Aa', 1),
(9, 'U', 'Török Ferenc', NULL, 'M', NULL, NULL, NULL, 'torok.ferenc-2019@keri.mako.hu', '1234Aa', 1),
(10, 'U', 'Valach Martin', NULL, 'M', NULL, NULL, NULL, 'valach.martin-2019@keri.mako.hu', '1234Aa', 1),
(11, 'U', 'Vörös Alexandra', NULL, 'F', NULL, NULL, NULL, 'voros.alexandra-2019@keri.mako.hu', '1234Aa', 1),
(12, 'A', 'Gera Imre', NULL, 'M', NULL, NULL, NULL, 'gera.imre.tch@gmail.com', '1234Aa', 1),
(13, 'A', 'Kiss Andrea', NULL, 'F', NULL, NULL, NULL, 'kissamail@gmail.com', '1234Aa', 1),
(14, 'A', 'Molnár Zsolt', NULL, 'M', NULL, NULL, NULL, 'molnarzsoltnavay@gmail.com', '1234Aa', 1),
(15, 'A', 'Ódry Attila', '1964-03-08', 'M', '36', '304816888', '6725 Szeged, Futrinka utca 66.', 'odry.attila@keri.mako.hu', '1234Aa', 1),
(16, 'A', 'Vidéki Gyula Milán', NULL, 'M', NULL, NULL, NULL, 'videki.gyula.milan@gmail.com', '1234Aa', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `events_item`
--
ALTER TABLE `events_item`
  ADD PRIMARY KEY (`events_id`,`room_id`),
  ADD KEY `room_id` (`room_id`);

--
-- A tábla indexei `programok`
--
ALTER TABLE `programok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `room_img`
--
ALTER TABLE `room_img`
  ADD PRIMARY KEY (`id`,`room_id`),
  ADD KEY `room_id` (`room_id`);

--
-- A tábla indexei `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type`,`id`) USING BTREE;

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `programok`
--
ALTER TABLE `programok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `events_item`
--
ALTER TABLE `events_item`
  ADD CONSTRAINT `events_item_ibfk_1` FOREIGN KEY (`events_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `events_item_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`);

--
-- Megkötések a táblához `room_img`
--
ALTER TABLE `room_img`
  ADD CONSTRAINT `room_img_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
