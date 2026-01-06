export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInput {
  name: string;
  phone: string;
  email?: string | null;
}

