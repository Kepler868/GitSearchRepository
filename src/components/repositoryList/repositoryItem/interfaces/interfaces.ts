export interface RepositoryList {
  repositoryData: RepositoryData;
  activeModal: boolean;
  isLoading: boolean;
  isImageLoaded: boolean;
}

export interface RepositoryData {
  data?: Data;
}

export interface Data {
  repository: Repository;
}

export interface Repository {
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  description: string;
  owner: Owner;
  languages?: Languages | undefined;
}

export interface ItemRepositoryProps {
  item: Repository;
}

export interface Owner {
  login: string;
  avatarUrl?: string;
  url?: string;
}

export interface Languages {
  nodes: Language[];
}

export interface Language {
  name: string;
  color: string;
}

export interface RepositoryRequestArgs {
  name: string;
  owner: string;
}
