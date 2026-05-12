Item `props` can be represented using the following structure:

```json
{
  "sprites": {
    "composition": [
      [43, 54, 65],
      [71, 84, 92]
    ],
    "alwaysTop": [43, 54, 65]
  }
}
```

`sprites` - an object containing the sprites of the item used to render the tiles.
`composition` - a 2D array of sprite identifiers.
`alwaysTop` - represents sprites which should always be rendered on top of other items.

The `composition` indexes should correlate to the indexes of the tiles in the sprite sheet, starting from 0.
These sprites should also correlate to the output from the `sprites:generate` script.

Example:
```sh
cd client
npm run sprites:generate
```
