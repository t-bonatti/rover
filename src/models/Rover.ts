import { Plateau } from './Plateau';

export type Direction = 'N' | 'E' | 'S' | 'W';

export class Rover {
  private positionX: number;

  private positionY: number;

  private direction: Direction;

  private plateau: Plateau;

  constructor(positionX: number, positionY: number, direction: Direction, plateau: Plateau) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.direction = direction;
    this.plateau = plateau;

    if (!this.isValidCurrentPosition()) {
      throw new Error('Invalid deploy position.');
    }
  }

  public move(instructions: string) {
    const { positionX, positionY, direction } = this;

    try {
      for (const instruction of instructions.split('')) {
        switch (instruction) {
          case 'M':
            this.walk();
            break;
          case 'R':
            this.turnRight();
            break;
          case 'L':
            this.turnLeft();
            break;
          default:
            throw new Error(`instruction ${instruction} is invalid.`);
        }
      }
    } catch (error) {
      this.positionX = positionX;
      this.positionY = positionY;
      this.direction = direction;

      throw error;
    }
  }

  public getPosition(): string {
    return `${this.positionX} ${this.positionY} ${this.direction}`;
  }

  private walk() {
    switch (this.direction) {
      case 'N':
        this.positionY++;
        break;
      case 'E':
        this.positionX++;
        break;
      case 'S':
        this.positionY--;
        break;
      case 'W':
        this.positionX--;
        break;
      default:
        throw new Error('Invalid current direction.');
    }

    if (!this.isValidCurrentPosition()) {
      throw new Error('instruction exceed plateau limits.');
    }
  }

  private isValidCurrentPosition() {
    return (
      this.positionX >= 0 &&
      this.positionX <= this.plateau.upperCoordinate &&
      this.positionY >= 0 &&
      this.positionY <= this.plateau.rightCoordinate
    );
  }

  private turnRight() {
    switch (this.direction) {
      case 'N':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'N';
        break;
      default:
        throw new Error('Invalid current direction.');
    }
  }

  private turnLeft() {
    switch (this.direction) {
      case 'N':
        this.direction = 'W';
        break;
      case 'E':
        this.direction = 'N';
        break;
      case 'S':
        this.direction = 'E';
        break;
      case 'W':
        this.direction = 'S';
        break;
      default:
        throw new Error('Invalid current direction.');
    }
  }
}
