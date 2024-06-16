import { PlateauController } from './PlateauController';

describe('PLateauController', () => {
  let controller: PlateauController;

  test('should move a rover', () => {
    controller = new PlateauController();
    controller.createPlateau(5, 5);
    controller.landRover(1, 2, 'N');
    const finalPosition = controller.sendInstructions('LMLMLMLMM');
    expect(finalPosition).toEqual('1 3 N');
  });

  test('should not land a rover when plateau is not defined', () => {
    controller = new PlateauController();
    expect(() => controller.landRover(1, 2, 'N')).toThrow(new Error('Plateau is not defined.'));
  });

  test('should not land a rover when has a hover waiting instructions', () => {
    controller = new PlateauController();
    controller.createPlateau(5, 5);
    controller.landRover(1, 2, 'N');
    expect(() => controller.landRover(2, 2, 'E')).toThrow(
      new Error('It can not deploy a new rover. Another rover is waiting for instructions.'),
    );
  });

  test('should send instructions when does not have a hover', () => {
    controller = new PlateauController();
    controller.createPlateau(5, 5);
    expect(() => controller.sendInstructions('MM')).toThrow(new Error('Rover is not landed.'));
  });
});
