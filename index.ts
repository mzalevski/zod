/**
 * graphql codegen ma opcję enumsAsTypes -> zamiast generować enumy generuje ona typy
 * ale ma też opcję enumsAsConst -> zamiast generować enumy generuje consty i z nich wyciąga unie
 * potem można za pomocą takieg helpera jak poniższy `getValuesEnum` podać to do zoda
 */

import { z } from "zod";

const PlacesType = {
  FIRST: "FIRST",
  SECOND: "SECOND",
} as const; // codegen

type PlacesType = (typeof PlacesType)[keyof typeof PlacesType]; // codegen

const getValuesEnum = (values: Record<string, string>) => {
  return Object.values(values) as [string, ...string[]];
};

const schema = z.object({
  places: z.enum(getValuesEnum(PlacesType)),
});

schema.parse({ places: "FIRST" }); // OK
schema.parse({ places: "SECOND" }); // OK
schema.parse({ places: "THIRD" }); // ERROR
