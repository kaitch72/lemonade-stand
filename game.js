// ==========================================
// 🍋 LEMONADE STAND — ROUND 1
// ==========================================

// ==========================================
// SUPPLY CONFIG (round 1: four supplies)
// ==========================================

const SUPPLIES = {
  cups: { icon: "🥤", name: "Cups", buyAmount: 10, price: 2.00 },
  lemons: { icon: "🍋", name: "Lemons", buyAmount: 10, price: 2.00 },
  ice: { icon: "🧊", name: "Ice", buyAmount: 10, price: 1.00 },
  sugar: { icon: "🍬", name: "Sugar", buyAmount: 10, price: 1.00 },
  tea: { icon: "🫖", name: "Tea Bags", buyAmount: 10, price: 2.00 }
};

// ==========================================
// ICONS
// A plain outlined cup represents the raw supply.
// A filled cup represents a finished lemonade,
// used in customer orders and the recipe guide.
// ==========================================

const EMPTY_CUP_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 119.91 159.74">\n  <g>\n    <path d="M107.33,159.71l-94.91.03L1.06,12.61,0,0l119.91.02-12.58,159.69ZM97.98,149.73L108.9,10H10.85s10.92,139.76,10.92,139.76l76.21-.03Z"/>\n  </g>\n</svg>';

const LEMONADE_CUP_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.46 199.46">\n  <g>\n    <g>\n      <path d="M34.89,82.52c-14.92-4.49-24.62-17.8-24.92-32.61-.31-15.29,9.31-28.86,23.23-33.71,15.04-5.25,31.4.06,40.4,12.91l11.5.02c-5.93-11.33-15.89-19.7-28.14-23.17C32.6-.96,7.69,13.8,1.46,37.76c-6.3,24.24,8.32,49.24,33.34,54.97l.09-10.21Z"/>\n      <path d="M132.19,39.73l7.81-29.72h21.31l-.02-10.01h-28.69s-10.66,39.73-10.66,39.73H42.55s1.06,12.6,1.06,12.6l11.36,147.13,94.91-.03,12.58-159.69h-30.27ZM53.4,49.72h98.05l-4.78,61.19c-7.13-1.21-13.71-1.56-20.5-.81-8.48,1.07-16.04,3.67-22.87,8.33l-5.09,3.11c-6.7,4.11-13.74,7.26-22.16,7.74-5.53.12-10.96-.27-16.53-1.21l-6.12-78.35ZM140.53,189.45l-76.21.02-3.98-50.91c6.68.79,13.07,1.19,19.57.62,8.72-.87,16.44-3.55,23.46-7.86l8.54-5.19c5.09-3.39,10.95-5.18,17.38-5.89,5.64-.3,11.19,0,16.59.81l-5.35,68.4Z"/>\n    </g>\n  </g>\n</svg>';

const TEA_CUP_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 119.91 199.46">\n  <g>\n    <g>\n      <path d="M49.42,47.24l.08,12.92,14.96,12.54-.06,34.55H24.47s.03-34.77.03-34.77l14.97-12.41v-12.82s9.94,0,9.94,0ZM54.45,97.22l.02-19.91-10.06-8.53-9.95,8.38-.02,20.09,20.01-.02Z"/>\n      <path d="M89.64,39.73l7.81-29.72h21.31l-.02-10.01h-28.69s-10.66,39.73-10.66,39.73H0s1.06,12.6,1.06,12.6l11.36,147.13,94.91-.03,12.58-159.69h-30.27ZM10.85,49.72h98.05l-4.78,61.19c-7.13-1.21-13.71-1.56-20.5-.81-8.48,1.07-16.04,3.67-22.87,8.33l-5.09,3.11c-6.7,4.11-13.74,7.26-22.16,7.74-5.53.12-10.96-.27-16.53-1.21l-6.12-78.35ZM97.98,189.45l-76.21.02-3.98-50.91c6.68.79,13.07,1.19,19.57.62,8.72-.87,16.44-3.55,23.46-7.86l8.54-5.19c5.09-3.39,10.95-5.18,17.38-5.89,5.64-.3,11.19,0,16.59.81l-5.35,68.4Z"/>\n    </g>\n  </g>\n</svg>';

