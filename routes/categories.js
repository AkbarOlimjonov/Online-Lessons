const express = require('express');
const { find } = require('../model/category');
const router = express.Router();
const Category = require('../model/category')
const Product = require('../model/course')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const categories = await Category.find()
  res.render('categories', {
    title: 'Categories',
    categories
  });
});


router.get('/create', function (req, res, next) {
  res.render('addCategory', {
    title: 'Add'
  });
});

router.post('/create', async function (req, res, next) {
  const { name, image } = req.body

  const category = new Category({
    name,
    image
  })

  await category.save()

  res.redirect('/categories')

});

router.get('/remove/:id', async (req, res) => {
  const id = req.params.id
  const finds = await Product.find({categoryID:id})
  finds.forEach(async (val) => {
    await Product.findByIdAndDelete(val.id)
  });
  
  await Category.findByIdAndRemove(id)
  res.redirect('/categories')
})

router.get('/update/:id', async (req, res) => {
  const category = await Category.findById(req.params.id)
  res.render('updateCategory', {
    title: 'update',
    name: category.name,
    image: category.image,
    id: category.id
  })
})

router.get('/:id', async (req, res) => {
  const products = await Product.find({ categoryID: req.params.id });
  const category = await Category.findById(req.params.id);
  res.render('category', {
    title:  category.name,
    products,
  })
})

router.post('/update/', async (req, res) => {
  const { name, image, id } = req.body

  await Category.findByIdAndUpdate(id, { name, image })

  res.redirect('/categories')
})
module.exports = router;
