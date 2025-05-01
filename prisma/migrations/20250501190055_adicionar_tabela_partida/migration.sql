-- CreateTable
CREATE TABLE `partida_historico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_partida` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `data_solicitacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `area_jogada` INTEGER NOT NULL,
    `peca_do_jogador` ENUM('x', 'o') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
