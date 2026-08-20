
// ==========================================
// 🍋 LEMONADE STAND TYCOON
// ==========================================

// GAME VARIABLES
let cash = 20;
let supplies = 0;
let savings = 0;
let totalProfit = 0;
let cupsSold = 0;

let currentLevel = 1;
let interestTimer = 20;

// TIMERS
let interestInterval;
let customerInterval;


// ==========================================
// LEVELS
// ==========================================

const levels = [
  {
    level: 1,
    name: "🍋 Lemonade Rookie",
    goal: "Make your first $10 profit!",
    target: 10,
    type: "profit"
  },
  {
    level: 2,
    name: "🥤 Neighborhood Stand",
    goal: "Sell 50 cups of lemonade!",
    target: 50,
    type: "cups"
  },
  {
    level: 3,
    name: "💰 Lemonade Boss",
    goal: "Have $50 in business cash!",
    target: 50,
    type: "cash"
  },
  {
    level: 4,
    name: "🐷 Super Saver",
    goal: "Grow your piggy bank to $25!",
    target: 25,
    type: "savings"
  },
  {
    level: 5,
    name: "👑 Lemonade Tycoon",
    goal: "Reach $100 total wealth!",
    target: 100,
    type: "wealth"
  }
];


// ==========================================
// SUPPLY PRICES
// ==========================================

const supplyPrices = {
  5: 2,
  10: 4,
  25: 8
};


// ==========================================
// START GAME
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  updateDisplay();
  startInterestTimer();
  startCustomers();
});


// ==========================================
// BUY SUPPLIES
// ==========================================

function buySupplies(amount) {
  const price = supplyPrices[amount];

  if (cash < price) {
    showMessage("You don't have enough money! 💵");
    return;
  }

  cash = cash - price;
  supplies = supplies + amount;

  showMessage(
    "You bought " + amount + " cups of supplies! 🍋"
  );

  updateDisplay();
  checkLevelProgress();
}


// ==========================================
// SELL LEMONADE
// ==========================================

function sellLemonade() {
  if (supplies <= 0) {
    showMessage("You're out of lemonade supplies! 🍋");
    return;
  }

  supplies = supplies - 1;

  cash = cash + 1;

  totalProfit = totalProfit + 0.60;

  cupsSold = cupsSold + 1;

  const customers = [
    "🧒",
    "👧",
    "🧑",
    "👩",
    "👨",
    "👵",
    "👴"
  ];

  const messages = [
    "Yum! 😋",
    "This is delicious!",
    "Can I have another?",
    "Best lemonade ever!",
    "So refreshing!",
    "Thanks! 🍋"
  ];

  const randomCustomer =
    customers[Math.floor(Math.random() * customers.length)];

  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)];

  document.getElementById("customer").textContent =
    randomCustomer;

  document.getElementById("customerBubble").textContent =
    randomMessage;

  showMessage("Lemonade sold! +$1.00 💰");

  updateDisplay();
  checkLevelProgress();
}


// ==========================================
// SAVE MONEY
// ==========================================

function saveMoney(amount) {
  if (cash < amount) {
    showMessage(
      "You don't have enough cash to save that much! 🐷"
    );

    return;
  }

  cash = cash - amount;
  savings = savings + amount;

  showMessage(
    "You put $" + amount.toFixed(2) + " in your piggy bank! 🐷"
  );

  updateDisplay();
  checkLevelProgress();
}


// ==========================================
// INTEREST TIMER
// ==========================================

function startInterestTimer() {
  clearInterval(interestInterval);

  interestTimer = 20;

  interestInterval = setInterval(function () {
    interestTimer = interestTimer - 1;

    updateInterestMessage();

    if (interestTimer <= 0) {
      growSavings();
      interestTimer = 20;
    }
  }, 1000);
}


// ==========================================
// GROW SAVINGS
// ==========================================

function growSavings() {
  if (savings <= 0) {
    updateInterestMessage();
    return;
  }

  const growth = savings * 0.05;

  savings = savings + growth;

  showMessage(
    "✨ Your piggy bank grew by $" +
    growth.toFixed(2) +
    "!"
  );

  updateDisplay();
  checkLevelProgress();
}


// ==========================================
// CUSTOMER SYSTEM
// ==========================================

function startCustomers() {
  clearInterval(customerInterval);

  customerInterval = setInterval(function () {
    if (supplies > 0) {
      showCustomer();
    }
  }, 7000);
}


function showCustomer() {
  const customer = document.getElementById("customer");
  const bubble = document.getElementById("customerBubble");

  customer.textContent = "🧒";

  bubble.textContent =
    "I'd like some lemonade! 🥤";

  customer.style.transform =
    "translateX(-20px)";

  setTimeout(function () {
    customer.style.transform =
      "translateX(0)";
  }, 300);
}


