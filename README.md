# 🐍🎲 Snake and Ladder Game – C++ (OOP Based)

A **classic Snake and Ladder game simulation** implemented in **C++ using Object-Oriented Programming (OOP)** principles.  
The game supports **multiple players**, **random dice rolls**, and follows **all standard Snake & Ladder rules**.

---

## 📌 Features

- 🎯 Board size: **10 × 10 (100 cells)**
- 👥 Supports **2 or more players**
- 🎲 **Random dice roll (1–6)**
- ⌨️ Player must **press ENTER to roll the dice**
- 🐍 Snakes pull players down
- 🪜 Ladders push players up
- 🏁 Player must land **exactly on cell 100** to win
- ❌ If dice roll exceeds 100 → no movement
- 🔄 Turn-based gameplay

---

## 🧱 Object-Oriented Design

### Classes Used

| Class | Responsibility |
|-----|----------------|
| `Dice` | Generates random dice values |
| `Player` | Stores player name & position |
| `Board` | Manages snakes, ladders & board size |
| `Game` | Controls game flow and turn logic |

---

## 🛠️ Technologies Used

- **Language:** C++
- **Concepts:** OOP, STL (`vector`, `unordered_map`)
- **Randomization:** `rand()`, `srand(time(0))`
- **Standard:** C++17

---

## 📂 Project Structure

SnakeLadder/
│
├── SnakeLadder.cpp
├── README.md


---

## ▶️ How to Compile and Run

### 🔹 Linux / macOS / Git Bash / WSL
```bash
g++ SnakeLadder.cpp -o SnakeLadder
./SnakeLadder
