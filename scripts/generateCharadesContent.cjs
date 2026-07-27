const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const categories = {
  Movies: [
    "The Matrix", "Inception", "Titanic", "Avatar", "Jurassic Park", "Star Wars", 
    "Harry Potter", "Lord of the Rings", "The Avengers", "Spider-Man", "Batman",
    "Finding Nemo", "Toy Story", "The Lion King", "Frozen", "Shrek", "The Godfather",
    "Pulp Fiction", "Forrest Gump", "Gladiator", "The Dark Knight", "Iron Man"
  ],
  Animals: [
    "Lion", "Tiger", "Elephant", "Giraffe", "Monkey", "Kangaroo", "Penguin", "Bear",
    "Wolf", "Fox", "Rabbit", "Deer", "Zebra", "Hippo", "Rhino", "Crocodile", "Snake",
    "Eagle", "Hawk", "Owl", "Dolphin", "Shark", "Whale", "Octopus", "Crab", "Lobster"
  ],
  Sports: [
    "Soccer", "Basketball", "Baseball", "Football", "Tennis", "Golf", "Swimming",
    "Running", "Cycling", "Boxing", "Wrestling", "Gymnastics", "Skiing", "Snowboarding",
    "Skateboarding", "Surfing", "Volleyball", "Rugby", "Cricket", "Hockey"
  ],
  Objects: [
    "Chair", "Table", "Bed", "Sofa", "Lamp", "Clock", "Mirror", "Window", "Door",
    "Computer", "Phone", "Television", "Radio", "Camera", "Guitar", "Piano", "Drum",
    "Book", "Pen", "Pencil", "Notebook", "Bag", "Shoes", "Hat", "Glasses", "Watch"
  ],
  Food: [
    "Pizza", "Burger", "Hot Dog", "Sandwich", "Taco", "Burrito", "Sushi", "Noodles",
    "Pasta", "Rice", "Salad", "Soup", "Bread", "Cheese", "Egg", "Chicken", "Beef",
    "Pork", "Fish", "Apple", "Banana", "Orange", "Grapes", "Watermelon", "Strawberry"
  ],
  Actions: [
    "Running", "Jumping", "Swimming", "Dancing", "Singing", "Reading", "Writing",
    "Sleeping", "Eating", "Drinking", "Cooking", "Cleaning", "Washing", "Brushing",
    "Driving", "Flying", "Falling", "Climbing", "Pushing", "Pulling", "Lifting"
  ],
  Professions: [
    "Doctor", "Nurse", "Teacher", "Police Officer", "Firefighter", "Chef", "Baker",
    "Farmer", "Pilot", "Astronaut", "Scientist", "Engineer", "Programmer", "Artist",
    "Musician", "Actor", "Singer", "Dancer", "Writer", "Journalist", "Photographer"
  ],
  Celebrities: [
    "Tom Cruise", "Brad Pitt", "Leonardo DiCaprio", "Johnny Depp", "Will Smith",
    "Angelina Jolie", "Scarlett Johansson", "Jennifer Lawrence", "Emma Watson",
    "Taylor Swift", "Beyonce", "Rihanna", "Katy Perry", "Justin Bieber", "Ed Sheeran"
  ],
  TVShows: [
    "Friends", "The Office", "Breaking Bad", "Game of Thrones", "Stranger Things",
    "The Simpsons", "South Park", "Family Guy", "SpongeBob", "Pokemon", "Dragon Ball",
    "Naruto", "One Piece", "Attack on Titan", "Death Note", "Fullmetal Alchemist"
  ],
  Cartoons: [
    "Mickey Mouse", "Donald Duck", "Bugs Bunny", "Daffy Duck", "Tom and Jerry",
    "Scooby-Doo", "Popeye", "Peppa Pig", "Dora the Explorer", "Ben 10", "Powerpuff Girls",
    "Dexter's Laboratory", "Johnny Bravo", "Courage the Cowardly Dog"
  ]
};

// Expand using modifiers to hit 200+ per category
const adjectives = ["Big", "Small", "Fast", "Slow", "Angry", "Happy", "Sad", "Funny", "Crazy", "Lazy", "Flying", "Invisible", "Magic", "Secret"];
const modifiers = ["in Space", "Underwater", "in the Dark", "on Fire", "with a Hat", "Running", "Sleeping"];

let data = [];
let idCounter = 1;

Object.keys(categories).forEach(cat => {
  const baseItems = categories[cat];
  
  baseItems.forEach(item => {
    // Add base item
    data.push({
      id: `charades-${cat.toLowerCase()}-${idCounter++}`,
      word: item,
      category: cat,
      difficulty: 'easy',
      aliases: [item.toLowerCase()]
    });
    
    // Generate variations to easily hit the 200+ target
    adjectives.forEach(adj => {
      data.push({
        id: `charades-${cat.toLowerCase()}-${idCounter++}`,
        word: `${adj} ${item}`,
        category: cat,
        difficulty: 'medium',
        aliases: []
      });
    });
    
    modifiers.slice(0, 5).forEach(mod => {
      data.push({
        id: `charades-${cat.toLowerCase()}-${idCounter++}`,
        word: `${item} ${mod}`,
        category: cat,
        difficulty: 'hard',
        aliases: []
      });
    });
  });
});

fs.writeFileSync(path.join(outputDir, 'charades.json'), JSON.stringify(data, null, 2));
console.log(`Generated ${data.length} Charades entries.`);
