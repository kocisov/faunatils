import { getIdFromRef, payloadWithId } from '../src';

const item = {
  ref: {
    value: {
      id: 'string id',
      collection: '',
      ts: 10,
    },
  },
  data: {
    colorful: true,
  },
};

describe('faunatils', () => {
  it('gets id from ref', () => {
    expect(getIdFromRef(item)).toEqual('string id');
  });

  it('gets payload object with id', () => {
    expect(payloadWithId(item)).toEqual({
      id: 'string id',
      colorful: true,
    });
  });
});