const LEMON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139.85 139.74">\n  <g>\n    <g>\n      <path d="M14.96,139.74L0,124.79l7.51-22.52C-.76,84.58.55,65.84,8.57,48.23,16.85,30.87,30.63,17.02,47.97,8.69c7.83-3.64,15.65-5.87,24.26-6.62,10.47-.81,20.51.95,30.08,5.44L124.86,0l15,14.97-7.51,22.45c5.8,12.2,7.01,25.7,4.06,39.08-3.1,13.43-9.68,25.36-18.96,35.51-10.8,11.74-24.34,20.22-39.86,24.03-13.59,3.17-27.3,2.21-39.97-3.84l-22.64,7.53ZM17.72,128.18l20.55-6.83c24.16,13.51,52.65,4.03,71.03-15.45,17.26-18.31,24.82-44.69,12.25-67.62l6.79-20.57-6.26-6.18-20.4,6.78c-12.39-6.85-26.7-8.12-40.52-3.83-21.68,6.74-39.02,23.84-46.28,45.32-4.61,13.65-3.78,29.05,3.5,41.55l-6.9,20.57,6.24,6.25Z"/>\n      <path d="M32.16,76.98l-9.41-4.37,4.68-9.13c8.36-16.32,21.77-28.96,38.12-37.17l7.13-3.58,4.34,9.43c-20.78,7.94-36.88,23.85-44.86,44.83Z"/>\n    </g>\n  </g>\n</svg>';

const ICE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182.38 123.55">\n  <defs>\n    <style>\n      .cls-1 {\n        stroke: #000;\n        stroke-miterlimit: 10;\n        stroke-width: 3px;\n      }\n    </style>\n  </defs>\n  <g>\n    <g>\n      <path class="cls-1" d="M89.56,22.68L53.36,1.73,1.5,31.87v60.03s51.93,29.91,51.93,29.91l18.18-10.45,6.94-4,2.26-1.3,6.14-3.53-2.23-6.78-6.14,3.54h-.03s-6.94,4.02-6.94,4.02l-14.7,8.48-.03-48.11,8.39-4.8,12.32-7.04-3.91-.83,8.88-10.01-19.06,11.03-10.08,5.84L11.95,33.82,53.38,9.71l31.51,18.22,6.12,3.54.66-.74,4.01-4.52-6.12-3.54ZM49.97,63.74l-.03,48.15-41.49-24.08.02-47.95,41.5,23.88Z"/>\n      <g>\n        <path d="M161.89,19.93l-58.93-12.33-13.39,15.08-.4.46-4.27,4.8-1.05,1.19-20.36,22.93-.35.4,2.13,6.45,7.21,21.86,2.52,7.63,3.59,10.91,2.23,6.76,1.12,3.39,58.67,12.17,40.09-44.75-18.79-56.95ZM82.53,41.02l3.81-4.3,4.66-5.25.66-.74,4.01-4.52,9.8-11.04,47.08,9.85-31.99,35.91-15.07-3.18-6.93-1.46-6.19-1.31-14.8-3.12-3.91-.83,8.88-10.01ZM87.23,103.4l-.29-.87-2.23-6.78-4.39-13.34-2.52-7.64-5.57-16.92,17.47,3.61,7.93,1.64.93.19,6.93,1.43,13.64,2.81,15.03,45.73-46.94-9.88ZM125.68,65.35l32.12-35.68,15.02,45.5-32.06,35.87-15.09-45.68Z"/>\n        <path d="M141.13,123.27l-60.36-12.52-19.33-58.64.91-1.04L102.41,5.95l60.63,12.69,19.34,58.6-41.25,46.04ZM83.08,108.17l56.97,11.82,38.94-43.46-18.25-55.31-57.24-11.97-38.68,43.55,18.25,55.37ZM136.41,115.28l-50.33-10.59-16.07-48.83,50.29,10.4,16.12,49.02ZM88.38,102.11l43.55,9.16-13.95-42.43-43.51-9,13.91,42.26ZM140.15,113.97l-16.18-48.98,34.44-38.25,16.1,48.77-34.36,38.45ZM127.37,65.71l14,42.39,29.75-33.29-13.94-42.22-29.81,33.12ZM121.1,62.58l-50.28-10.61L104.93,13.52l50.46,10.56-34.29,38.5ZM76.49,50.1l43.53,9.18,29.69-33.33-43.69-9.14-29.53,33.28Z"/>\n      </g>\n    </g>\n  </g>\n</svg>';

