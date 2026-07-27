import { describe, it, expect, vi } from 'vitest';
import { eventBus } from '../../src/events/eventBus';

describe('eventBus', () => {
  it('subscribes and publishes events correctly', () => {
    const callback = vi.fn();
    
    eventBus.subscribe('TEST_EVENT', callback);
    eventBus.publish('TEST_EVENT', { data: 123 });
    
    expect(callback).toHaveBeenCalledWith({ data: 123 });
  });

  it('unsubscribes correctly', () => {
    const callback = vi.fn();
    
    const unsubscribe = eventBus.subscribe('TEST_EVENT_2', callback);
    unsubscribe();
    
    eventBus.publish('TEST_EVENT_2', { data: 123 });
    
    expect(callback).not.toHaveBeenCalled();
  });

  it('supports multiple subscribers', () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    
    eventBus.subscribe('MULTI', cb1);
    eventBus.subscribe('MULTI', cb2);
    
    eventBus.publish('MULTI', 'payload');
    
    expect(cb1).toHaveBeenCalledWith('payload');
    expect(cb2).toHaveBeenCalledWith('payload');
  });
});
