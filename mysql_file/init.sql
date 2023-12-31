-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `db` ;

-- -----------------------------------------------------
-- Schema db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `db` ;

-- -----------------------------------------------------
-- Table `db`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nom_role_UNIQUE` (`name_role` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `id_role` INT NOT NULL,
  `image` LONGTEXT NULL,
  `google_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_user_role_idx` (`id_role` ASC) VISIBLE,
  UNIQUE INDEX `google_id_UNIQUE` (`google_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`id_role`)
    REFERENCES `db`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `db`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nom_role_UNIQUE` (`name_type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `text` LONGTEXT NULL,
  `file_path_input` VARCHAR(255) NULL,
  `file_path_result` VARCHAR(255) NULL,
  `id_user` INT NOT NULL,
  `id_type` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_log_user1_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_log_type1_idx` (`id_type` ASC) VISIBLE,
  CONSTRAINT `fk_log_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_type1`
    FOREIGN KEY (`id_type`)
    REFERENCES `db`.`type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `db`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nom_role_UNIQUE` (`name_status` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`user_request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`user_request` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `message` LONGTEXT NOT NULL,
  `image` LONGTEXT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `id_status` INT NOT NULL,
  `google_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_request_status1_idx` (`id_status` ASC) VISIBLE,
  UNIQUE INDEX `google_id_UNIQUE` (`google_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_request_status1`
    FOREIGN KEY (`id_status`)
    REFERENCES `db`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`package_request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`package_request` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_package` VARCHAR(45) NOT NULL,
  `message` LONGTEXT NOT NULL,
  `id_user` INT NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `link` VARCHAR(100) NOT NULL,
  `id_status` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_package_request_user1_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_package_request_status1_idx` (`id_status` ASC) VISIBLE,
  CONSTRAINT `fk_package_request_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_package_request_status1`
    FOREIGN KEY (`id_status`)
    REFERENCES `db`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
