// ==========================================
// 🍋 LEMONADE STAND TYCOON — ROUND 1
// ==========================================

// ==========================================
// SUPPLY CONFIG (round 1: four supplies)
// ==========================================

const SUPPLIES = {
  cups: { icon: "🥤", name: "Cups", buyAmount: 10, price: 2.00 },
  lemons: { icon: "🍋", name: "Lemons", buyAmount: 10, price: 2.00 },
  ice: { icon: "🧊", name: "Ice", buyAmount: 10, price: 1.00 },
  sugar: { icon: "🍬", name: "Sugar", buyAmount: 10, price: 1.00 }
};

// ==========================================
// ICONS
// A plain outlined cup represents the raw supply.
// A filled cup represents a finished lemonade,
// used in customer orders and the recipe guide.
// ==========================================

const EMPTY_CUP_SVG =
  '<svg viewBox="0 0 40 40" width="30" height="30" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M11 9 H29 L26 33 Q26 36 23 36 H17 Q14 36 14 33 Z" fill="#ffffff" stroke="#c9a946" stroke-width="2.5"/>' +
  '<line x1="24" y1="2" x2="28" y2="12" stroke="#e84b3c" stroke-width="3" stroke-linecap="round"/>' +
  "</svg>";

const LEMONADE_CUP_SVG =
  '<svg viewBox="0 0 40 40" width="30" height="30" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M11 9 H29 L26 33 Q26 36 23 36 H17 Q14 36 14 33 Z" fill="#f9d65c" stroke="#c9a946" stroke-width="2.5"/>' +
  '<circle cx="20" cy="14" r="4.5" fill="#ffe98a" stroke="#e0b400" stroke-width="1.2"/>' +
  '<line x1="20" y1="14" x2="20" y2="9.5" stroke="#e0b400" stroke-width="1.2"/>' +
  '<line x1="20" y1="14" x2="16.5" y2="16.5" stroke="#e0b400" stroke-width="1.2"/>' +
  '<line x1="20" y1="14" x2="23.5" y2="16.5" stroke="#e0b400" stroke-width="1.2"/>' +
  '<line x1="24" y1="2" x2="28" y2="12" stroke="#e84b3c" stroke-width="3" stroke-linecap="round"/>' +
  "</svg>";

function ingredientIconHTML(type) {
  return type === "cups" ? EMPTY_CUP_SVG : "<span>" + SUPPLIES[type].icon + "</span>";
}

// ==========================================
// RECIPES (round 1: two options)
// ==========================================

const RECIPES = [
  {
    id: "classic",
    name: "Classic Lemonade",
    icon: LEMONADE_CUP_SVG,
    needs: { cups: 1, lemons: 1, ice: 1 },
    price: 1.00
  },
  {
    id: "sugar",
    name: "Lemonade with Sugar",
    icon: LEMONADE_CUP_SVG + '<span class="sugar-badge">🍬</span>',
    needs: { cups: 1, lemons: 1, ice: 1, sugar: 1 },
    price: 1.50
  }
];

const SUPPLY_TYPES = Object.keys(SUPPLIES);

const CUSTOMER_EMOJIS = ["🧒", "👧", "🧑", "👩", "👨", "👵", "👴"];
const SPARKLE_EMOJIS = ["✨", "⭐", "💫"];

// Three parked positions in the customer lane (px from the right edge).
// Larger values sit further left in the lane (closer to the stand),
// so index 0 = front of line gets the largest offset.
const CUSTOMER_SLOTS = ["290px", "150px", "10px"];
const MAX_CUSTOMERS = 3;

// ==========================================
// LEVELS / GOALS
// ==========================================

const levels = [
  { name: "Make your first $3 profit!", target: 3, type: "profit" },
  { name: "Serve 10 lemonades!", target: 10, type: "orders" },
  { name: "Have $15 in your wallet!", target: 15, type: "cash" },
  { name: "Grow your bank to $10!", target: 10, type: "savings" },
  { name: "Reach $30 total wealth!", target: 30, type: "wealth" }
];

// ==========================================
// GAME STATE
// ==========================================

let cash = 10.00;
let savings = 0;
let inventory = { cups: 0, lemons: 0, sugar: 0, ice: 0 };
let build = { cups: 0, lemons: 0, sugar: 0, ice: 0 };

let totalEarned = 0;
let totalSpent = 0;
let ordersServed = 0;

let currentLevel = 1;
let interestTimer = 20;
let interestInterval;
let spawnTimeout;
let customerTickInterval;

let isPaused = true;

