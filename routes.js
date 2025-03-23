const express = require('express');
const { getDB } = require('./api/connect');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Kullanıcıları Listele (READ)
router.get('/users', async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    console.error('❌ Hata (GET /users):', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Yeni Kullanıcı Ekle (CREATE)
router.post('/users', async (req, res) => {
  try {
    const db = getDB();
    const newUser = req.body;
    const result = await db.collection('users').insertOne(newUser);
    res.json({ insertedId: result.insertedId });
  } catch (error) {
    console.error('❌ Hata (POST /users):', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Kullanıcı Güncelle (UPDATE)
router.put('/users/:id', async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const updatedUser = req.body;
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updatedUser }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.json({ message: '✅ Kullanıcı güncellendi' });
  } catch (error) {
    console.error('❌ Hata (PUT /users/:id):', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Kullanıcı Sil (DELETE)
router.delete('/users/:id', async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.json({ message: '✅ Kullanıcı silindi' });
  } catch (error) {
    console.error('❌ Hata (DELETE /users/:id):', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
