import prompts from 'prompts';
import { plateauController } from '../controllers/PlateauController';

const plateauSizeRegex: RegExp = /(^\d{1,}) (\d{1,})$/;
const roverDeployRegex: RegExp = /(^\d{1,}) (\d{1,}) [NESW]$/;
const roverInstructionsRegex: RegExp = /[MRL*]$/;

class Prompt {
  public async run() {
    await this.plateauSize();

    while (true) {
      await this.landRover();
      await this.sendInstructions();
    }
  }

  private logError(error: Error) {
    console.log('Something went wrong. Please try again.');
    console.log(`Message: ${error.message}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkToAbort(prev: any) {
    if (prev.aborted) {
      process.exit();
    }
  }

  private async plateauSize() {
    try {
      const { plateauSize } = await prompts({
        type: 'text',
        name: 'plateauSize',
        message: 'Plateau Size:',
        validate: (value: string) => plateauSizeRegex.test(value),
        onState: this.checkToAbort,
      });

      const values = plateauSize.split(' ');

      plateauController.createPlateau(+values[0], +values[1]);
    } catch (error) {
      this.logError(error);
      await this.plateauSize();
    }
  }

  private async landRover() {
    try {
      const { roverLandingPosition } = await prompts({
        type: 'text',
        name: 'roverLandingPosition',
        message: 'Landing Position:',
        validate: (value: string) => roverDeployRegex.test(value),
        onState: this.checkToAbort,
      });

      const values = roverLandingPosition.split(' ');

      plateauController.landRover(+values[0], +values[1], values[2]);
    } catch (error) {
      this.logError(error);
      await this.landRover();
    }
  }

  private async sendInstructions() {
    try {
      const { roverInstructions } = await prompts({
        type: 'text',
        name: 'roverInstructions',
        message: 'Instruction:',
        validate: (value: string) => roverInstructionsRegex.test(value),
        onState: this.checkToAbort,
      });

      const finalPosition = plateauController.sendInstructions(roverInstructions);
      console.log(`Final Position: ${finalPosition}`);
    } catch (error) {
      this.logError(error);
      await this.sendInstructions();
    }
  }
}

export const prompt = new Prompt();
