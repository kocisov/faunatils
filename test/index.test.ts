import {
  getIdFromRef,
  payloadWithId,
  createClient,
  createCaller,
  getByIndex,
} from '../src';

const unauthorizedClient = createClient('');
const unauthorizedCall = createCaller(unauthorizedClient);

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

  it('failed without secret', async () => {
    const [err] = await unauthorizedCall(getByIndex('all_items'));
    expect(err?.message).toEqual('unauthorized');
  });
});
