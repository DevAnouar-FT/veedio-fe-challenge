export interface UiRepository {
  id: string;
  name: string;
  starsCount: number;
  githubLink: string;
  description?: string;
}

export type FavouriteRepositoriesOnStorage = Record<
  UiRepository["id"],
  Omit<UiRepository, "id">
>;

export enum FetchStatus {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}
