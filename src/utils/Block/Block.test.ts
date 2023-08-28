import Block from './Block'; // Путь до вашего файла
import { EventBus } from '../EventBus';
import { v4 as makeUUID } from 'uuid';

jest.mock('../EventBus');
jest.mock('uuid');

describe('Block unit tests', () => {
  let blockInstance: Block;

  beforeEach(() => {
    (EventBus as jest.Mock).mockClear();
    (makeUUID as jest.Mock).mockReturnValue('uuid');

    blockInstance = new Block({});
  });

  it('should properly initialize ID', () => {
    expect(blockInstance.id).toEqual('uuid');
  });

  it('should initialize with default props', () => {
    expect(blockInstance.props).toEqual({});
  });

  it('should properly set props', () => {
    blockInstance.setProps({ key1: 'value1' });
    expect(blockInstance.props.key1).toEqual('value1');
  });

  it('should not update props if setProps is called with null or undefined', () => {
    const originalProps = { ...blockInstance.props };

    blockInstance.setProps(null as any);
    expect(blockInstance.props).toEqual(originalProps);

    blockInstance.setProps(undefined as any);
    expect(blockInstance.props).toEqual(originalProps);
  });

  it('should properly register event', () => {
    const callback = jest.fn();
    const eventName = 'click';

    const mockElement = { addEventListener: jest.fn() };
    blockInstance._element = mockElement as any;

    blockInstance.on(eventName, callback);

    expect(blockInstance.events).toEqual({ [eventName]: callback });
    expect(mockElement.addEventListener).toBeCalledWith(eventName, callback);
  });
});
