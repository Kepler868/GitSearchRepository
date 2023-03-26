export interface ModalRepository {
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  description: string;
  owner: Owner;
  languages?: Languages | undefined;
}

export interface Languages {
  nodes: Language[];
}

export interface Language {
  name: string;
  color: string;
}
export interface Owner {
    login: string;
    avatarUrl?: string;
    url?: string;
}
