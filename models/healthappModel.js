const nedb = require('nedb');
const path = require('path')

const db = {}

const filePaths = {
    fitness: path.join(__dirname, "../public", 'fitness.db'),
    lifestyle: path.join(__dirname, "../public", 'lifestyle.db'),
    nutrition: path.join(__dirname, "../public", 'nutrition.db')
};


class HealthApp {
    constructor() {
        if (filePaths) {
            this.fitness_db = new nedb({
                filename: filePaths.fitness,
                autoload: true,
                timestampData: true
            });
            console.log('Fitness Database connected to ' + filePaths.fitness);

            this.lifestyle_db = new nedb({
                filename: filePaths.lifestyle,
                autoload: true,
                timestampData: true
            });
            console.log('Lifestyle Database connected to ' + filePaths.lifestyle);

            this.nutrition_db = new nedb({
                filename: filePaths.nutrition,
                autoload: true,
                timestampData: true
            });
            console.log('Nutrition Database connected to ' + filePaths.nutrition);
        } else {
            this.db = new nedb();
        
        }
    }




    //a function to return all fitness entries from the database
getAllFitnessEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
    //use the find() function of the database to get the data,
    //error first callback function, err for error, entries for data
    this.fitness_db.find({}, function(err, fitness) {
    //if error occurs reject Promise
    if (err) {
    reject(err);
    //if no error resolve the promise & return the data
    } else {
    resolve(fitness);
    //to see what the returned data looks like
    console.log('function all() returns: ', fitness);
    }
    })
    })
    }


    //a function to return all lifestyle entries from the database
getAllLifestyleEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
    //use the find() function of the database to get the data,
    //error first callback function, err for error, entries for data
    this.lifestyle_db.find({}, function(err, lifestyle) {
    //if error occurs reject Promise
    if (err) {
    reject(err);
    //if no error resolve the promise & return the data
    } else {
    resolve(lifestyle);
    //to see what the returned data looks like
    console.log('function all() returns: ', lifestyle);
    }
    })
    })
    }


    //a function to return all nutrition entries from the database
getAllNutritionEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
    //use the find() function of the database to get the data,
    //error first callback function, err for error, entries for data
    this.nutrition_db.find({}, function(err, nutrition) {
    //if error occurs reject Promise
    if (err) {
    reject(err);
    //if no error resolve the promise & return the data
    } else {
    resolve(nutrition);
    //to see what the returned data looks like
    console.log('function all() returns: ', nutrition);
    }
    })
    })
    }



    addFitnessEntry(description, start_date, end_date) {
        var fitness_entry = {
            description: description,
            start_date: start_date,
            end_date: end_date,
            published: new Date().toISOString().split('T')[0]
        }
        console.log('fitness entry created', fitness_entry);
        this.fitness_db.insert(fitness_entry, function(err, doc) {
            if (err) {
                console.log('Error inserting fitness document', description);
            } else {
                console.log('fitness document inserted into the database', doc);
            }
        })
    }
        
        

    addLifestyleEntry(description, start_date, end_date) {
        var lifestyle_entry = {
        description: description,
        start_date: start_date,
        end_date: end_date,
        published: new Date().toISOString().split('T')[0]
        }
        console.log('lifestyle entry created', lifestyle_entry);
        this.lifestyle_db.insert(entrlifestyle_entryy, function(err, doc) {
        if (err) {
        console.log('Error inserting lifestyle document', description);
        } else {
        console.log('lifestyle document inserted into the database', doc);
        }
        }) 
    } 


    addNutritionEntry(description, start_date, end_date) {
        var nutrition_entry = {
        description: description,
        start_date: start_date,
        end_date: end_date,
        published: new Date().toISOString().split('T')[0]
        }
        console.log('nutrition entry created', nutrition_entry);
        this.nutrition_db.insert(nutrition_entry, function(err, doc) {
        if (err) {
        console.log('Error inserting nutrition document', description);
        } else {
        console.log('nutrition document inserted into the database', doc);
        }
    
        }) 
    } 





        
getEntriesByUser(descriptionName) {
            return new Promise((resolve, reject) => {
                this.db.find({ 'description': descriptionName }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                console.log('getEntriesByUser returns: ', entries);
            }
        })
    })
 }

}
module.exports = HealthApp;