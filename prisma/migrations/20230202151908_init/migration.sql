-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profile_image` VARCHAR(191) NOT NULL DEFAULT 'profile.png',
    `investment_amount` INTEGER NOT NULL,
    `status_validasi` INTEGER NOT NULL,
    `user_agent` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;