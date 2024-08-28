-- CreateTable
CREATE TABLE `Produto` (
    `produto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto_nome` VARCHAR(191) NOT NULL,
    `produto_desc` VARCHAR(191) NOT NULL,
    `produto_preco` DECIMAL(5, 2) NOT NULL,

    PRIMARY KEY (`produto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