const SUGAR_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 159.92 133.08">\n  <g>\n    <g>\n      <path d="M119.94,133.08H40.04s-.05-12.21-.05-12.21C17.22,109.46,2.66,87.01,1.12,61.6l-1.12-18.52h159.92c-.52,8.79-.74,17.32-2.03,26.08-3.32,22.48-17.73,41.47-37.89,51.64l-.07,12.27ZM110,123.08l.04-8.39,10.66-5.71c16.26-9.98,26.64-27.27,27.9-46.33l.63-9.57H10.63s.98,12.73.98,12.73c2.37,18.49,13.04,34.9,29.2,44.13l9.15,4.64.02,8.5h60.02Z"/>\n      <g>\n        <ellipse cx="79.91" cy="20.17" rx="4.94" ry="4.93"/>\n        <path d="M96.95,11.28c-20.41-4.13-57.55,1.62-66.98,21.04l.03,12.79h-9.96s-.03-15.08-.03-15.08C31.58,2.46,79.31-5.5,105.93,3.58c12.96,4.42,28.59,14.11,33.98,26.46v15.06s-9.96,0-9.96,0v-12.79c-5.41-10.83-21.04-18.62-33-21.04Z"/>\n        <ellipse cx="59.93" cy="30.15" rx="4.94" ry="4.93"/>\n        <ellipse cx="99.89" cy="30.15" rx="4.94" ry="4.93"/>\n      </g>\n    </g>\n  </g>\n</svg>';

// Kayla's real Font-Awesome-style export, dropped into images/teabag.svg --
// replaces the earlier hand-built placeholder. Split from tea-glass.svg
// (2026-08-28): the glass is now the finished-drink icon only, this is the
// raw Tea Bags supply icon (shop tile, inventory slot, order-build tray,
// recipe-ingredient rows).
const TEA_BAG_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136.25 177.22">\n  <g>\n    <path d="M88.26,36.42l31.75,14.16,16.24-36.47L104.71,0l-17.47,8.54c-14.38-6.37-29.09-4.56-37.52,4.64-6.7,7.31-7.64,17.62-2.45,26.92,7.76,13.9.1,24.86-3.12,28.54h-26.59L0,102.84v74.38h96.81v-74.41l-17.56-34.17h-22.94c4.51-8.26,7.01-20.3-.31-33.41-3.1-5.57-2.71-11.15,1.09-15.3,4.15-4.52,13.41-7.81,25.95-2.31l-.03.07,5.25,18.73ZM104.86,11l18.19,8.12-8.12,18.29-18.34-8.19-3.61-12.49,11.88-5.73ZM73.14,78.64l13.67,26.59v61.99H10v-61.96l13.67-26.62h49.47Z"/>\n  </g>\n</svg>';

// Brand-icon lookup for the persistent UI (shop tiles, inventory slots,
// the order-build tray, and the recipe guide). SUPPLIES[type].icon stays
// emoji-only -- that field is used purely in the transient message-strip
// toasts ("Bought 10 lemons!"), which keep their emoji per Kayla's call.
const SUPPLY_ICON_SVGS = {
  cups: EMPTY_CUP_SVG,
  lemons: LEMON_SVG,
  ice: ICE_SVG,
  sugar: SUGAR_SVG,
  // Split from the iced-tea glass (2026-08-28) -- the glass is now reserved
  // for the finished-drink/order icon only (see RECIPES' icedTea/sweetTea
  // .icon below, still TEA_CUP_SVG), so the raw supply reads as an actual
  // tea bag in the shop tile, inventory slot, and recipe-ingredient row.
  tea: TEA_BAG_SVG
};

