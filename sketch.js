let capture;
let aiChoice = "";
let playerChoice = ""; 
let gameState = "WAITING"; // WAITING, FIGHTING, RESULT
let scores = { ai: 0, player: 0 };
let choices = ["黑熊 (草)", "獵人 (水)", "獵槍 (火)"];
let battleTimer = 0;
let resultText = "";

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();
  textAlign(CENTER, CENTER);
}

function draw() {
  background('#e7c6ff');
  
  // 定義基礎布局
  let sectionW = width / 3;
  let camW = width * 0.4; // 稍微調整攝影機大小以符合佈局
  let camH = height * 0.5;

  // --- 左側：AI 出拳區域 ---
  drawAISide(0, 0, sectionW, height);

  // --- 右側：玩家攝影機區域 ---
  drawPlayerSide(width * 0.6, height * 0.25, camW, camH);

  // --- 中間：戰鬥與比分區域 ---
  drawBattleZone(sectionW, 0, width / 3, height);
  
  // 顯示當前比分
  drawScoreBoard();
}

function drawAISide(x, y, w, h) {
  fill(255, 255, 255, 100);
  rect(x + 20, y + 20, w - 40, h - 40, 20);
  fill(0);
  textSize(24);
  text("AI 出拳", x + w/2, y + 50);
  
  if (aiChoice !== "") {
    textSize(32);
    // 這裡可以根據 aiChoice 繪製對應的奇幻風格圖案
    text(aiChoice, x + w/2, h/2);
  }
}

function drawPlayerSide(x, y, w, h) {
  push();
  // 繪製攝影機容器
  translate(x + w/2, y + h/2);
  scale(-1, 1);
  imageMode(CENTER);
  // 加上淡淡的發光濾鏡感
  tint(255, 200, 255); 
  image(capture, 0, 0, w, h);
  pop();
  
  // 玩家區域標籤
  fill(0);
  textSize(24);
  text("玩家攝影機 (你)", x + w/2, y - 30);
  
  if (playerChoice !== "") {
    fill(255, 255, 0);
    text("偵測到：" + playerChoice, x + w/2, y + h + 30);
  }
}

function drawBattleZone(x, y, w, h) {
  // 繪製中間的戰鬥指示
  if (gameState === "WAITING") {
    fill(100, 50, 200);
    text("點擊空白鍵開始戰鬥", x + w/2, h/2);
  } else if (gameState === "FIGHTING") {
    textSize(64);
    text("準備...", x + w/2, h/2);
  } else {
    // 顯示勝負結果與粒子效果預留處
    textSize(48);
    fill(255, 50, 50);
    text(resultText, x + w/2, h/2);
  }
}

function drawScoreBoard() {
  textSize(28);
  fill(0);
  text(`比數 - AI: ${scores.ai} | 玩家: ${scores.player}`, width/2, 40);
  
  if (scores.ai >= 2 || scores.player >= 2) {
    fill(255, 0, 0);
    text("遊戲結束！", width/2, 80);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 模擬戰鬥邏輯觸發
function keyPressed() {
  if (key === ' ') {
    gameState = "RESULT";
    aiChoice = random(choices);
    // 這裡未來將串接手勢辨識結果，目前先隨機
    playerChoice = random(choices);
    resultText = "對決中!";
  }
}
