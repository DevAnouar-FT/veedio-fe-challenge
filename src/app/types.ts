export interface UiRepository {
  id: string;
  name: string;
  starsCount: number;
  githubLink: string;
  description?: string;
}

export enum FetchStatus {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}