function ingredientIconHTML(type) {
  return "<span>" + SUPPLY_ICON_SVGS[type] + "</span>";
}

// Reused from the shared brand icon set (Coin Catch / Driver Decides) --
// trophy is the default Level Up accent, crown replaces it only when every
// level is complete ("Lemonade Star").
const TROPHY_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 159.86 159.76">\n  <g>\n    <g>\n      <path d="M119.85,159.76H40.03s-.03-9.99-.03-9.99h34.97s-.02-30.9-.02-30.9c-4.8-1.37-8.61-3.59-12.32-6.47-5.47-4.56-9.88-9.77-13.52-15.96-11.04-3.14-20.94-8.3-29.19-16.24C3.84,64.03-.64,42.43.07,19.96l30.45.02L29.99,0h99.86s-.27,19.97-.27,19.97h30.29c.01,7.7-.33,14.98-1.57,22.53-2.37,12.85-7.52,24.59-16.24,34.3-8.55,8.87-18.97,14.87-30.7,18.69-4.39,7.7-10.02,14.26-17.3,19.17-2.93,1.76-5.66,3.13-9.12,4.16l-.02,30.95h34.97s-.03,9.98-.03,9.98ZM109.01,77.22c7.76-21.71,9.98-44.26,10.86-67.23H39.93c.91,24.69,3.45,50,13.07,72.56,3.57,7.43,7.27,14.48,13.55,19.98,3.59,3.15,8.58,7.2,13.54,6.95,14.28-2.31,23.97-19.19,28.94-32.26ZM35.89,61.91c-2.33-10.81-3.82-21.09-4.68-31.96H9.99c.44,8.89,1.98,17.7,5.62,26.11,5.25,12.44,14.86,22,27.13,27.65-2.83-7.06-4.93-14.04-6.84-21.8ZM149.87,29.96h-21.3c-.88,10.65-2.34,20.78-4.52,31.17-1.75,7.34-3.81,14.11-6.35,21.24,21.75-10.9,30.58-28.63,32.17-52.4Z"/>\n      <path d="M79.87,69.31l-19.87,10.16,3.98-21.78-16.06-15.53,22.05-3.51,9.92-19.76,9.9,19.77,22.09,3.48-15.75,15.6,3.63,21.83-19.89-10.27ZM79.81,58.11l6.52,3.27-1.14-7.44,5.42-4.91-7.26-1.28-3.52-6.33-3.22,6.35-7.47,1.25,5.42,4.95-1.18,7.45,6.42-3.31Z"/>\n    </g>\n  </g>\n</svg>';
const CROWN_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.76 134.7">\n  <g>\n    <path d="M146.59,134.68H28.19S14.02,54.83,14.02,54.83c-4.83-.4-9.05-2.86-11.35-6.37-3-4.59-3.48-9.75-1.37-14.46,3.37-7.52,11.85-10.96,19.15-8s11.25,11.25,8.55,19.18l26.89,13.11,21.51-32.12c-4.08-4.1-6.06-9.51-4.32-15.37,1.38-4.66,5.3-8.94,10.72-10.34,6.68-1.73,13.43,1.49,16.58,7.13,3.4,6.09,2.29,13.3-3,18.55l21.85,32.15,26.56-13.12c-2.3-6.5-.05-13.44,5.44-17.41s12.62-3.77,17.86.41,7.28,11.61,4.27,17.89c-2.23,5.24-6.94,8.37-12.62,8.76l-14.15,79.85ZM92.33,14.94c0-2.74-2.22-4.96-4.96-4.96s-4.96,2.22-4.96,4.96,2.22,4.96,4.96,4.96,4.96-2.22,4.96-4.96ZM138.29,124.71l12.48-70.84-26.53,13.02-8.45,4.43-27.07-40.4c-.34-.5-.89-1.08-1.28-1.11s-1.12.6-1.4,1.02l-26.87,40.33-19.89-9.82-15.26-7.4,12.76,70.77h101.52ZM19.9,39.89c0-2.74-2.22-4.96-4.96-4.96s-4.96,2.22-4.96,4.96,2.22,4.96,4.96,4.96,4.96-2.22,4.96-4.96ZM164.77,39.89c0-2.74-2.22-4.96-4.96-4.96s-4.96,2.22-4.96,4.96,2.22,4.96,4.96,4.96,4.96-2.22,4.96-4.96Z"/>\n  </g>\n</svg>';