let customers = [];
let nextCustomerId = 1;

// ==========================================
// PAUSE / RESUME
// Any popup (recipe guide, level up, restart
// confirm, tutorial) pauses customer spawning
// and customer patience while it's open.
// ==========================================

function pauseGame() {
  isPaused = true;
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

function resumeGame() {
  isPaused = false;
  document.getElementById("modalBackdrop").classList.add("hidden");
}

// ==========================================
// START GAME
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  populateRecipeGuide();
  updateDisplay();

  // These loops run continuously but no-op while isPaused is true,
  // so it's safe to start them before the tutorial is dismissed.
  spawnLoop();
  startInterestTimer();
  startCustomerTicker();

  showTutorial();
});

function showTutorial() {
  pauseGame();
  document.getElementById("tutorialBox").classList.remove("hidden");
}

function startGame() {
  document.getElementById("tutorialBox").classList.add("hidden");
  resumeGame();
}

// ==========================================
// BUY SUPPLIES
// ==========================================

function buySupplies(type) {
  const supply = SUPPLIES[type];

  if (cash < supply.price) {
    showMessage("Not enough cash for more " + supply.name.toLowerCase() + "! 💵");
    return;
  }

  cash -= supply.price;
  totalSpent += supply.price;
  inventory[type] += supply.buyAmount;

  showMessage("Bought " + supply.buyAmount + " " + supply.name.toLowerCase() + "! " + supply.icon);

  updateDisplay();
  checkLevelProgress();
}

// ==========================================
// BUILD THE ORDER (tap ingredients on the counter)
// ==========================================

function addToBuild(type) {
  if (inventory[type] <= 0) {
    showMessage("You're out of " + SUPPLIES[type].name.toLowerCase() + "! Buy more first.");
    return;
  }

  inventory[type] -= 1;
  build[type] += 1;

  updateDisplay();
}

function clearBuild() {
  for (const type of SUPPLY_TYPES) {
    inventory[type] += build[type];
    build[type] = 0;
  }

  updateDisplay();
}

function buildMatchesRecipe(recipe) {
  for (const type of SUPPLY_TYPES) {
    const needed = recipe.needs[type] || 0;
    if (build[type] !== needed) {
      return false;
    }
  }
  return true;
}

function updateBuildDisplay() {
  const container = document.getElementById("buildDisplay");
  const hasAnything = SUPPLY_TYPES.some(function (type) { return build[type] > 0; });

  if (!hasAnything) {
    container.innerHTML = '<span class="build-placeholder" id="buildPlaceholder">Tap ingredients below to build an order ⬇️</span>';
    return;
  }

  let html = "";
  SUPPLY_TYPES.forEach(function (type) {
    for (let i = 0; i < build[type]; i++) {
      html += type === "cups"
        ? '<span class="build-icon build-icon-svg">' + EMPTY_CUP_SVG + "</span>"
        : '<span class="build-icon">' + SUPPLIES[type].icon + "</span>";
    }
  });

  container.innerHTML = html;
}

// ==========================================
// CUSTOMER QUEUE (FIFO, diner-dash style)
// Position in the array = position in line.
// New customers always join at the back.
// When anyone leaves (served OR times out),
// everyone behind them shifts forward.
// ==========================================

const PATIENCE_MS = 15000;
const WARNING_MS = 5000;
const TICK_MS = 200;

function spawnLoop() {
  clearTimeout(spawnTimeout);

  if (!isPaused && customers.length < MAX_CUSTOMERS) {
    spawnCustomer();
  }

  const nextDelay = 700 + Math.random() * 1000;
  spawnTimeout = setTimeout(spawnLoop, nextDelay);
}

function spawnCustomer() {
  const id = nextCustomerId++;
  const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
  const face = CUSTOMER_EMOJIS[Math.floor(Math.random() * CUSTOMER_EMOJIS.length)];

  const el = document.createElement("div");
  el.className = "customer";
  el.onclick = function () {
    serveCustomer(id);
  };

  el.innerHTML =
    '<div class="order-bubble"><span>' + recipe.icon + "</span></div>" +
    '<div class="customer-face">' + face + "</div>";

  document.getElementById("customerLane").appendChild(el);

  const customer = {
    id: id,
    element: el,
    recipe: recipe,
    remainingMs: PATIENCE_MS,
    warned: false
  };
  customers.push(customer);

  // Position at the back of the line (its current index)
  positionCustomer(customer, customers.length - 1);

  // Trigger the slide-in on the next frame so the transition actually plays
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      el.classList.add("parked");
    });
  });

  updateCustomerReadiness(customer);
}

