import {
  getIdFromRef,
  payloadWithId,
  createClient,
  createCaller,
  getByIndex,
  getAllInCollection,
  getAllByIndex,
  createCollection,
  updateAllInCollection,
  createInCollection,
  deleteInCollectionByRef,
  getInCollectionByRef,
  updateInCollectionByRef,
  createIndex,
  replaceInCollectionByRef,
} from '../src';

const unauthorizedClient = createClient('');
const unauthorizedCall = createCaller(unauthorizedClient);

const client = createClient(process.env.FAUNA_KEY!);
const call = createCaller(client);

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

let toBeDeleted: any = null;

describe('faunatils', () => {
  it('fails to make call without secret', async () => {
    const [err] = await unauthorizedCall(getByIndex('all_items'));
    expect(err?.message).toEqual('unauthorized');
  });
  it('gets id from ref', () => {
    expect(getIdFromRef(item)).toEqual('string id');
  });

  it('gets payload object with id', () => {
    expect(payloadWithId(item)).toEqual({
      id: 'string id',
      colorful: true,
    });
  });

  it('gets document by ref', async () => {
    const [err, response] = await call<any>(
      getInCollectionByRef('users', '260632024662934018')
    );
    expect(err).toBe(null);
    expect(response.data.email).toBe('fa@example.com');
  });

  it('updates document by ref', async () => {
    const [err, response] = await call<any>(
      updateInCollectionByRef('users', '260632024662934018', { cool: false })
    );
    expect(err).toBe(null);
    expect(response.data.cool).toBe(false);
  });

  it('gets all in collection', async () => {
    const [err, response] = await call<any>(getAllInCollection('users'));
    expect(err).toBe(null);
    expect(response.data.length).toBe(2);
  });

  it('gets all in collection by index', async () => {
    const [err, response] = await call<any>(getAllByIndex('all_users'));
    expect(err).toBe(null);
    expect(response.data.length).toBe(2);
  });

  it('gets one document by index', async () => {
    const [err, response] = await call<any>(
      getByIndex('user_by_email', 'guy@example.com')
    );
    expect(err).toBe(null);
    expect(response.data.email).toBe('guy@example.com');
  });

  it('fails to create duplicated collection', async () => {
    const [err] = await call<any>(createCollection('users'));
    expect(err!.message).toBe('instance already exists');
  });

  it('fails to create duplicated index', async () => {
    const [err] = await call<any>(createIndex('all_users', 'users'));
    expect(err!.message).toBe('instance already exists');
  });

  it('updates all in collection', async () => {
    const [err, response] = await call<any>(
      updateAllInCollection('users', {
        cool: true,
      })
    );
    expect(err).toBe(null);
    expect(response.data[0].data.cool).toBe(true);
  });

  it('updates all in collection', async () => {
    const [err, response] = await call<any>(
      updateAllInCollection('users', {
        cool: true,
      })
    );
    expect(err).toBe(null);
    expect(response.data[0].data.cool).toBe(true);
  });

  it('creates new document', async () => {
    const [err, response] = await call<any>(
      createInCollection('users', {
        email: 'random@test.com',
        cool: true,
      })
    );
    toBeDeleted = getIdFromRef(response);
    expect(err).toBe(null);
    expect(response.data.email).toBe('random@test.com');
  });
  it('replaces document data', async () => {
    const [err] = await call<any>(
      replaceInCollectionByRef('users', toBeDeleted, {
        cool: false,
      })
    );
    expect(err).toBe(null);
  });

  it('deletes newly created document', async () => {
    const [err] = await call<any>(
      deleteInCollectionByRef('users', toBeDeleted)
    );
    expect(err).toBe(null);
  });
});