// ==========================================
// RECIPES (round 1: two options)
// ==========================================

const RECIPES = [
  {
    id: "classic",
    name: "Classic Lemonade",
    icon: LEMONADE_CUP_SVG,
    needs: { cups: 1, lemons: 1, ice: 1 },
    price: 1.00,
    unlockLevel: 1
  },
  {
    id: "sugar",
    name: "Sweetened Lemonade",
    icon: LEMONADE_CUP_SVG + '<span class="sugar-badge">' + SUGAR_SVG + '</span>',
    needs: { cups: 1, lemons: 1, ice: 1, sugar: 1 },
    price: 1.50,
    unlockLevel: 1
  },
  {
    id: "icedTea",
    name: "Iced Tea",
    icon: TEA_CUP_SVG,
    needs: { cups: 1, tea: 1, ice: 1 },
    price: 2.00,
    unlockLevel: 2
  },
  {
    id: "sweetTea",
    name: "Sweetened Tea",
    icon: TEA_CUP_SVG + '<span class="sugar-badge">' + SUGAR_SVG + '</span>',
    needs: { cups: 1, tea: 1, ice: 1, sugar: 1 },
    price: 2.50,
    unlockLevel: 2
  }
];

function recipesUnlockedByLevel(level) {
  return RECIPES.filter(function (r) { return r.unlockLevel <= level; });
}

const SUPPLY_TYPES = Object.keys(SUPPLIES);

const CUSTOMER_EMOJIS = ["🧒", "👧", "🧑", "👩", "👨", "👵", "👴"];

// Brand sparkle icon (matches the deck's "special" glyph exactly), reused
// from Coin Catch / Driver Decides. Coin Catch's burst gets its variety by
// cycling the SAME icon through three brand tones rather than swapping
// shapes -- same trick here instead of the old emoji cycle.
const SPARKLE_SVG =
  '<svg viewBox="0 0 179.8 170" xmlns="http://www.w3.org/2000/svg">' +
  '<polygon points="159.82 49.96 149.85 50 149.86 30 129.88 30 129.88 19.99 149.86 20 149.85 0 159.82 0 159.82 20 179.79 19.99 179.8 30 159.82 29.99 159.82 49.96"/>' +
  '<polygon points="149.83 169.96 139.86 170 139.87 150 119.89 150 119.89 139.99 139.87 140 139.86 120 149.83 120 149.82 140 169.8 139.99 169.8 150 149.83 149.99 149.83 169.96"/>' +
  '<path d="M64.87,149.82l-20.03-44.88L0,84.99l44.96-20.07,19.91-44.96,20.01,45.1,44.86,19.96-44.93,20-19.93,44.81ZM64.88,125.25l12.55-27.81,27.77-12.46-27.88-12.52-12.45-27.71-12.55,27.76-27.72,12.49,27.75,12.48,12.53,27.76Z"/>' +
  "</svg>";

const SPARKLE_TONES = ["tone-a", "tone-b", "tone-c"];

