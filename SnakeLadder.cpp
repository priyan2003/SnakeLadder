#include <bits/stdc++.h>
using namespace std;

class Dice{
public:
   int roll(){
      return(rand()%6)+1;
   }
};

class Player {
    string name;
    int position;
public:
    Player(string name){
        this->name = name;
        position = 0;
    }
    string getName(){
        return name;
    }
    int getPosition(){
        return position;
    }
    void setPosition(int pos){
        position = pos;
    }

};

class Board{
    int size;
    unordered_map<int, int> snakes;
    unordered_map<int, int> ladders;
public:
    Board(int n = 100){
        size = n;
    }
    void addSnake(int head, int tail){
        snakes[head] = tail;
    }
    void addLadder(int start, int end){
        ladders[start] = end;
    }
    int getFinalPosition(int pos){
        if(snakes.count(pos)){
            cout<<"Snake down from "<<pos<<" to "<<snakes[pos]<<endl;
            return snakes[pos];
        }
        if(ladders.count(pos)){
            cout<<"Ladder up from "<<pos<<" to "<<ladders[pos]<<endl;
            return ladders[pos];
        }
        return pos;
    }
    int getSize() const{
        return size;
    }
};

class Game {
    Board board;
    Dice dice;
    vector<Player> players;
    int currentTurn;

public:
    Game(int boardSize = 100) : board(boardSize){
        currentTurn = 0;
        srand(time(0));
    }
    void addPlayer(string name){
        players.emplace_back(name);
    }
    void addSnake(int head, int tail){
        board.addSnake(head, tail);
    }
    void addLadder(int start, int end){
        board.addLadder(start, end);
    }
    void Play(){
        cout<<"Snake Ladder game started!!"<<endl;
        while(true){
            Player &player = players[currentTurn];
            cout<<player.getName()<<"'s turn"<<endl;
            cout<<"Press ENTER to roll the dice...";
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            int diceValue = dice.roll();
            cout<<"Rolled : "<<diceValue<<endl;
            int currPos = player.getPosition();
            int newPos = currPos + diceValue;
            
            if(newPos > board.getSize()){
                cout<<"Can not move!!"<<endl;
            }
            else{
                cout<<"Moved from "<<currPos<<" to "<<newPos<<endl;
                newPos = board.getFinalPosition(newPos);
                player.setPosition(newPos);
            }
            cout<<" Current Positon : "<<player.getPosition()<<endl;

            if(player.getPosition() == board.getSize()){
                cout<<player.getName()<<" is Winner!!"<<endl;
                break;
            }
            currentTurn = (currentTurn + 1) % players.size();
        }
    }
      
};
int main(){
    Game game;
    game.addPlayer("Player 1");
    game.addPlayer("Player 2");

    game.addLadder(1,38);
    game.addLadder(4,14);
    game.addLadder(8,30);
    game.addLadder(21,42);
    game.addLadder(28,76);
    game.addLadder(50,67);
    game.addLadder(80, 99);
    game.addLadder(71,92);

    game.addSnake(97,78);
    game.addSnake(95,56);
    game.addSnake(88,24);
    game.addSnake(62,18);
    game.addSnake(48,26);
    game.addSnake(36,6);
    game.addSnake(32,10);


    game.Play();
    return 0;
}