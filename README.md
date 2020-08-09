# Faunatils ![GitHub CI](https://github.com/kocisov/faunatils/workflows/CI/badge.svg?branch=master)

> FaunaDB Utilities

## Installation

```bash
$ yarn add faunatils
```

## Usage

```ts
import { createClient, getByIndex, WithRef } from 'faunatils';

type Item = {
  color: string;
  name: string;
  price: number;
};

async function handler() {
  const client = await createClient(process.env.FAUNA_KEY);

  const [error, item] = await client.call<WithRef<Item>>(
    getByIndex('itemByColor', 'red')
  );

  if (error) {
    return `Error occurred: ${error.message}`;
  }

  return `${item?.data.name} $${item?.data.price}`;
}

handler().then((response) => {
  console.log(response);
});
```

## Functions

> Examples for main functions, check /src or /test for more functions

### Database calling

#### createClient(secret: string)

```ts
import { createCollection } from 'faunatils';

const client = await createClient(process.env.FAUNA_KEY);

// returns
{
  raw: FaunaDB Client
  keyInfo: FaunaDB Key fetched from your Secret
  call: Faunatils caller
}
```

##### call\<T>(expression: FaunaDB Expression): T

```ts
import { getByIndex } from 'faunatils';

type Item = {
  color: string;
  name: string;
  price: number;
};

const [error, response] = await client.call<Item>(
  getByIndex('itemByColor', 'red')
);

if (error) {
  throw new Error(error.message);
}

console.log(response.data);
```

### Indexes

#### getByIndex(ref: RefID, ...terms: ExprArg[])

```ts
import { getByIndex } from 'faunatils';

const indexName = 'itemsByColor';

const item = await client.call(getByIndex(indexName, 'red'));
```

#### getAllByIndex(index: string, ...terms: ExprArg[])

```ts
import { getAllByIndex } from 'faunatils';

const indexName = 'itemsByColor';

const items = await client.call(getAllByIndex(indexName, 'red'));
```

### Collection

#### refInCollection(ref: RefID, collection: string)

```ts
import { refInCollection } from 'faunatils';

const collectionName = 'items';
const itemId = '260740907053089282';

// can be used in database call/expression afterwards
const itemInDatabase = refInCollection(collectionName, itemId);
```

#### createCollection(collection: string)

```ts
import { createCollection } from 'faunatils';

const collectionToCreate = createCollection('items');

await client.call(collectionToCreate);
```

#### createInCollection\<T>(collection: string, data: T)

```ts
import { createInCollection } from 'faunatils';

const createItemInItemsCollection = createInCollection('items', {
  name: 'apple',
  color: 'red',
});

await client.call(createItemInItemsCollection);
```

#### getAllInCollection(collection: string)

```ts
import { getAllInCollection } from 'faunatils';

await client.call(getAllInCollection('items'));
```

#### updateAllInCollection\<T>(collection: string, data: T)

```ts
import { updateAllInCollection } from 'faunatils';

const updateAllWithThisData = {
  outOfStock: true,
};

await client.call(updateAllInCollection('items', updateAllWithThisData));
```

## Types

```ts
import {
  RefID,
  FaunatilsClientObject,
  Collection,
  Database,
  FaunaRef,
  ResponseFaunaRef,
} from 'faunatils';

/*
  WithRef<T> - Include FaunaDB Reference with Response data (T)

  Collection - FaunaDB Collection
  Database - FaunaDB Database
  RefID - FaunaDB Reference ID
  FaunatilsClientObject - Faunatils createClient return type
  FaunaRef - FaunaDB Reference (normalized)
  ResponseFaunaRef - FaunaDB Reference (raw reference from response)
  IndexTermOrValue - Fields for Index creation
  Roles - FaunaDB Secret key roles (Admin, Server)
  CallerReturnType<T> - Type for Array destructing with client.call
*/
```

### Full export

```ts
import {
  CallerReturnType,
  Collection,
  createCaller,
  createClient,
  createCollection,
  createInCollection,
  createIndex,
  createUserInCollection,
  Database,
  deleteInCollectionByRef,
  FaunaRef,
  FaunatilsClientObject,
  fQL,
  getAllByIndex,
  getAllInCollection,
  getByIndex,
  getIdFromRef,
  getInCollectionByRef,
  IndexTermOrValue,
  KeyFromSecret,
  loginUserInIndex,
  logoutUser,
  payloadWithId,
  RefID,
  refInCollection,
  replaceInCollectionByRef,
  ResponseFaunaRef,
  Roles,
  updateAllInCollection,
  updateInCollectionByRef,
  updatePasswordInIndex,
  updateUserInIndex,
  WithRef,
} from 'faunatils';
```