// Single ticking clock drives every customer's patience countdown.
// It simply does nothing while the game is paused, which is what
// makes pausing/resuming trivial (no timers to reschedule).
function startCustomerTicker() {
  clearInterval(customerTickInterval);

  customerTickInterval = setInterval(function () {
    if (isPaused) {
      return;
    }

    // Snapshot the array since customerGaveUp() may remove entries mid-loop
    customers.slice().forEach(function (customer) {
      customer.remainingMs -= TICK_MS;

      if (!customer.warned && customer.remainingMs <= WARNING_MS) {
        customer.warned = true;
        customer.element.classList.add("impatient");
      }

      if (customer.remainingMs <= 0) {
        customerGaveUp(customer.id);
      }
    });
  }, TICK_MS);
}

function positionCustomer(customer, index) {
  customer.element.style.setProperty("--park-right", CUSTOMER_SLOTS[index]);
}

function repositionQueue() {
  customers.forEach(function (customer, index) {
    positionCustomer(customer, index);
  });
}

function customerGaveUp(id) {
  const customer = customers.find(function (c) { return c.id === id; });

  if (!customer) {
    return;
  }

  showMessage("A customer left without ordering. 😞");
  removeFromQueue(customer);
}

// ==========================================
// SERVE ORDER (tap a customer)
// ==========================================

function serveCustomer(id) {
  const customer = customers.find(function (c) { return c.id === id; });

  if (!customer) {
    return;
  }

  if (!buildMatchesRecipe(customer.recipe)) {
    showMessage("That's not quite what they ordered! Check the build. 🤔");
    customer.element.classList.add("shake");
    setTimeout(function () {
      customer.element.classList.remove("shake");
    }, 300);
    return;
  }

  for (const type of SUPPLY_TYPES) {
    build[type] = 0;
  }

  cash += customer.recipe.price;
  totalEarned += customer.recipe.price;
  ordersServed += 1;

  showMessage(customer.recipe.name + " served! +$" + customer.recipe.price.toFixed(2) + " 💰");

  createSparkleBurst(customer.element);

  // Give the sparkle a beat to actually be seen before the customer slides out
  setTimeout(function () {
    removeFromQueue(customer);
  }, 350);

  updateDisplay();
  checkLevelProgress();
}

function removeFromQueue(customer) {
  customer.element.classList.add("leaving");
  customer.element.classList.remove("parked");

  setTimeout(function () {
    customer.element.remove();
  }, 500);

  customers = customers.filter(function (c) { return c.id !== customer.id; });

  // Close the gap: everyone behind moves up one spot
  repositionQueue();
}

function updateCustomerReadiness(customer) {
  const bubble = customer.element.querySelector(".order-bubble");
  bubble.classList.remove("ready", "missing");
  bubble.classList.add(buildMatchesRecipe(customer.recipe) ? "ready" : "missing");
}

function updateAllCustomerReadiness() {
  customers.forEach(updateCustomerReadiness);
}

// ==========================================
// SPARKLE BURST (light, brief pop on serve)
// ==========================================

function createSparkleBurst(customerEl) {
  for (let i = 0; i < 4; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.textContent = SPARKLE_EMOJIS[Math.floor(Math.random() * SPARKLE_EMOJIS.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 18 + Math.random() * 24;
    const sx = Math.cos(angle) * distance;
    const sy = Math.sin(angle) * distance;

    sparkle.style.setProperty("--sx", sx + "px");
    sparkle.style.setProperty("--sy", sy + "px");

    customerEl.appendChild(sparkle);

    setTimeout(function () {
      sparkle.remove();
    }, 450);
  }
}

// ==========================================
// RECIPE GUIDE
// ==========================================

function populateRecipeGuide() {
  const container = document.getElementById("recipeList");
  let html = "";

  RECIPES.forEach(function (recipe) {
    html += '<div class="recipe-entry">';
    html += '<div class="recipe-result">' + recipe.icon + "</div>";
    html += '<div class="recipe-info">';
    html += "<strong>" + recipe.name + "</strong>";
    html += '<div class="recipe-ingredients">';

    SUPPLY_TYPES.forEach(function (type) {
      const amount = recipe.needs[type];
      if (amount) {
        html +=
          '<span class="recipe-ingredient">' +
          ingredientIconHTML(type) +
          "<em>x" + amount + "</em></span>";
      }
    });

    html += "</div></div></div>";
  });

  container.innerHTML = html;
}

function openRecipeGuide() {
  pauseGame();
  document.getElementById("recipeBox").classList.remove("hidden");
}

function closeRecipeGuide() {
  document.getElementById("recipeBox").classList.add("hidden");
  resumeGame();
}

// ==========================================
// SAVE MONEY
// ==========================================

function saveMoney(amount) {
  if (cash < amount) {
    showMessage("You don't have enough cash to save that much! 🐷");
    return;
  }

  cash -= amount;
  savings += amount;

  showMessage("You put $" + amount.toFixed(2) + " in your bank! 🐷");

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
    interestTimer -= 1;
    updateInterestMessage();

    if (interestTimer <= 0) {
      growSavings();
      interestTimer = 20;
    }
  }, 1000);
}

