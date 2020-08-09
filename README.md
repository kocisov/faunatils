# Faunatils ![GitHub CI](https://github.com/kocisov/faunatils/workflows/CI/badge.svg?branch=master)

> FaunaDB Utils

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
