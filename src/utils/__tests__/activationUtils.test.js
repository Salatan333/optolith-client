const ActivationUtils = require('../activationUtils');

test('activates special ability and applies prerequisites', () => {
  const state = {
    attributes: new Map(),
    specialAbilities: new Map(),
  };

  const wikiEntry = {
    id: 'SA_12345',
    prerequisites: [{ id: 'ATTR_1', value: 10 }],
  };

  const actual = ActivationUtils.activate({
    id: 'SA_12345',
    cost: 4,
    sel: 1,
  })(state, wikiEntry);

  const convertedState = {
    attributes: [...actual.attributes],
    specialAbilities: [...actual.specialAbilities]
  };

  const expected = {
    attributes: [['ATTR_1', {
      id: 'ATTR_1',
      value: 8,
      mod: 0,
      dependencies: [10],
    }]],
    specialAbilities: [['SA_12345', {
      id: 'SA_12345',
      active: [{ sid: 1 }],
      dependencies: [],
    }]]
  };

  expect(convertedState).toEqual(expected);
});

test('deactivates special ability and removes prerequisites', () => {
  const state = {
    attributes: new Map([['ATTR_1', {
      id: 'ATTR_1',
      value: 8,
      mod: 0,
      dependencies: [10],
    }]]),
    specialAbilities: new Map([['SA_12345', {
      id: 'SA_12345',
      active: [{ sid: 1 }],
      dependencies: [],
    }]]),
  };

  const instance = {
    id: 'SA_12345',
    active: [{ sid: 1 }],
    dependencies: [],
  };

  const wikiEntry = {
    id: 'SA_12345',
    prerequisites: [{ id: 'ATTR_1', value: 10 }],
  };

  const actual = ActivationUtils.deactivate(0)(state, wikiEntry, instance);

  const convertedState = {
    attributes: [...actual.attributes],
    specialAbilities: [...actual.specialAbilities]
  };

  const expected = {
    attributes: [],
    specialAbilities: []
  };

  expect(convertedState).toEqual(expected);
});

test('update special ability level', () => {
  const state = {
    attributes: new Map([['ATTR_1', {
      id: 'ATTR_1',
      value: 8,
      mod: 0,
      dependencies: [10],
    }]]),
    specialAbilities: new Map([['SA_12345', {
      id: 'SA_12345',
      active: [{ tier: 1 }],
      dependencies: [],
    }]]),
  };

  const instance = {
    id: 'SA_12345',
    active: [{ tier: 1 }],
    dependencies: [],
  };

  const wikiEntry = {
    id: 'SA_12345',
    prerequisites: [{ id: 'ATTR_1', value: 10 }],
  };

  const actual = ActivationUtils.setTier(0, 2)(state, wikiEntry, instance);

  const convertedState = {
    attributes: [...actual.attributes],
    specialAbilities: [...actual.specialAbilities]
  };

  const expected = {
    attributes: [['ATTR_1', {
      id: 'ATTR_1',
      value: 8,
      mod: 0,
      dependencies: [10],
    }]],
    specialAbilities: [['SA_12345', {
      id: 'SA_12345',
      active: [{ tier: 2 }],
      dependencies: [],
    }]]
  };

  expect(convertedState).toEqual(expected);
});

test('update special ability level and update dependencies', () => {
  const state = {
    attributes: new Map([['ATTR_1', {
      id: 'ATTR_1',
      value: 8,
      mod: 0,
      dependencies: [10],
    }]]),
    specialAbilities: new Map([['SA_12345', {
      id: 'SA_12345',
      active: [{ tier: 1 }],
      dependencies: [],
    }]]),
  };

  const instance = {
    id: 'SA_12345',
    active: [{ tier: 1 }],
    dependencies: [],
  };

  const wikiEntry = {
    id: 'SA_12345',
    prerequisites: new Map([
      [1, [{ id: 'ATTR_1', value: 10 }]],
      [2, [{ id: 'ATTR_1', value: 12 }]],
    ]),
  };

  const actual = ActivationUtils.setTier(0, 2)(state, wikiEntry, instance);

  const convertedState = {
    attributes: [...actual.attributes],
    specialAbilities: [...actual.specialAbilities]
  };

  const expected = {
    attributes: [['ATTR_1', {
      id: 'ATTR_1',
      value: 8,
      mod: 0,
      dependencies: [10, 12],
    }]],
    specialAbilities: [['SA_12345', {
      id: 'SA_12345',
      active: [{ tier: 2 }],
      dependencies: [],
    }]]
  };

  expect(convertedState).toEqual(expected);
});