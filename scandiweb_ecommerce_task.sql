-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2025 at 08:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scandiweb_ecommerce_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `product_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `name`, `type`, `product_id`) VALUES
(1, 'Size', 'text', 'huarache-x-stussy-le'),
(2, 'Size', 'text', 'jacket-canada-goosee'),
(3, 'Color', 'swatch', 'ps-5'),
(4, 'Capacity', 'text', 'ps-5'),
(5, 'Color', 'swatch', 'xbox-series-s'),
(6, 'Capacity', 'text', 'xbox-series-s'),
(7, 'Capacity', 'text', 'apple-imac-2021'),
(8, 'With USB 3 ports', 'text', 'apple-imac-2021'),
(9, 'Touch ID in keyboard', 'text', 'apple-imac-2021'),
(10, 'Capacity', 'text', 'apple-iphone-12-pro'),
(11, 'Color', 'swatch', 'apple-iphone-12-pro');

-- --------------------------------------------------------

--
-- Table structure for table `attribute_values`
--

CREATE TABLE `attribute_values` (
  `id` bigint(20) NOT NULL,
  `value` varchar(255) NOT NULL,
  `displayValue` varchar(255) NOT NULL,
  `attribute_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attribute_values`
--

INSERT INTO `attribute_values` (`id`, `value`, `displayValue`, `attribute_id`) VALUES
(9, '40', '40', 1),
(10, '41', '41', 1),
(11, '42', '42', 1),
(12, '43', '43', 1),
(13, 'S', 'Small', 2),
(14, 'M', 'Medium', 2),
(15, 'L', 'Large', 2),
(16, 'XL', 'Extra Large', 2),
(17, '#44FF03', 'Green', 3),
(18, '#03FFF7', 'Cyan', 3),
(19, '#030BFF', 'Blue', 3),
(20, '#000000', 'Black', 3),
(21, '#FFFFFF', 'White', 3),
(22, '512G', '512G', 4),
(23, '1T', '1T', 4),
(24, '#44FF03', 'Green', 5),
(25, '#03FFF7', 'Cyan', 5),
(26, '#030BFF', 'Blue', 5),
(27, '#000000', 'Black', 5),
(28, '#FFFFFF', 'White', 5),
(29, '512G', '512G', 6),
(30, '1T', '1T', 6),
(31, '256GB', '256GB', 7),
(32, '512G', '512G', 7),
(33, 'Yes', 'Yes', 8),
(34, 'No', 'No', 8),
(35, 'Yes', 'Yes', 9),
(36, 'No', 'No', 9),
(37, '512G', '512G', 10),
(38, '1T', '1T', 10),
(39, '#44FF03', 'Green', 11),
(40, '#03FFF7', 'Cyan', 11),
(41, '#030BFF', 'Blue', 11),
(42, '#000000', 'Black', 11),
(43, '#FFFFFF', 'White', 11);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'all'),
(2, 'clothes'),
(3, 'tech');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `order_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`order_details`)),
  `order_status` varchar(255) NOT NULL,
  `total` float NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_details`, `order_status`, `total`, `created_at`) VALUES
(6, '[{\"id\": \"apple-iphone-12-pro\", \"name\": \"iPhone 12 Pro\", \"attrs\": [{\"id\": \"10\", \"name\": \"Capacity\", \"type\": \"text\", \"items\": [{\"id\": \"37\", \"value\": \"512G\", \"selected\": true, \"display_value\": \"512G\"}, {\"id\": \"38\", \"value\": \"1T\", \"selected\": false, \"display_value\": \"1T\"}]}, {\"id\": \"11\", \"name\": \"Color\", \"type\": \"swatch\", \"items\": [{\"id\": \"39\", \"value\": \"#44FF03\", \"selected\": false, \"display_value\": \"Green\"}, {\"id\": \"40\", \"value\": \"#03FFF7\", \"selected\": true, \"display_value\": \"Cyan\"}, {\"id\": \"41\", \"value\": \"#030BFF\", \"selected\": false, \"display_value\": \"Blue\"}, {\"id\": \"42\", \"value\": \"#000000\", \"selected\": false, \"display_value\": \"Black\"}, {\"id\": \"43\", \"value\": \"#FFFFFF\", \"selected\": false, \"display_value\": \"White\"}]}], \"prices\": [{\"amount\": 1001, \"currency\": {\"label\": \"USD\", \"symbol\": \"$\"}}], \"quantity\": 1}]', 'received', 1001, '2023-09-05 16:03:57'),
(11, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]}]', 'received', 300.23, '2025-04-20 18:30:38'),
(12, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]}]', 'received', 300.23, '2025-04-20 18:34:01'),
(13, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]}]', 'received', 300.23, '2025-04-20 18:47:01'),
(14, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]}]', 'received', 300.23, '2025-04-20 18:52:18'),
(15, '[{\"id\":\"apple-iphone-12-pro\",\"name\":\"iPhone 12 Pro\",\"quantity\":1,\"prices\":[{\"amount\":1001,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"10\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"37\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":true},{\"id\":\"38\",\"value\":\"1T\",\"displayValue\":\"1T\",\"selected\":false}]},{\"id\":\"11\",\"name\":\"Color\",\"type\":\"swatch\",\"items\":[{\"id\":\"39\",\"value\":\"#44FF03\",\"displayValue\":\"Green\",\"selected\":true},{\"id\":\"40\",\"value\":\"#03FFF7\",\"displayValue\":\"Cyan\",\"selected\":false},{\"id\":\"41\",\"value\":\"#030BFF\",\"displayValue\":\"Blue\",\"selected\":false},{\"id\":\"42\",\"value\":\"#000000\",\"displayValue\":\"Black\",\"selected\":false},{\"id\":\"43\",\"value\":\"#FFFFFF\",\"displayValue\":\"White\",\"selected\":false}]}]}]', 'received', 1001, '2025-04-20 19:14:47'),
(16, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]}]', 'received', 300.23, '2025-04-20 19:41:40'),
(17, '[{\"id\":\"apple-imac-2021\",\"name\":\"iMac 2021\",\"quantity\":1,\"prices\":[{\"amount\":1688,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"7\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"31\",\"value\":\"256GB\",\"displayValue\":\"256GB\",\"selected\":true},{\"id\":\"32\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":false}]},{\"id\":\"8\",\"name\":\"With USB 3 ports\",\"type\":\"text\",\"items\":[{\"id\":\"33\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"34\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]},{\"id\":\"9\",\"name\":\"Touch ID in keyboard\",\"type\":\"text\",\"items\":[{\"id\":\"35\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"36\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]}]}]', 'received', 1688, '2025-04-20 19:41:48'),
(18, '[{\"id\":\"apple-iphone-12-pro\",\"name\":\"iPhone 12 Pro\",\"quantity\":1,\"prices\":[{\"amount\":1001,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"10\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"37\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":true},{\"id\":\"38\",\"value\":\"1T\",\"displayValue\":\"1T\",\"selected\":false}]},{\"id\":\"11\",\"name\":\"Color\",\"type\":\"swatch\",\"items\":[{\"id\":\"39\",\"value\":\"#44FF03\",\"displayValue\":\"Green\",\"selected\":true},{\"id\":\"40\",\"value\":\"#03FFF7\",\"displayValue\":\"Cyan\",\"selected\":false},{\"id\":\"41\",\"value\":\"#030BFF\",\"displayValue\":\"Blue\",\"selected\":false},{\"id\":\"42\",\"value\":\"#000000\",\"displayValue\":\"Black\",\"selected\":false},{\"id\":\"43\",\"value\":\"#FFFFFF\",\"displayValue\":\"White\",\"selected\":false}]}]}]', 'received', 1001, '2025-04-21 08:57:20'),
(19, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]},{\"id\":\"apple-iphone-12-pro\",\"name\":\"iPhone 12 Pro\",\"quantity\":1,\"prices\":[{\"amount\":1001,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"10\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"37\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":true},{\"id\":\"38\",\"value\":\"1T\",\"displayValue\":\"1T\",\"selected\":false}]},{\"id\":\"11\",\"name\":\"Color\",\"type\":\"swatch\",\"items\":[{\"id\":\"39\",\"value\":\"#44FF03\",\"displayValue\":\"Green\",\"selected\":true},{\"id\":\"40\",\"value\":\"#03FFF7\",\"displayValue\":\"Cyan\",\"selected\":false},{\"id\":\"41\",\"value\":\"#030BFF\",\"displayValue\":\"Blue\",\"selected\":false},{\"id\":\"42\",\"value\":\"#000000\",\"displayValue\":\"Black\",\"selected\":false},{\"id\":\"43\",\"value\":\"#FFFFFF\",\"displayValue\":\"White\",\"selected\":false}]}]},{\"id\":\"apple-imac-2021\",\"name\":\"iMac 2021\",\"quantity\":1,\"prices\":[{\"amount\":1688,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"7\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"31\",\"value\":\"256GB\",\"displayValue\":\"256GB\",\"selected\":true},{\"id\":\"32\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":false}]},{\"id\":\"8\",\"name\":\"With USB 3 ports\",\"type\":\"text\",\"items\":[{\"id\":\"33\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"34\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]},{\"id\":\"9\",\"name\":\"Touch ID in keyboard\",\"type\":\"text\",\"items\":[{\"id\":\"35\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"36\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]}]}]', 'received', 2989.23, '2025-04-21 08:57:43'),
(20, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]}]', 'received', 300.23, '2025-04-21 11:50:20'),
(21, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]},{\"id\":\"apple-iphone-12-pro\",\"name\":\"iPhone 12 Pro\",\"quantity\":1,\"prices\":[{\"amount\":1001,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"10\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"37\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":true},{\"id\":\"38\",\"value\":\"1T\",\"displayValue\":\"1T\",\"selected\":false}]},{\"id\":\"11\",\"name\":\"Color\",\"type\":\"swatch\",\"items\":[{\"id\":\"39\",\"value\":\"#44FF03\",\"displayValue\":\"Green\",\"selected\":true},{\"id\":\"40\",\"value\":\"#03FFF7\",\"displayValue\":\"Cyan\",\"selected\":false},{\"id\":\"41\",\"value\":\"#030BFF\",\"displayValue\":\"Blue\",\"selected\":false},{\"id\":\"42\",\"value\":\"#000000\",\"displayValue\":\"Black\",\"selected\":false},{\"id\":\"43\",\"value\":\"#FFFFFF\",\"displayValue\":\"White\",\"selected\":false}]}]}]', 'received', 1301.23, '2025-04-21 12:17:35'),
(22, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]}]', 'received', 300.23, '2025-04-21 12:17:44'),
(23, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":2,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]},{\"id\":\"apple-imac-2021\",\"name\":\"iMac 2021\",\"quantity\":1,\"prices\":[{\"amount\":1688,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"7\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"31\",\"value\":\"256GB\",\"displayValue\":\"256GB\",\"selected\":true},{\"id\":\"32\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":false}]},{\"id\":\"8\",\"name\":\"With USB 3 ports\",\"type\":\"text\",\"items\":[{\"id\":\"33\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"34\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]},{\"id\":\"9\",\"name\":\"Touch ID in keyboard\",\"type\":\"text\",\"items\":[{\"id\":\"35\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"36\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]}]},{\"id\":\"jacket-canada-goosee\",\"name\":\"Jacket\",\"quantity\":1,\"prices\":[{\"amount\":518,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"2\",\"name\":\"Size\",\"type\":\"text\",\"items\":[{\"id\":\"13\",\"value\":\"S\",\"displayValue\":\"Small\",\"selected\":true},{\"id\":\"14\",\"value\":\"M\",\"displayValue\":\"Medium\",\"selected\":false},{\"id\":\"15\",\"value\":\"L\",\"displayValue\":\"Large\",\"selected\":false},{\"id\":\"16\",\"value\":\"XL\",\"displayValue\":\"Extra Large\",\"selected\":false}]}]}]', 'received', 2806.46, '2025-04-21 12:22:59'),
(24, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]},{\"id\":\"apple-imac-2021\",\"name\":\"iMac 2021\",\"quantity\":1,\"prices\":[{\"amount\":1688,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"7\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"31\",\"value\":\"256GB\",\"displayValue\":\"256GB\",\"selected\":true},{\"id\":\"32\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":false}]},{\"id\":\"8\",\"name\":\"With USB 3 ports\",\"type\":\"text\",\"items\":[{\"id\":\"33\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"34\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]},{\"id\":\"9\",\"name\":\"Touch ID in keyboard\",\"type\":\"text\",\"items\":[{\"id\":\"35\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"36\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]}]}]', 'received', 1988.23, '2025-04-21 15:10:45'),
(25, '[{\"id\":\"apple-iphone-12-pro\",\"name\":\"iPhone 12 Pro\",\"quantity\":1,\"prices\":[{\"amount\":1001,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"10\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"37\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":true},{\"id\":\"38\",\"value\":\"1T\",\"displayValue\":\"1T\",\"selected\":false}]},{\"id\":\"11\",\"name\":\"Color\",\"type\":\"swatch\",\"items\":[{\"id\":\"39\",\"value\":\"#44FF03\",\"displayValue\":\"Green\",\"selected\":true},{\"id\":\"40\",\"value\":\"#03FFF7\",\"displayValue\":\"Cyan\",\"selected\":false},{\"id\":\"41\",\"value\":\"#030BFF\",\"displayValue\":\"Blue\",\"selected\":false},{\"id\":\"42\",\"value\":\"#000000\",\"displayValue\":\"Black\",\"selected\":false},{\"id\":\"43\",\"value\":\"#FFFFFF\",\"displayValue\":\"White\",\"selected\":false}]}]},{\"id\":\"xbox-series-s\",\"name\":\"Xbox Series S 512GB\",\"quantity\":1,\"prices\":[{\"amount\":334,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"5\",\"name\":\"Color\",\"type\":\"swatch\",\"items\":[{\"id\":\"24\",\"value\":\"#44FF03\",\"displayValue\":\"Green\",\"selected\":true},{\"id\":\"25\",\"value\":\"#03FFF7\",\"displayValue\":\"Cyan\",\"selected\":false},{\"id\":\"26\",\"value\":\"#030BFF\",\"displayValue\":\"Blue\",\"selected\":false},{\"id\":\"27\",\"value\":\"#000000\",\"displayValue\":\"Black\",\"selected\":false},{\"id\":\"28\",\"value\":\"#FFFFFF\",\"displayValue\":\"White\",\"selected\":false}]},{\"id\":\"6\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"29\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":true},{\"id\":\"30\",\"value\":\"1T\",\"displayValue\":\"1T\",\"selected\":false}]}]}]', 'received', 1335, '2025-04-21 15:18:46'),
(26, '[{\"id\":\"apple-iphone-12-pro\",\"name\":\"iPhone 12 Pro\",\"quantity\":1,\"prices\":[{\"amount\":1001,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"10\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"37\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":true},{\"id\":\"38\",\"value\":\"1T\",\"displayValue\":\"1T\",\"selected\":false}]},{\"id\":\"11\",\"name\":\"Color\",\"type\":\"swatch\",\"items\":[{\"id\":\"39\",\"value\":\"#44FF03\",\"displayValue\":\"Green\",\"selected\":true},{\"id\":\"40\",\"value\":\"#03FFF7\",\"displayValue\":\"Cyan\",\"selected\":false},{\"id\":\"41\",\"value\":\"#030BFF\",\"displayValue\":\"Blue\",\"selected\":false},{\"id\":\"42\",\"value\":\"#000000\",\"displayValue\":\"Black\",\"selected\":false},{\"id\":\"43\",\"value\":\"#FFFFFF\",\"displayValue\":\"White\",\"selected\":false}]}]},{\"id\":\"jacket-canada-goosee\",\"name\":\"Jacket\",\"quantity\":1,\"prices\":[{\"amount\":518,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"2\",\"name\":\"Size\",\"type\":\"text\",\"items\":[{\"id\":\"13\",\"value\":\"S\",\"displayValue\":\"Small\",\"selected\":true},{\"id\":\"14\",\"value\":\"M\",\"displayValue\":\"Medium\",\"selected\":false},{\"id\":\"15\",\"value\":\"L\",\"displayValue\":\"Large\",\"selected\":false},{\"id\":\"16\",\"value\":\"XL\",\"displayValue\":\"Extra Large\",\"selected\":false}]}]}]', 'received', 0, '2025-04-21 15:20:55'),
(27, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]},{\"id\":\"apple-imac-2021\",\"name\":\"iMac 2021\",\"quantity\":1,\"prices\":[{\"amount\":1688,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"7\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"31\",\"value\":\"256GB\",\"displayValue\":\"256GB\",\"selected\":true},{\"id\":\"32\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":false}]},{\"id\":\"8\",\"name\":\"With USB 3 ports\",\"type\":\"text\",\"items\":[{\"id\":\"33\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"34\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]},{\"id\":\"9\",\"name\":\"Touch ID in keyboard\",\"type\":\"text\",\"items\":[{\"id\":\"35\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"36\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]}]}]', 'received', 1988.23, '2025-04-21 18:18:01'),
(28, '[{\"id\":\"ps-5\",\"name\":\"PlayStation 5\",\"quantity\":1,\"prices\":[{\"amount\":844,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"3\",\"name\":\"Color\",\"type\":\"swatch\",\"items\":[{\"id\":\"17\",\"value\":\"#44FF03\",\"displayValue\":\"Green\",\"selected\":true},{\"id\":\"18\",\"value\":\"#03FFF7\",\"displayValue\":\"Cyan\",\"selected\":false},{\"id\":\"19\",\"value\":\"#030BFF\",\"displayValue\":\"Blue\",\"selected\":false},{\"id\":\"20\",\"value\":\"#000000\",\"displayValue\":\"Black\",\"selected\":false},{\"id\":\"21\",\"value\":\"#FFFFFF\",\"displayValue\":\"White\",\"selected\":false}]},{\"id\":\"4\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"22\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":true},{\"id\":\"23\",\"value\":\"1T\",\"displayValue\":\"1T\",\"selected\":false}]}]}]', 'received', 844, '2025-04-21 20:44:25'),
(29, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]},{\"id\":\"apple-imac-2021\",\"name\":\"iMac 2021\",\"quantity\":1,\"prices\":[{\"amount\":1688,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"7\",\"name\":\"Capacity\",\"type\":\"text\",\"items\":[{\"id\":\"31\",\"value\":\"256GB\",\"displayValue\":\"256GB\",\"selected\":true},{\"id\":\"32\",\"value\":\"512G\",\"displayValue\":\"512G\",\"selected\":false}]},{\"id\":\"8\",\"name\":\"With USB 3 ports\",\"type\":\"text\",\"items\":[{\"id\":\"33\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"34\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]},{\"id\":\"9\",\"name\":\"Touch ID in keyboard\",\"type\":\"text\",\"items\":[{\"id\":\"35\",\"value\":\"Yes\",\"displayValue\":\"Yes\",\"selected\":true},{\"id\":\"36\",\"value\":\"No\",\"displayValue\":\"No\",\"selected\":false}]}]}]', 'received', 1988.23, '2025-04-22 14:29:01'),
(30, '[{\"id\":\"jacket-canada-goosee\",\"name\":\"Jacket\",\"quantity\":1,\"prices\":[{\"amount\":518,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[{\"id\":\"2\",\"name\":\"Size\",\"type\":\"text\",\"items\":[{\"id\":\"13\",\"value\":\"S\",\"displayValue\":\"Small\",\"selected\":false},{\"id\":\"14\",\"value\":\"M\",\"displayValue\":\"Medium\",\"selected\":false},{\"id\":\"15\",\"value\":\"L\",\"displayValue\":\"Large\",\"selected\":false},{\"id\":\"16\",\"value\":\"XL\",\"displayValue\":\"Extra Large\",\"selected\":true}]}]}]', 'received', 518, '2025-04-22 15:02:39'),
(31, '[{\"id\":\"apple-airpods-pro\",\"name\":\"AirPods Pro\",\"quantity\":1,\"prices\":[{\"amount\":300.23,\"currency\":{\"label\":\"USD\",\"symbol\":\"$\"}}],\"attributes\":[]}]', 'received', 300.23, '2025-04-22 20:24:15');

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `id` bigint(20) NOT NULL,
  `amount` float NOT NULL,
  `currency` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`currency`)),
  `product_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `amount`, `currency`, `product_id`) VALUES
