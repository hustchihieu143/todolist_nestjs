export interface CREATE_USER {
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface LOGIN_USER {
  email: string;
  password: string;
}
