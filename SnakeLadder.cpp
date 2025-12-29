#include <bits/stdc++.h>
using namespace std;

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
            cout<<player.getName<<"'s turn"<<endl;
            int diceValue = dice.roll();
            cout<<"Rolled : "<<diceValue<<endl;
            int currPos = player.getPosition();
            int newPos = currPos + diceValue;
            
            if(newPos > board.getSize()){
                cout<<"Can not move!!"<<endl;
            }
            else{
                cout<<"Moved from "<<currPos<<"to "<<newPos<<endl;
                newPos = board.getFinalPosition(newPos);
                player.setPosition(newPos);
            }
            cout<<" Current Positon : "<<player.getPosition()<<endl;

            if(player.getPosition == board.getSize()){
                cout<<player.getName<<" is Winner!!"<<endl;
                break;
            }
            currentTurn = (currentTurn + 1) % players.size();
        }
    }
      
};
int main(){

}