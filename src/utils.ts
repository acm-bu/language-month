

// utility type for making readable types
export type Flatten<T> = { [x in keyof T]: T[x] } & {};
