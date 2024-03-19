const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://charlynoudjalta:Charly_mongoDB2024@cluster0.igilc0q.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("database connecté")
}).catch((error)=>{
    console.error(error);
});


const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

const Person = mongoose.model('Person', personSchema);
const Charles = new Person({
    name: "Charles",
    age: 23,
    favoriteFoods:["pizza"]
});

/*
Charles.save().then((doc)=>{
    console.log(doc)
}).catch((error)=>{
    console.error(error);
})*/

Person.create([{
    name: "Joe",
    age: 25,
    favoriteFoods: ["burger"]
},{
    name: "Fallou",
    age: 22,
    favoriteFoods:["Yassa"]
}])

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  });
};

// Step 5: Create Many Records with model.create()
const arrayOfPeople = [
  { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Burgers'] },
  { name: 'Bob', age: 35, favoriteFoods: ['Tacos', 'Steak'] },
  { name: 'Mary', age: 40, favoriteFoods: ['Salad', 'Soup'] }
];

const createMaPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  });
};

// Step 6: Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  });
};

// Step 7: Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, person) {
    if (err) return console.error(err);
    done(null, person);
  });
};

// Step 8: Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);
    done(null, person);
  });
};

// Step 9: Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);
    person.favoriteFoods.push('Hamburger');
    person.save(function(err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

// Step 10: Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function(err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson);
    }
  );
};

// Step 11: Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, removedPerson) {
    if (err) return console.error(err);
    done(null, removedPerson);
  });
};

// Step 12: Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  Person.remove({ name: 'Mary' }, function(err, result) {
    if (err) return console.error(err);
    done(null, result);
  });
};

// Step 13: Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  Person.find({ favoriteFoods: 'Burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec(function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
};

// Export functions for testing
module.exports = {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain
};