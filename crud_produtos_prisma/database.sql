CREATE DATABASE catalogo_produtos;

USE catalogo_produtos;

CREATE TABLE IF NOT EXISTS produtos (
    produto_id INT AUTO_INCREMENT PRIMARY KEY,
    produto_nome VARCHAR(255) NOT NULL,
    produto_desc TEXT,
    produto_preco DECIMAL(10, 2)
);