// ==========================================
// LEVEL PROGRESS
// ==========================================

function getProgressValue(level) {
  if (level.type === "profit") {
    return totalProfit;
  }

  if (level.type === "cups") {
    return cupsSold;
  }

  if (level.type === "cash") {
    return cash;
  }

  if (level.type === "savings") {
    return savings;
  }

  if (level.type === "wealth") {
    return cash + savings;
  }

  return 0;
}


function checkLevelProgress() {
  const level = levels[currentLevel - 1];

  if (!level) {
    return;
  }

  const progress = getProgressValue(level);

  if (progress >= level.target) {
    levelUp();
  }
}


// ==========================================
// LEVEL UP
// ==========================================

function levelUp() {
  if (currentLevel >= levels.length) {
    showMessage(
      "🏆 You are officially a Lemonade Tycoon!"
    );

    return;
  }

  const completedLevel = levels[currentLevel - 1];

  currentLevel = currentLevel + 1;

  const newLevel = levels[currentLevel - 1];

  document.getElementById("levelUpTitle").textContent =
    "🎉 LEVEL " + currentLevel + "!";

  document.getElementById("levelUpMessage").textContent =
    "You completed " +
    completedLevel.name +
    "! Your new goal is " +
    newLevel.goal;

  document.getElementById("levelUpBox").classList.remove("hidden");

  updateDisplay();
}


function closeLevelUp() {
  document.getElementById("levelUpBox").classList.add("hidden");

  const level = levels[currentLevel - 1];

  if (level) {
    showMessage(
      "New goal: " + level.goal
    );
  }

  updateDisplay();
}


// ==========================================
// UPDATE EVERYTHING ON SCREEN
// ==========================================

function updateDisplay() {
  document.getElementById("cash").textContent =
    "$" + cash.toFixed(2);

  document.getElementById("supplies").textContent =
    supplies + " cups";

  document.getElementById("savings").textContent =
    "$" + savings.toFixed(2);

  document.getElementById("profit").textContent =
    "$" + totalProfit.toFixed(2);

  updateLevelDisplay();
  updateSellButton();
  updateInterestMessage();
}


// ==========================================
// UPDATE LEVEL DISPLAY
// ==========================================

function updateLevelDisplay() {
  const level = levels[currentLevel - 1];

  if (!level) {
    return;
  }

  document.getElementById("levelNumber").textContent =
    currentLevel;

  document.getElementById("levelName").textContent =
    level.name;

  document.getElementById("goalText").textContent =
    "Goal: " + level.goal;

  const progress = getProgressValue(level);

  const percentage =
    Math.min(
      (progress / level.target) * 100,
      100
    );

  document.getElementById("goalProgress").style.width =
    percentage + "%";

  if (level.type === "cups") {
    document.getElementById("progressText").textContent =
      Math.floor(progress) +
      " / " +
      level.target +
      " cups";
  } else {
    document.getElementById("progressText").textContent =
      "$" +
      progress.toFixed(2) +
      " / $" +
      level.target;
  }
}


// ==========================================
// SELL BUTTON
// ==========================================

function updateSellButton() {
  const button =
    document.getElementById("sellButton");

  const message =
    document.getElementById("sellMessage");

  if (supplies > 0) {
    button.disabled = false;

    message.textContent =
      "A customer is ready! Serve them some lemonade!";
  } else {
    button.disabled = true;

    message.textContent =
      "Buy supplies first, then serve your customers!";
  }
}


// ==========================================
// INTEREST MESSAGE
// ==========================================

function updateInterestMessage() {
  const message =
    document.getElementById("interestMessage");

  if (savings > 0) {
    message.textContent =
      "Next growth: " +
      interestTimer +
      "s";
  } else {
    message.textContent =
      "Deposit money to start growing!";
  }
}


// ==========================================
// MESSAGE BOX
// ==========================================

function showMessage(message) {
  const box =
    document.getElementById("messageBox");

  box.textContent = message;

  box.style.transform =
    "scale(1.02)";

  setTimeout(function () {
    box.style.transform =
      "scale(1)";
  }, 150);
}


// ==========================================
// RESTART GAME
// ==========================================

function restartGame() {
  const confirmed =
    confirm(
      "Are you sure you want to start a new lemonade stand?"
    );

  if (!confirmed) {
    return;
  }

  cash = 20;
  supplies = 0;
  savings = 0;
  totalProfit = 0;
  cupsSold = 0;

  currentLevel = 1;
  interestTimer = 20;

  document.getElementById("levelUpBox")
    .classList.add("hidden");

  showMessage(
    "Welcome back! Let's build your lemonade empire! 🍋"
  );

  updateDisplay();
}

