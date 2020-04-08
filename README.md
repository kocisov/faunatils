# Faunatils ![](https://github.com/kocisov/faunatils/workflows/CI/badge.svg?branch=master)

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
  let [error, item] = await call<WithRef<Item>>(
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
