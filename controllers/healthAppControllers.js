const healthappDAO = require("../models/healthappModel");
const userDao = require("../models/userModel.js");
const db = new healthappDAO();
//db.init();

exports.entries_list = function (req, res) {
  res.render('entries', {
    title: "Health App",
    user: "user"
  });
}

exports.fitness_page = function (req, res) {
  res.render('fitness', {
    title: "Fitness",
    user: "user"
  });
}

exports.dashboard_page = function (req, res) {
  res.render('dashboard', {
    title: "Take care of your Health for your Wealth",
    user: "user"
  });
}

exports.lifestyle_page = function (req, res) {
  res.render('lifestyle', {
    title: "Healthy Lifestyle",
    user: "user"
  });
}

exports.nutrition_page = function (req, res) {
  res.render('nutrition', {
    title: "Nutrition",
    user: "user"
  });
}

exports.about_page = function (req, res) {
  res.render('about', {
    title: "About",
    user: "user"
  });
}


exports.show_login = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
  res.render("dashboard", {
    title: "Health App",
    user: "user"
  }); 
};

exports.landing_page = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("about", {
        title: "Your Health is Your Wealth",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err); 
    });
};

exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Health Tracker App",
    user: "user",
  });
};

exports.show_newFitness_entries = function(req, res){
      db.getAllFitnessEntries()
          .then((list, user) => {
              res.render('fitness_entry', {
                  'title': 'New Fitness Entry',
                  'fitness_db' : list,
              });
              console.log('promise resolved');
          })
          .catch((err) => {
              console.log('promise rejected', err);
          })
}


exports.show_All_Fitness = function(req, res){
  db.getAllFitnessEntries()
          .then((list, user) => {
              res.render('fitness', {
                  'title': 'Fitness',
                  'fitness_db': list,
                  'user': user
              });
              console.log('promise resolved');
          })
          .catch((err) => {
              console.log('promise rejected', err);
          })
    }
    

exports.show_newLifestyle_entries = function(req, res){
  db.getAllLifestyleEntries()
      .then((list, user) => {
          res.render('lifestyle_entry', {
              'title': 'New Lifestyle Entry',
              'lifestyle_db': list,
          });
          console.log('promise resolved');
      })
      .catch((err) => {
          console.log('promise rejected', err);
      })
}


exports.show_All_Lifestyle = function(req, res){
  db.getAllLifestylesEntries()
          .then((list, user) => {
              res.render('lifestyle', {
                  'title': 'Lifestyle',
                  'lifestyle_db': list,
                  'user': user
              });
              console.log('promise resolved');
          })
          .catch((err) => {
              console.log('promise rejected', err);
          })
    }

exports.show_newNutrition_entries = function(req, res){
  db.getAllNutritionEntries()
      .then((list, user) => {
          res.render('nutrition_entry', {
              'title': 'New Nutrition Entry',
              'nutrition_db': list,
          });
          console.log('promise resolved');
      })
      .catch((err) => {
          console.log('promise rejected', err);
      })
}

exports.show_All_Nutrition = function(req, res){
  db.getAllNutritionEntries()
          .then((list, user) => {
              res.render('nutrition', {
                  'title': 'Nutrition',
                  'nutrition_db': list,
                  'user': user
              });
              console.log('promise resolved');
          })
          .catch((err) => {
              console.log('promise rejected', err);
          })
    }


exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.description) {
    response.status(400).send("Entries must have an description.");
    return;
  }
  db.addEntry(req.body.description, req.body.start_date, req.body.end_date);
  res.redirect("/loggedIn");
};






exports.post_newFitness_entry = function (req, res) {
  console.log('processing post-new_entry conroller');
  if (!req.body.description) {
      response.status(400).send("Entries must have an description.");
      return;
  }
  db.addFitnessEntry(req.body.description, req.body.start_date, req.body.end_date);
  res.redirect("/fitness");
}

exports.post_newLifestyle_entry = function (req, res) {
  console.log('processing post-new_entry conroller');
  if (!req.body.description) {
      response.status(400).send("Entries must have an description.");
      return;
  }
  db.addLifestyleEntry(req.body.description, req.body.start_date, req.body.end_date);
  res.redirect("/lifestyle");
}

exports.post_newNutrition_entry = function (req, res) {
  console.log('processing post-new_entry conroller');
  if (!req.body.description) {
      response.status(400).send("Entries must have an description.");
      return;
  }
  db.addNutritionEntry(req.body.description, req.body.start_date, req.body.end_date);
  res.redirect("/nutrition");
}



exports.show_user_entries = function (req, res) {
  let user = req.params.description;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("entries", {
        title: "Your Health is Your Wealth",
        user: "user",
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.show_register_page = function (req, res) {
  res.render("user/register");
};


exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;

  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

exports.loggedIn_landing = function (req, res) {
db.getAllEntries().then((list) =>{
        res.render("dashboard", {
            title: "HEALTH APP",
            dashboard: list,
            user: "user"
        });
        console.log("promise resolved");
    })
    .catch((err)=>{
        console.log("promise rejected", err);
    });

};


exports.fitness_loggedIn_landing = function (req, res) {
db.getAllFitnessEntries.then((list) =>{
  res.render("fitness", {
      fitness: list,
      user: "user"
  });
  console.log("promise resolved");
})
.catch((err)=>{
  console.log("promise rejected", err);
});
}


exports.lifestyle_loggedIn_landing = function (req, res) {
  db.getAllLifestyleEntries().then((list) =>{
    res.render("lifestyle", {
      lifestyle: list,
        user: "user"
    });
    console.log("promise resolved");
})
.catch((err)=>{
    console.log("promise rejected", err);
});
}


exports.nutrition_loggedIn_landing = function (req, res) {
  db.getAllNutritionEntries().then((list) =>{
    res.render("nutrition", {
        nutrition: list,
        user: "user"
    });
    console.log("promise resolved");
})
.catch((err)=>{
    console.log("promise rejected", err);
});
}



exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/about");
};
