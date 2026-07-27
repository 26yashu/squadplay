const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const packs = ["Classic", "Funny", "Party", "Friends", "Family", "Ice Breaker", "Office", "College"];
const difficulties = ["easy", "medium", "hard"];

const truthTemplates = [
  "What is your biggest fear involving [noun]?",
  "Have you ever lied about [noun]?",
  "What is the most embarrassing thing you've done at [place]?",
  "Who is your secret crush in [place]?",
  "What is the worst [noun] you've ever had?",
  "Have you ever [verb] a [noun]?",
  "If you had to [verb] for the rest of your life, would you?",
  "What is a secret you've kept from [person]?",
  "When was the last time you [verb] in public?",
  "What is the weirdest [noun] you own?"
];

const dareTemplates = [
  "I dare you to [action] like a [noun].",
  "Call [person] and tell them you [verb].",
  "Do [number] pushups while yelling [noun]!",
  "Let the group [action] your [noun].",
  "Eat a spoonful of [food].",
  "Sing a song about [noun] for [number] seconds.",
  "Act like a [noun] until your next turn.",
  "Post a picture of a [noun] on social media.",
  "Speak in a [adjective] accent for [number] minutes.",
  "Send a text to [person] saying [phrase]."
];

const nouns = ["spider", "clown", "school", "work", "pizza", "dog", "cat", "car", "phone", "shoe", "socks", "teacher", "boss", "friend"];
const verbs = ["eaten", "stolen", "kissed", "hugged", "broken", "thrown", "hidden", "found"];
const places = ["school", "work", "the mall", "the park", "a party", "home", "the office"];
const persons = ["your best friend", "your mom", "your boss", "your crush", "a stranger"];
const actions = ["dance", "sing", "jump", "crawl", "draw on", "style"];
const foods = ["hot sauce", "mustard", "ketchup", "mayo", "salt", "sugar", "cinnamon"];
const adjectives = ["British", "Southern", "French", "robot", "pirate", "alien"];
const numbers = ["10", "20", "30", "5", "15"];
const phrases = ["I love you", "I lost my shoe", "Help me", "I'm a banana", "You are awesome"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePrompt(type) {
  let template = type === 'truth' ? getRandom(truthTemplates) : getRandom(dareTemplates);
  return template
    .replace("[noun]", getRandom(nouns))
    .replace("[verb]", getRandom(verbs))
    .replace("[place]", getRandom(places))
    .replace("[person]", getRandom(persons))
    .replace("[action]", getRandom(actions))
    .replace("[food]", getRandom(foods))
    .replace("[adjective]", getRandom(adjectives))
    .replace("[number]", getRandom(numbers))
    .replace("[phrase]", getRandom(phrases));
}

let data = [];
let idCounter = 1;

packs.forEach(pack => {
  // Target: 250 Truths, 250 Dares per pack
  ['truth', 'dare'].forEach(type => {
    for (let i = 0; i < 250; i++) {
      let diff = getRandom(difficulties);
      data.push({
        id: `tod-${pack.toLowerCase().replace(/ /g, '-')}-${type}-${idCounter++}`,
        type: type,
        pack: pack,
        difficulty: diff,
        text: generatePrompt(type) + ` (Variation #${i})`,
        tags: [pack.toLowerCase()]
      });
    }
  });
});

fs.writeFileSync(path.join(outputDir, 'truth-or-dare.json'), JSON.stringify(data, null, 2));
console.log(`Generated ${data.length} Truth or Dare prompts.`);
