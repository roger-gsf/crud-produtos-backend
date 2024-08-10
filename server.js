const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // XAMPP default password
    database: 'catalogo_produtos'
});

// Conectar ao banco de dados
connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados: ' + error.stack);
        return;
    }
    console.log('Conectado ao banco de dados com ID ' + connection.threadId);
});

// Endpoint para adicionar um Produto (POST) POST /produtos
app.post('/produtos', (req, res) => {
    const { produto_nome, produto_desc, produto_preco } = req.body;
    const sql = 'INSERT INTO produtos (produto_nome, produto_desc, produto_preco) VALUES (?, ?, ?)';
    connection.query(sql, [produto_nome, produto_desc, produto_preco], (error, results) => {
        if (error) {
            res.status(500).send('Erro ao adicionar produto.');
            return;
        }
        res.status(201).send('Produto adicionado com sucesso.');
    });
});


// Endpoint para obter todos os Produtos (GET) --> GET /produtos
app.get('/produtos', (req, res) => {
    connection.query('SELECT * FROM produtos', (error, results) => {
        if (error) {
            res.status(500).send('Erro ao obter produto.');
            return;
        }
        res.json(results);
    });
});

// Endpoint para obter um Produto por ID (GET) --> GET /produtos/:id
app.get('/produtos/:produto_id', (req, res) => {
    const { produto_id } = req.params;
    connection.query('SELECT * FROM produtos WHERE produto_id = ?', [produto_id], (error, results) => {
        if (error) {
            res.status(500).send('Erro ao obter produto.');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Produto inexistente.');
            return;
        }
        res.json(results[0]);
    });
});

// Endpoint para atualizar um Produto (PUT) --> PUT /produtos/:id
app.put('/produtos/:produto_id', (req, res) => {
    const { produto_id } = req.params;
    const { produto_nome, produto_desc, produto_preco } = req.body;
    const sql = 'UPDATE produtos SET produto_nome = ?, produto_desc = ?, produto_preco = ? WHERE produto_id = ?';
    connection.query(sql, [produto_nome, produto_desc, produto_preco, produto_id], (error, results) => {
        if (error) {
            res.status(500).send('Erro ao atualizar produto.');
            return;
        }
        res.send('Produto atualizado com sucesso.');
    });
});

// Endpoint para deletar um Produto (DELETE)
app.delete('/produtos/:produto_id', (req, res) => {
    const { produto_id } = req.params;
    connection.query('DELETE FROM produtos WHERE produto_id = ?', [produto_id], (error, results) => {
        if (error) {
            res.status(500).send('Erro ao deletar Produto.');
            return;
        }
        res.send('Produto deletado com sucesso.');
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
