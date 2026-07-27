const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const wheels = ["Challenges", "Mini Games", "Rewards", "Punishments", "Truths", "Dares", "Random Tasks", "Player Picker"];

const templates = {
  "Challenges": ["Hold your breath for [time]", "Do [number] jumping jacks", "Balance a [object] on your head", "Speak like a [persona] for [time]"],
  "Mini Games": ["Rock Paper Scissors", "Thumb War", "Staring Contest", "Rhyme Time", "Categories", "Word Association"],
  "Rewards": ["Skip your next turn", "Assign a dare", "Get a free pass", "Double points", "Choose the next game"],
  "Punishments": ["Lose a turn", "Minus [number] points", "Do a dare", "Sing everything you say", "Wear a silly hat"],
  "Truths": ["Who do you like the most?", "What is your biggest fear?", "What is your most embarrassing memory?", "What is your secret talent?"],
  "Dares": ["Dance for [time]", "Call someone and say [phrase]", "Act like a [animal]", "Eat a spoon of [food]"],
  "Random Tasks": ["Fetch a [object]", "High five everyone", "Spin around [number] times", "Do a handstand"],
  "Player Picker": ["Player 1", "Player 2", "Player 3", "Player 4", "The person to your left", "The person to your right", "The youngest player", "The oldest player"]
};

const fillers = {
  "[time]": ["10 seconds", "30 seconds", "1 minute", "2 minutes"],
  "[number]": ["5", "10", "15", "20", "50"],
  "[object]": ["book", "cup", "shoe", "pillow", "phone"],
  "[persona]": ["pirate", "robot", "cowboy", "alien"],
  "[phrase]": ["I love cheese", "I am a banana", "What year is it?", "Help me!"],
  "[animal]": ["monkey", "dog", "cat", "elephant", "chicken"],
  "[food]": ["mustard", "ketchup", "hot sauce", "salt"]
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateText(cat) {
  let text = getRandom(templates[cat] || templates["Random Tasks"]);
  Object.keys(fillers).forEach(key => {
    if (text.includes(key)) {
      text = text.replace(key, getRandom(fillers[key]));
    }
  });
  return text;
}

let data = [];
let idCounter = 1;

wheels.forEach(wheel => {
  for (let i = 0; i < 110; i++) {
    data.push({
      id: `spinwheel-${wheel.toLowerCase().replace(/ /g, '-')}-${idCounter++}`,
      category: wheel,
      text: generateText(wheel) + ` (Var ${i})`,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    });
  }
});

fs.writeFileSync(path.join(outputDir, 'spin-wheel.json'), JSON.stringify(data, null, 2));
console.log(`Generated ${data.length} Spin Wheel entries.`);