(1, 145, '{\"label\": \"USD\", \"symbol\": \"$\"}', 'huarache-x-stussy-le'),
(2, 518, '{\"label\": \"USD\", \"symbol\": \"$\"}', 'jacket-canada-goosee'),
(3, 844, '{\"label\": \"USD\", \"symbol\": \"$\"}', 'ps-5'),
(4, 334, '{\"label\": \"USD\", \"symbol\": \"$\"}', 'xbox-series-s'),
(5, 1688, '{\"label\": \"USD\", \"symbol\": \"$\"}', 'apple-imac-2021'),
(6, 1001, '{\"label\": \"USD\", \"symbol\": \"$\"}', 'apple-iphone-12-pro'),
(7, 300.23, '{\"label\": \"USD\", \"symbol\": \"$\"}', 'apple-airpods-pro'),
(8, 121, '{\"label\": \"USD\", \"symbol\": \"$\"}', 'apple-airtag');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `inStock` tinyint(1) DEFAULT 1,
  `description` text NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`gallery`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `inStock`, `description`, `category_id`, `brand`, `gallery`) VALUES
('apple-airpods-pro', 'AirPods Pro', 1, '\\n<h3>Magic like you’ve never heard</h3>\\n<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.\\n\\n<h3>Active Noise Cancellation</h3>\\n<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.\\n\\n<h3>Transparency mode</h3>\\n<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p>\\n\\n<h3>All-new design</h3>\\n<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>\\n\\n<h3>Amazing audio quality</h3>\\n<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>\\n\\n<h3>Even more magical</h3>\\n<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>\\n', 3, 'Apple', '[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000\"]'),
('apple-airtag', 'AirTag', 0, '\\n<h1>Lose your knack for losing things.</h1>\\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>\\n', 3, 'Apple', '[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000\"]'),
('apple-imac-2021', 'iMac 2021', 1, 'The new iMac!', 3, 'Apple', '[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000\"]'),
('apple-iphone-12-pro', 'iPhone 12 Pro', 1, 'This is iPhone 12. Nothing else to say.', 1, 'Apple', '[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000\"]'),
('huarache-x-stussy-le', 'Nike Air Huarache Le', 0, 'Great sneakers for everyday use!', 2, 'Nike x Stussy', '[\"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087\", \"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087\", \"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087\", \"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087\", \"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087\"]'),
('jacket-canada-goosee', 'Jacket', 1, '<p>Awesome winter jacket</p>', 2, 'Canada Goose', '[\"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg\", \"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg\", \"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg\", \"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg\", \"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg\", \"https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png\", \"https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png\"]'),
('ps-5', 'PlayStation 5', 1, '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 3, 'Sony', '[\"https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg\"]'),
('xbox-series-s', 'Xbox Series S 512GB', 1, '<div>\\n    <ul>\\n        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>\\n        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>\\n        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>\\n        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>\\n        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>\\n        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>\\n        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>\\n        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>\\n        <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>\\n        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>\\n    </ul>\\n</div>', 3, 'Microsoft', '[\"https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg\", \"https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg\"]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attributes_products_id_fk` (`product_id`);

--
-- Indexes for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attribute_values_attributes_id_fk` (`attribute_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prices_products_id_fk` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_categories_id_fk` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `attribute_values`
--
ALTER TABLE `attribute_values`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attributes`
--
ALTER TABLE `attributes`
  ADD CONSTRAINT `attributes_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD CONSTRAINT `attribute_values_attributes_id_fk` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`);

--
-- Constraints for table `prices`
--
ALTER TABLE `prices`
  ADD CONSTRAINT `prices_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
