-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 09. 12:14
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
-- Tábla szerkezet ehhez a táblához `booking`
--

CREATE TABLE `booking` (
  `start` date NOT NULL,
  `and` date NOT NULL,
  `adult` int(10) NOT NULL,
  `kids` int(10) NOT NULL,
  `baby_bed` tinyint(1) NOT NULL,
  `room` int(11) NOT NULL,
  `comment` varchar(300) COLLATE utf8_hungarian_ci NOT NULL
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
(2, 'Nyári buli', 'Nyaribuli.png', '2024-07-05 21:00:00', 'A Diamond Lake Wellness Hotel nyári bulija a vendégek számára tökéletes kikapcsolódást nyújt egy gyönyörű környezetben. A buli a szálloda kertjében vagy medenceterületén zajlik, hangulatos dekorációkkal és zenészekkel, DJ-kkel teremtve jó hangulatot. Frissítő koktélok és ingyenes sörök szolgálják az italkínálatot, míg a grillezett ételek és könnyű fogások kiegészítik az élményt. Ez a buli ideális lehetőség a vendégek számára, hogy lazítsanak és élvezzék a nyári estéket a szálloda kellemes környezetében.'),
(3, 'Szabaduló szoba', 'Szabaduloszoba.png', '2024-09-17 13:00:00', 'A \"Gyilkosság a Szállodában\" nevű szabadulószoba a Diamond Lake Wellness Hotel egyedi és izgalmas kalandja. A résztvevők rejtélyeket fejtenek meg és nyomokat követnek, hogy kiderítsék, mi történt a szállodában egy rejtélyes gyilkosság napján. Korlátozott időn belül kell megoldaniuk az összes feladatot, és sikeres kijutással dicséretben részesülnek. Ez az élmény ideális csapatok számára, akik szeretik a kihívásokat és az együttműködést.'),
(4, 'Valentín nap', 'Valentinnap.png', '2024-02-14 00:00:00', 'A Diamond Lake Wellness Szálloda Valentin-napi estje különleges élményt nyújt a szerelmes pároknak. A romantikus környezet, üdvözlő italok és szív alakú csokoládék előkészítik a hangulatot. Az exkluzív étteremben kreatív menüt kínálnak, melyet élőzenével tesznek még emlékezetesebbé. A vacsora után a párok romantikus sétát tehetnek a hotel kertjében, majd wellness részlegükben pihenhetnek a szaunában és jakuzziban.\r\n\r\n\r\n\r\n\r\n'),
(5, 'Húsvét', 'Husvet.png', '2024-03-31 00:00:00', 'A Diamond Lake Wellness Szálloda húsvéti hétvégéje varázslatos élményeket kínál vendégeinek. A festői környezetben elhelyezkedő szálloda kényeztető programokkal várja látogatóit, mint például wellness kezelések és tojáskeresés. Az elegáns szobákban pihenésre és feltöltődésre nyílik lehetőség, míg az étteremben tradicionális húsvéti vacsorát szolgálnak fel. Az esti szórakozásról élőzenés előadások és tematikus bulik gondoskodnak. A Diamond Lake Wellness Hotel egy igazi oázis az ünnepek alatt.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `room`
--

CREATE TABLE `room` (
  `id` int(10) NOT NULL,
  `type` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `price` int(11) NOT NULL,
  `img` varchar(50) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `room`
--

INSERT INTO `room` (`id`, `type`, `price`, `img`) VALUES
(1, 'Standard', 12000, 'standardszoba.jpg'),
(2, 'Superior', 20900, 'superior1.jpg'),
(3, 'Deluxe', 25900, 'deluxe1.jpg'),
(4, 'Deluxe+', 29900, 'deluxe+1.jpg'),
(5, 'Lakosztály', 31900, 'lakosztalyteljes.jpg'),
(6, 'Nászutas Lakosztály', 34990, 'naszutaslakosztaly1.jpg'),
(7, 'Elnöki Lakosztály', 63500, 'elnokilakosztaly1.jpg'),
(8, 'Akadálymentesített', 69270, 'akadalymentesitett1.jpg');

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
-- A tábla indexei `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`room`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
