export interface TodoDTO {
  title: string;
  description: string;
  status?: string;
}

export interface TodoList {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}