function growSavings() {
  if (savings <= 0) {
    updateInterestMessage();
    return;
  }

  const growth = savings * 0.05;
  savings += growth;

  showMessage("✨ Your bank grew by $" + growth.toFixed(2) + "!");

  updateDisplay();
  checkLevelProgress();
}

function updateInterestMessage() {
  const message = document.getElementById("interestMessage");

  if (savings > 0) {
    message.textContent = "Next growth: " + interestTimer + "s";
  } else {
    message.textContent = "Add money to start growing!";
  }
}

// ==========================================
// LEVEL PROGRESS
// ==========================================

function getProgressValue(level) {
  const totalProfit = totalEarned - totalSpent;

  if (level.type === "profit") return totalProfit;
  if (level.type === "orders") return ordersServed;
  if (level.type === "cash") return cash;
  if (level.type === "savings") return savings;
  if (level.type === "wealth") return cash + savings;

  return 0;
}

function checkLevelProgress() {
  const level = levels[currentLevel - 1];

  if (!level) return;

  if (getProgressValue(level) >= level.target) {
    levelUp();
  }
}

function levelUp() {
  if (currentLevel >= levels.length) return;

  const completedLevel = levels[currentLevel - 1];
  currentLevel += 1;
  const newLevel = levels[currentLevel - 1];

  document.getElementById("levelUpMessage").textContent =
    "You did it: " + completedLevel.name + " Your new goal is: " + newLevel.name;

  pauseGame();
  document.getElementById("levelUpBox").classList.remove("hidden");

  updateDisplay();
}

function closeLevelUp() {
  document.getElementById("levelUpBox").classList.add("hidden");
  resumeGame();
  updateDisplay();
}

// ==========================================
// UPDATE DISPLAY
// ==========================================

function updateDisplay() {
  document.getElementById("cash").textContent = "$" + cash.toFixed(2);
  document.getElementById("savings").textContent = "$" + savings.toFixed(2);

  for (const type of SUPPLY_TYPES) {
    document.getElementById("count-" + type).textContent = inventory[type];
  }

  updateGoalDisplay();
  updateBuildDisplay();
  updateAllCustomerReadiness();
  updateInterestMessage();
}

function updateGoalDisplay() {
  const level = levels[currentLevel - 1];

  if (!level) {
    document.getElementById("goalText").textContent = "All goals complete! 👑";
    document.getElementById("goalProgress").style.width = "100%";
    return;
  }

  document.getElementById("goalText").textContent = level.name;

  const progress = getProgressValue(level);
  const percentage = Math.min(Math.max((progress / level.target) * 100, 0), 100);

  document.getElementById("goalProgress").style.width = percentage + "%";
}

// ==========================================
// MESSAGE STRIP
// ==========================================

function showMessage(message) {
  document.getElementById("messageBox").textContent = message;
}

// ==========================================
// RESTART (in-page confirm, no native dialog)
// ==========================================

function restartGame() {
  pauseGame();
  document.getElementById("confirmBox").classList.remove("hidden");
}

function closeConfirm() {
  document.getElementById("confirmBox").classList.add("hidden");
  resumeGame();
}

function confirmRestart() {
  cash = 10.00;
  savings = 0;
  inventory = { cups: 0, lemons: 0, sugar: 0, ice: 0 };
  build = { cups: 0, lemons: 0, sugar: 0, ice: 0 };

  totalEarned = 0;
  totalSpent = 0;
  ordersServed = 0;

  currentLevel = 1;
  interestTimer = 20;

  document.getElementById("confirmBox").classList.add("hidden");
  document.getElementById("levelUpBox").classList.add("hidden");
  document.getElementById("recipeBox").classList.add("hidden");

  document.getElementById("customerLane").innerHTML = "";
  customers = [];

  showMessage("Welcome back! Let's build your lemonade empire! 🍋");

  resumeGame();
  updateDisplay();
}