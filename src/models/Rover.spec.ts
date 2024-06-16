import { Plateau } from './Plateau';
import { Direction, Rover } from './Rover';
import testCases from '../../test/rover-test-cases.json';

describe('Rover', () => {
  const plateau = new Plateau(4, 4);

  test.each(testCases)(
    'Should move | ($input.positionX $input.positionY $input.direction) | $input.instructions',
    (data) => {
      const { input, expectResult } = data;
      const rover = new Rover(input.positionX, input.positionY, input.direction as Direction, plateau);
      rover.move(input.instructions);
      expect(rover.getPosition()).toEqual(expectResult);
    },
  );

  test('should return error when is an invalid deploy', () => {
    expect(() => new Rover(0, 5, 'N', plateau)).toThrow(new Error('Invalid deploy position.'));
  });

  test('should return error when has an invalid instruction', () => {
    const rover = new Rover(0, 0, 'N', plateau);
    expect(() => rover.move('MXXX')).toThrow(new Error('instruction X is invalid.'));
    expect(rover.getPosition()).toEqual('0 0 N');
  });

  test('should return error when exceeded the X coordinate limit by above', () => {
    const rover = new Rover(0, 4, 'N', plateau);
    expect(() => rover.move('M')).toThrow(new Error('instruction exceed plateau limits.'));
    expect(rover.getPosition()).toEqual('0 4 N');
  });

  test('should return error when exceeded the X coordinate limit by below', () => {
    const rover = new Rover(0, 0, 'S', plateau);
    expect(() => rover.move('M')).toThrow(new Error('instruction exceed plateau limits.'));
    expect(rover.getPosition()).toEqual('0 0 S');
  });

  test('should return error when exceeded the Y coordinate limit by right', () => {
    const rover = new Rover(4, 0, 'E', plateau);
    expect(() => rover.move('M')).toThrow(new Error('instruction exceed plateau limits.'));
    expect(rover.getPosition()).toEqual('4 0 E');
  });

  test('should return error when exceeded the Y coordinate limit by left', () => {
    const rover = new Rover(0, 0, 'W', plateau);
    expect(() => rover.move('M')).toThrow(new Error('instruction exceed plateau limits.'));
    expect(rover.getPosition()).toEqual('0 0 W');
  });

  test('should return error when direction is invalid', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rover = new Rover(0, 4, 'X' as any, plateau);
    expect(() => rover.move('M')).toThrow(new Error('Invalid current direction.'));
    expect(() => rover.move('R')).toThrow(new Error('Invalid current direction.'));
    expect(() => rover.move('L')).toThrow(new Error('Invalid current direction.'));
    expect(rover.getPosition()).toEqual('0 4 X');
  });
});
