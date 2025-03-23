const express = require('express');
const { getDB } = require('./db');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Kullanıcıları Listele (READ)
router.get('/users', async (req, res) => {
  const db = getDB();
  const users = await db.collection('users').find().toArray();
  res.json(users);
});

// Yeni Kullanıcı Ekle (CREATE)
router.post('/users', async (req, res) => {
  const db = getDB();
  const newUser = req.body;
  const result = await db.collection('users').insertOne(newUser);
  res.json({ insertedId: result.insertedId });
});

// Kullanıcı Güncelle (UPDATE)
router.put('/users/:id', async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const updatedUser = req.body;
  await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: updatedUser });
  res.json({ message: '✅ Kullanıcı güncellendi' });
});

// Kullanıcı Sil (DELETE)
router.delete('/users/:id', async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  await db.collection('users').deleteOne({ _id: new ObjectId(id) });
  res.json({ message: '✅ Kullanıcı silindi' });
});

module.exports = router;
