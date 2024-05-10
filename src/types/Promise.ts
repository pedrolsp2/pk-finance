export interface FirebaseReturnInsert {
  status: number;
  message: string;
}

export interface FirebaseReturnGet<T> {
  status: number;
  body: T[];
}