// Three parked positions in the customer lane (px from the right edge).
// Larger values sit further left in the lane (closer to the stand),
// so index 0 = front of line gets the largest offset. Spacing matches
// the enlarged .customer width (139px) plus a ~29px gap between slots.
const CUSTOMER_SLOTS = ["348px", "180px", "12px"];
const MAX_CUSTOMERS = 3;

// ==========================================
// GAME LEVELS
// Each level has a set of goals. Completing
// all goals in a level advances to the next
// level, which can unlock new recipes.
// ==========================================

const GAME_LEVELS = [
  {
    goals: [
      { name: "Make your first $3 profit!", target: 3, type: "profit" },
      { name: "Serve 10 lemonades!", target: 10, type: "orders" },
      { name: "Have $15 in your wallet!", target: 15, type: "cash" }
    ]
  },
  {
    unlockMessage: "Customers are asking for Iced Tea now! Tea bags just got added to your shop.",
    newRecipeIds: ["icedTea", "sweetTea"],
    goals: [
      { name: "Grow your bank to $10!", target: 10, type: "savings" },
      { name: "Serve 5 teas!", target: 5, type: "teaOrders" },
      { name: "Reach $30 total wealth!", target: 30, type: "wealth" }
    ]
  }
];

// ==========================================
// GAME STATE
// ==========================================

let cash = 10.00;
let savings = 0;
let inventory = { cups: 0, lemons: 0, ice: 0, sugar: 0, tea: 0 };
let build = { cups: 0, lemons: 0, ice: 0, sugar: 0, tea: 0 };
// Order the ingredients were tapped in, most-recent-last -- lets the Undo
// button pop off just the last one instead of clearing the whole order.
let buildOrder = [];

let totalEarned = 0;
let totalSpent = 0;
let ordersServed = 0;
let teaOrdersServed = 0;

let currentGameLevel = 1;
let goalsCompletedThisLevel = 0;
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
  buildOrder.push(type);

  updateDisplay();
}

