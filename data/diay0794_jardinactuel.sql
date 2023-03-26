-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 24 mars 2023 à 21:37
-- Version du serveur : 10.6.12-MariaDB
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `diay0794_jardinactuel`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Guides & Conseils'),
(2, 'Permaculture');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `date` datetime NOT NULL,
  `published` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `author_id`, `post_id`, `content`, `date`, `published`) VALUES
(2, 6, 1, 'Super article !', '2023-03-03 00:38:27', 1),
(3, 7, 2, 'Intéressant', '2023-03-03 00:38:27', 1),
(4, 6, 3, 'Merci pour toutes ces informations', '2023-03-03 00:38:27', 1),
(5, 6, 5, 'Toujours un plaisir de lire vos articles', '2023-03-03 00:38:27', 1),
(6, 7, 5, 'Top ces astuces !', '2023-03-03 00:38:27', 1),
(7, 3, 4, 'Merci pour tous ces produits ! Ça a l\'air top', '2023-03-03 00:38:27', 1),
(8, 6, 2, 'Pour mes géraniums, je pourrais mettre quoi ?', '2023-03-03 00:38:27', 1),
(9, 7, 5, 'Merci pour ces astuces :)', '2023-03-19 21:34:53', 1),
(15, 3, 13, 'Merci pour ces astuces, je vais les essayer dans mon jardin !', '2022-06-02 00:00:00', 1),
(16, 6, 14, 'Je ne savais pas que les plantes aromatiques avaient autant de bienfaits, merci pour cet article !', '2022-06-06 00:00:00', 1),
(17, 6, 15, 'Super article, très utile pour les débutants en jardinage !', '2022-06-11 00:00:00', 1),
(18, 7, 16, 'J\'adore les plantes grimpantes, merci pour ces idées de variétés !', '2022-06-16 00:00:00', 1),
(19, 6, 17, 'Les fleurs les plus parfumées, mon sujet préféré ! Merci pour ces conseils.', '2022-06-21 00:00:00', 1),
(20, 7, 17, 'Quel article nul !', '2022-06-21 00:00:00', 1),
(21, 3, 18, 'Très bon article, j\'ai pu créer mon potager bio grâce à ces conseils !', '2022-07-02 00:00:00', 1),
(22, 6, 19, 'Merci pour cette liste de légumes, j\'ai planté des courgettes et des tomates et elles ont bien poussé !', '2022-07-06 00:00:00', 1),
(23, 7, 20, 'Je cherchais des plantes d\'intérieur faciles à entretenir, merci pour cette sélection !', '2022-07-11 00:00:00', 1),
(24, 7, 21, 'J\'ai créé une haie fleurie dans mon jardin et c\'est magnifique, merci pour les conseils !', '2022-07-16 00:00:00', 1),
(25, 6, 22, 'Je ne savais pas comment faire sécher mes plantes aromatiques, merci pour cet article très utile !', '2022-07-21 00:00:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20230227002537', '2023-02-27 01:25:44', 206),
('DoctrineMigrations\\Version20230302232925', '2023-03-03 00:29:31', 35),
('DoctrineMigrations\\Version20230313101142', '2023-03-13 11:11:59', 47);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `date` datetime NOT NULL,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `author_id`, `category_id`, `title`, `content`, `date`, `picture`) VALUES
(1, 3, 1, '6 plantes originales à faire pousser dans votre appartement', 'Vous rêvez d\'un peu de verdure dans votre appartement, mais vous ne savez pas quoi planter ? Rassurez-vous, il existe des plantes originales pour apporter une touche de nature à votre logement !', '2023-03-03 00:30:23', 'http://localhost:8081/uploads/posts/post1.png'),
(2, 6, 1, 'Les différents types de terreaux', 'Terreau de bruyère, universel, horticole, pour semis, ... Vous vous sentez perdu ? Rassurez-vous, rien de compliqué ! À chaque type de plantation son terreau.', '2023-03-03 00:30:23', 'http://localhost:8081/uploads/posts/post2.png'),
(3, 6, 1, 'Le guide du jardin urbain en forme', 'Un jardin en ville ? Cela impose quelques contraintes. Retrouvez les meilleurs conseils du jardin urbain dans cet article !', '2023-03-13 12:34:53', 'http://localhost:8081/uploads/posts/post4.png'),
(4, 7, 2, 'Pots et jardinières à tester cet été', 'Retrouvez les pots et jardinières les plus tendances et préparez votre été jardinage 2023 !', '2023-03-13 15:34:53', 'http://localhost:8081/uploads/posts/post5.png'),
(5, 7, 2, 'Les 7 meilleures astuces pour entretenir son potager', 'Garder son potager en forme toute l\'année n\'est pas toujours très simple... Retrouvez les 7 meilleures astuces pour entretenir son potager !', '2023-03-13 18:37:10', 'http://localhost:8081/uploads/posts/post6.png'),
(13, 3, 1, '10 astuces pour réussir votre potager', 'Voici les 10 astuces indispensables pour réussir votre potager cet été...', '2023-06-01 00:00:00', 'http://localhost:8081/uploads/posts/post3.png'),
(14, 3, 2, 'Les bienfaits des plantes aromatiques', 'Découvrez les nombreux bienfaits des plantes aromatiques pour votre santé...', '2022-06-05 00:00:00', 'http://localhost:8081/uploads/posts/post7.png'),
(15, 3, 1, 'Comment planter des tomates', 'Tout ce que vous devez savoir pour planter des tomates et les faire pousser chez vous...', '2022-06-10 00:00:00', 'http://localhost:8081/uploads/posts/post8.png'),
(16, 6, 2, 'Les plantes grimpantes pour embellir votre jardin', 'Découvrez les différentes plantes grimpantes pour ajouter de la verdure et de la couleur à votre jardin...', '2022-06-15 00:00:00', 'http://localhost:8081/uploads/posts/post9.png'),
(17, 7, 1, 'Les fleurs les plus parfumées pour votre jardin', 'Découvrez les fleurs les plus parfumées pour ajouter une touche de douceur à votre jardin...', '2022-06-20 00:00:00', 'http://localhost:8081/uploads/posts/post10.png'),
(18, 3, 1, 'Comment créer un potager bio', 'Découvrez comment créer un potager bio étape par étape...', '2022-07-01 00:00:00', 'http://localhost:8081/uploads/posts/post11.png'),
(19, 6, 1, 'Les légumes à planter en été', 'Découvrez les légumes qui se plantent en été pour une récolte réussie...', '2022-07-05 00:00:00', 'http://localhost:8081/uploads/posts/post12.png'),
(20, 7, 2, '10 plantes d\'intérieur faciles à entretenir', 'Voici une sélection de 10 plantes d\'intérieur faciles à entretenir, même pour les débutants...', '2022-07-10 00:00:00', 'http://localhost:8081/uploads/posts/post16.png'),
(21, 7, 1, 'Comment créer une haie fleurie', 'Découvrez comment créer une haie fleurie pour embellir votre jardin...', '2022-07-15 00:00:00', 'http://localhost:8081/uploads/posts/post17.png'),
(22, 6, 2, 'Comment faire sécher des plantes aromatiques', 'Découvrez comment faire sécher vos plantes aromatiques pour les conserver plus longtemps...', '2022-07-20 00:00:00', 'http://localhost:8081/uploads/posts/post18.png');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `name`) VALUES
(3, 'admin@admin.fr', '[\"ROLE_USER\", \"ROLE_ADMIN\"]', '$2y$13$.F6QrNbnwe8m.cg0IjGwxOywPJ7QYrsb.eftsfJmbXGUkC1ZgJ4i6', 'Administrateur'),
(6, 'john.doe@example.com', '[\"ROLE_USER\", \"ROLE_ADMIN\"]', '$2y$13$.F6QrNbnwe8m.cg0IjGwxOywPJ7QYrsb.eftsfJmbXGUkC1ZgJ4i6', 'John Doe'),
(7, 'jane.smith@example.com', '[\"ROLE_USER\", \"ROLE_ADMIN\"]', '$2y$13$.F6QrNbnwe8m.cg0IjGwxOywPJ7QYrsb.eftsfJmbXGUkC1ZgJ4i6', 'Jane Smith');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9474526CF675F31B` (`author_id`),
  ADD KEY `IDX_9474526C4B89032C` (`post_id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5A8A6C8DF675F31B` (`author_id`),
  ADD KEY `IDX_5A8A6C8D12469DE2` (`category_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_9474526C4B89032C` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  ADD CONSTRAINT `FK_9474526CF675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK_5A8A6C8D12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FK_5A8A6C8DF675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
