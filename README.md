# Faunatils ![GitHub CI](https://github.com/kocisov/faunatils/workflows/CI/badge.svg?branch=master)

> FaunaDB Utils

## Installation

```bash
$ yarn add faunatils
```

## Usage

```ts
import { createClient, createCaller, getByIndex, WithRef } from 'faunatils';

const client = createClient('fauna secret*');
const call = createCaller(client);

type Item = {
  name: string;
  color: string;
  price: number;
};

async function handler() {
  const [error, item] = await call<WithRef<Item>>(
    getByIndex('item_by_color', 'red')
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

## `@canary`

```ts
import { faunatils } from 'faunatils';

const db = faunatils('fauna secret*');

db.[functions*]()
```

### Functions

- `collections()`
  - Gets all collections from your Database
- `document(collection: string, refId: RefID)`
  - Gets specific document from collection
- `documents(collection: string)`
  - Gets all documents from collection
- `update(collection: string, refId: RefID, data)`
  - Updates specific document in collection
- `updateAll(collection: string, data)`
  - Updates all documents in collection
