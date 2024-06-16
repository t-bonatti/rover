# Rover

A CLI application to provide the coordinates of a rovers landed on a plateau.

![image](https://github.com/t-bonatti/rover/assets/1936245/a8353290-1e84-4270-9687-b077f7c95ec6)


# Mars Rover in JavaScript

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.
A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.
In order to control a rover , NASA sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading.
Assume that the square directly North from (x, y) is (x, y 1).

# Getting Started

1. Clone the repo
   
```
git clone https://github.com/t-bonatti/rover.git
```

2. Install dependencies

```
npm install
```

3. Run the application

```
npm run start
```

> [!TIP]
> Recommended to use Node 20
