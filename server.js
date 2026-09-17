import express from 'express';

import pool from './db.js';

const app = express();
app.use(express.json());


//  atv 1 
app.post('/clientes', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const novoCliente = await pool.query(
      'INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    return res.status(201).json(novoCliente.rows[0]);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao salvar" });
  }
});

app.get('/clientes', async (req, res) => {
  try{
const verClientes = await pool.query(
  'select * from clientes' 
) 
return res.status(200).json(verClientes.rows)
}catch(err){}
});

app.put('/clientes/:id', async (req, res) => {
  const{id} = req.params 
  const { nome, email} = req.body
try{
const atualizarClientes = await pool.query('update clientes set nome = $1, email = $2 where id = $3  RETURNING *',[nome, email, Number(id)] )
return res.status(200).json(atualizarClientes.rows)
} catch (err) {
  console.log(err);
  
  return res.status(500).json({err})
}
})

app.delete('/clientes/:id', async (req, res) => {
  const {id} = req.params
  try{
    const deletarClientes = await pool.query('DELETE FROM clientes WHERE id = $1;', [Number(id)])
    return res.status(200).json(deletarClientes.rows)
  } catch (err) {}
})







// atv 2 
app.post('/produtos', async (req, res) => {
  const { produto, valor, status, cliente_id } = req.body
  try {
    const cadastrarPedidos = await pool.query(
      'INSERT INTO pedidos ( produto, valor, status, cliente_id ) VALUES ($1, $2, $3, $4) RETURNING *',
      [produto, valor, status, cliente_id]
    )
    return res.status(201).json(cadastrarPedidos.rows[0]);
  } catch (err) {
    console.log(err);
    
    return res.status(500).json({ erro: "Erro ao salvar" });
  }

})
// atv2
app.get('/produtos', async (req, res) => {
  try {
    const procurarProduto = await pool.query(
      'SELECT * FROM pedidos INNER JOIN clientes ON pedidos.cliente_id = clientes.id'
    );
    return res.status(200).json(procurarProduto.rows)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ erro: "Erro ao salvar" });
  }
});

  app.listen(3000, () => console.log("http://localhost:30000"));
