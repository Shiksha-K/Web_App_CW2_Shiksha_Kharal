const express = require('express');
const router = express.Router();
const controller = require('../controllers/healthAppControllers.js');
const {login} = require('../auth/auth');
const {verify} = require('../auth/auth');


router.get('/healthApp', controller.entries_list);
router.get('/fitness', controller.fitness_page);
router.get('/dashboard',controller.dashboard_page);
router.get('/lifestyle',controller.lifestyle_page);
router.get('/nutrition',controller.nutrition_page);
router.get('/about',controller.about_page);


router.get('/posts/:author', controller.show_user_entries);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get("/loggedIn",verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);


router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get("/", controller.landing_page);
router.get('/new',verify,controller.show_new_entries);
router.get('/newFitnessEntry',verify,controller.show_newFitness_entries);
router.get('/newLifestyleEntry',verify,controller.show_newLifestyle_entries);
router.get('/newNutritionEntry',verify,controller.show_newNutrition_entries);

router.post('/new', verify, controller.post_new_entry);
router.post('/newFitnessEntry', verify, controller.post_newFitness_entry);
router.post('/newLifestyleEntry', verify, controller.post_newLifestyle_entry);
router.post('/newNutritionEntry', verify, controller.post_newNutrition_entry);

router.get('/fitnessLoggedIn', verify, controller.fitness_loggedIn_landing);
router.get('/lifestyleLoggedIn', verify, controller.lifestyle_loggedIn_landing);
router.get('/nutritionLoggedIn', verify, controller.nutrition_loggedIn_landing);

router.get('/showFitnessGoal', verify, controller.show_All_Fitness);
router.get('/showLifestyleGoal', verify, controller.show_All_Lifestyle);
router.get('/showNutritionGoal', verify, controller.show_All_Nutrition);


router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})
module.exports = router;