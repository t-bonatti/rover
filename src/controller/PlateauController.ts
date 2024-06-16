import { Plateau } from '../models/Plateau';
import { Direction, Rover } from '../models/Rover';

export class PlateauController {
  private plateau?: Plateau;

  private currentRover: Rover | null;

  public createPlateau(upperCoordinate: number, rightCoordinate: number) {
    this.plateau = new Plateau(upperCoordinate, rightCoordinate);
  }

  public landRover(positionX: number, positionY: number, direction: Direction) {
    if (!this.plateau) {
      throw new Error('Plateau is not defined.');
    }
    if (this.currentRover) {
      throw new Error('It can not deploy a new rover. Another rover is waiting for instructions.');
    }

    this.currentRover = new Rover(positionX, positionY, direction, this.plateau);
  }

  public sendInstructions(instructions: string): string {
    if (!this.currentRover) {
      throw new Error('Rover is not landed.');
    }

    this.currentRover.move(instructions);
    const finalPosition = this.currentRover.getPosition();
    this.currentRover = null;

    return finalPosition;
  }
}

export const plateauController = new PlateauController();
