const express = require("express");
const router = express.Router();
const Course = require("../model/course");
const Category = require("../model/category");
/* GET users listing. */
router.get("/", async function (req, res, next) {
  const courses = await Course.find();
  res.render("courses", {
    title: "Courses",
    courses,
  });
});


router.get('/update/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)
  res.render('updateCourse', {
    title: course.name,
    image: course.image,
    id: course.id
  })
})

router.post('/update/', async (req, res) => {
  const { name, image, id } = req.body
  await Course.findByIdAndUpdate(id, { name, image })
  res.redirect('/courses')
})

router.get('/remove/:id', async (req, res) => {
  const id = req.params.id
  await Course.findByIdAndRemove(id)
  res.redirect('/courses')
})

router.get("/course/create", async function (req, res, next) {
  const categories = await Category.find();
  console.log(categories);
  res.render("addCourse", {
    title: "Add",
    categories,
  });
});

router.post("/course/create", async function (req, res, next) {
  const { name, image, categoryID } = req.body;

  const course = new Course({
    name,
    image,
    categoryID,
  });

  await course.save();

  res.redirect("/courses");
});

module.exports = router;
