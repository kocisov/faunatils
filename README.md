# Faunatils

> FaunaDB Utilities

## Installation

```bash
$ npm install faunatils
# or
$ yarn add faunatils
```

## Usage

```ts
import {Client} from "faunadb";
import {getByIndex, WithRef} from "faunatils";

type Item = {
  color: string;
  name: string;
  price: number;
};

async function handler() {
  const client = new Client({
    secret: process.env.FAUNA_KEY,
  });

  const item = await client.query<WithRef<Item>>(
    getByIndex("itemByColor", "red"),
  );

  return `${item?.data?.name} $${item?.data?.price}`;
}

handler();
```