function undoLastIngredient() {
  if (buildOrder.length === 0) {
    return;
  }

  const type = buildOrder.pop();
  build[type] -= 1;
  inventory[type] += 1;

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
    container.innerHTML = '<span class="build-placeholder" id="buildPlaceholder">Tap ingredients below to build an order</span>';
    return;
  }

  let html = "";
  SUPPLY_TYPES.forEach(function (type) {
    for (let i = 0; i < build[type]; i++) {
      html += '<span class="build-icon build-icon-svg">' + SUPPLY_ICON_SVGS[type] + "</span>";
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
  const availableRecipes = recipesUnlockedByLevel(currentGameLevel);
  const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
  const face = CUSTOMER_EMOJIS[Math.floor(Math.random() * CUSTOMER_EMOJIS.length)];

  const el = document.createElement("div");
  el.className = "customer";
  el.onclick = function () {
    serveCustomer(id);
  };

  // data-recipe-id keys the bubble's circle color to this order's recipe
  // (see the [data-recipe-id="..."] rules in style.css) -- the same
  // stable-id pattern already used for the Recipe Guide/Level Up rows.
  el.innerHTML =
    '<div class="order-bubble" data-recipe-id="' + recipe.id + '">' +
    '<span class="order-icon-circle">' + recipe.icon + "</span>" +
    "</div>" +
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
  buildOrder = [];

  cash += customer.recipe.price;
  totalEarned += customer.recipe.price;
  ordersServed += 1;

  if (customer.recipe.needs.tea) {
    teaOrdersServed += 1;
  }

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
  // Only "ready" is a real visual state now (green ring, current build
  // matches this order) -- there's no more "missing" styling, since the
  // bubble's default/no-match state is just its plain recipe-color circle
  // with no outline (see .order-bubble in style.css, 2026-08-28).
  const bubble = customer.element.querySelector(".order-bubble");
  bubble.classList.toggle("ready", buildMatchesRecipe(customer.recipe));
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
    sparkle.className = "sparkle " + SPARKLE_TONES[Math.floor(Math.random() * SPARKLE_TONES.length)];
    sparkle.innerHTML = SPARKLE_SVG;

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

function buildIngredientsHTML(recipe) {
  let html = '<div class="recipe-ingredients">';

  // Iterate the recipe's OWN declared ingredient order (its `needs` object,
  // in the order it's written in RECIPES above) rather than the fixed
  // SUPPLY_TYPES order -- so each row reads in its natural recipe order
  // (e.g. iced tea shows cup/tea/ice, not cup/ice/tea) instead of every
  // recipe sharing one global ingredient sequence.
  Object.keys(recipe.needs).forEach(function (type) {
    const amount = recipe.needs[type];
    if (amount) {
      // Every current recipe only ever needs 1 of an ingredient, so the
      // count is just noise -- only show "xN" if a future recipe needs
      // more than one of something.
      const countLabel = amount > 1 ? "<em>x" + amount + "</em>" : "";
      html +=
        '<span class="recipe-ingredient">' +
        ingredientIconHTML(type) +
        countLabel + "</span>";
    }
  });

  html += "</div>";
  return html;
}

function buildRecipeListHTML(recipeList) {
  let html = "";

  recipeList.forEach(function (recipe) {
    // Drink icon -- title -- ingredients, all on one line, with the
    // ingredients pushed to the row's far right via .recipe-ingredients'
    // margin-left:auto (see the shared #recipeBox/#levelUpBox scoped CSS
    // in style.css -- both modals' recipe lists use this exact layout).
    // data-recipe-id drives each row's pale background color (see
    // style.css) so a given recipe is always the same color everywhere,
    // regardless of which popup shows it or how many other rows are
    // present -- e.g. Iced Tea reads as peach in both the full Recipe
    // Guide AND the "new recipes unlocked" popup that only shows 2 rows,
    // rather than colors shifting with each list's own row position.
    html += '<div class="recipe-entry" data-recipe-id="' + recipe.id + '">';
    html += '<div class="recipe-result">' + recipe.icon + "</div>";
    html += '<div class="recipe-info"><strong>' + recipe.name + "</strong></div>";
    html += buildIngredientsHTML(recipe);
    html += "</div>";
  });

  return html;
}

function populateRecipeGuide() {
  const container = document.getElementById("recipeList");
  container.innerHTML = buildRecipeListHTML(recipesUnlockedByLevel(currentGameLevel));
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
    message.textContent = "";
  }
}

// ==========================================
// LEVEL PROGRESS
// ==========================================

function getProgressValue(goal) {
  const totalProfit = totalEarned - totalSpent;

  if (goal.type === "profit") return totalProfit;
  if (goal.type === "orders") return ordersServed;
  if (goal.type === "teaOrders") return teaOrdersServed;
  if (goal.type === "cash") return cash;
  if (goal.type === "savings") return savings;
  if (goal.type === "wealth") return cash + savings;

  return 0;
}

function getCurrentLevelDef() {
  return GAME_LEVELS[currentGameLevel - 1];
}

function getCurrentGoal() {
  const levelDef = getCurrentLevelDef();
  return levelDef ? levelDef.goals[goalsCompletedThisLevel] : null;
}

function checkLevelProgress() {
  const levelDef = getCurrentLevelDef();
  if (!levelDef) return;

  const goal = levelDef.goals[goalsCompletedThisLevel];
  if (!goal) return;

  if (getProgressValue(goal) < goal.target) return;

  goalsCompletedThisLevel += 1;

  if (goalsCompletedThisLevel >= levelDef.goals.length) {
    advanceGameLevel();
  } else {
    const nextGoal = levelDef.goals[goalsCompletedThisLevel];
    showMessage("Goal complete! 🎉 Next: " + nextGoal.name);
    updateDisplay();
  }
}

function advanceGameLevel() {
  currentGameLevel += 1;
  goalsCompletedThisLevel = 0;

  const newLevelDef = getCurrentLevelDef();

  document.getElementById("levelUpTitle").textContent = "🎉 LEVEL " + currentGameLevel + "!";

  const levelUpIcon = document.getElementById("levelUpIcon");

  const levelUpBox = document.getElementById("levelUpBox");

  if (newLevelDef) {
    levelUpIcon.innerHTML = TROPHY_SVG;
    levelUpBox.classList.remove("statement");
    document.getElementById("levelUpMessage").textContent =
      newLevelDef.unlockMessage || "New goals unlocked!";
    revealNewSupplies(newLevelDef);
    renderLevelUpRecipes(newLevelDef);
    populateRecipeGuide();
  } else {
    levelUpIcon.innerHTML = CROWN_SVG;
    // "statement" is the same dark Blue Black -> Persian Blue treatment used
    // for the big win screen in Coin Catch / Driver Decides -- reserved for
    // this one moment (every goal complete), not the in-between level-ups.
    levelUpBox.classList.add("statement");
    document.getElementById("levelUpMessage").textContent =
      "You've completed every goal! You're a Lemonade Star!";
    document.getElementById("levelUpRecipes").innerHTML = "";
  }

  pauseGame();
  levelUpBox.classList.remove("hidden");

  updateDisplay();
}

function revealNewSupplies(levelDef) {
  if (!levelDef.newRecipeIds) return;

  const newSupplyTypes = new Set();
  levelDef.newRecipeIds.forEach(function (recipeId) {
    const recipe = RECIPES.find(function (r) { return r.id === recipeId; });
    if (recipe) {
      Object.keys(recipe.needs).forEach(function (type) { newSupplyTypes.add(type); });
    }
  });

  newSupplyTypes.forEach(function (type) {
    const shopItem = document.querySelector('.shop-item[data-supply="' + type + '"]');
    const invSlot = document.querySelector('.inv-slot[data-supply="' + type + '"]');
    if (shopItem) shopItem.classList.remove("hidden");
    if (invSlot) invSlot.classList.remove("hidden");
  });
}

function renderLevelUpRecipes(levelDef) {
  const container = document.getElementById("levelUpRecipes");

  if (!levelDef.newRecipeIds) {
    container.innerHTML = "";
    return;
  }

  const newRecipes = RECIPES.filter(function (r) {
    return levelDef.newRecipeIds.indexOf(r.id) !== -1;
  });

  container.innerHTML = buildRecipeListHTML(newRecipes);
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
  const levelDef = getCurrentLevelDef();

  if (!levelDef) {
    document.getElementById("goalLevelLabel").textContent = "Complete!";
    document.getElementById("goalText").textContent = "All goals complete! 👑";
    document.getElementById("goalProgress").style.width = "100%";
    return;
  }

  document.getElementById("goalLevelLabel").textContent = "Level " + currentGameLevel;

  const goal = levelDef.goals[goalsCompletedThisLevel];
  document.getElementById("goalText").textContent = goal ? goal.name : "Level complete!";

  const percentage = (goalsCompletedThisLevel / levelDef.goals.length) * 100;
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
  inventory = { cups: 0, lemons: 0, ice: 0, sugar: 0, tea: 0 };
  build = { cups: 0, lemons: 0, ice: 0, sugar: 0, tea: 0 };
  buildOrder = [];

  totalEarned = 0;
  totalSpent = 0;
  ordersServed = 0;
  teaOrdersServed = 0;

  currentGameLevel = 1;
  goalsCompletedThisLevel = 0;
  interestTimer = 20;

  document.querySelectorAll(".shop-item, .inv-slot").forEach(function (el) {
    if (el.dataset.supply === "tea") {
      el.classList.add("hidden");
    }
  });
  populateRecipeGuide();

  document.getElementById("confirmBox").classList.add("hidden");
  document.getElementById("levelUpBox").classList.add("hidden");
  document.getElementById("levelUpBox").classList.remove("statement");
  document.getElementById("recipeBox").classList.add("hidden");

  document.getElementById("customerLane").innerHTML = "";
  customers = [];

  showMessage("Welcome back! Let's build your lemonade empire! 🍋");

  resumeGame();
  updateDisplay();
}