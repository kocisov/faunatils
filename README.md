# Faunatils

> FaunaDB Utilities

## Installation

```bash
$ npm install faunatils
```

## Usage

```ts
import {Client} from "faunadb";
import {getByIndex, createCaller, WithRef} from "faunatils";

type Item = {
  color: string;
  name: string;
  price: number;
};

const client = new Client({
  secret: process.env.FAUNA_KEY,
});

const call = createCaller(client);

async function getItemNameAndPriceByColor(color: string) {
  let [item, error] = await call<WithRef<Item>>(
    getByIndex("itemByColor", color),
  );

  if (error) {
    return null;
  }

  return `${item?.data?.name} $${item?.data?.price}`;
}

handler();
```
