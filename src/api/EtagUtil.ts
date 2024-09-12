export const EtagUtil = {
  REQUEST_HEADER_NAME: "If-None-Match",
  RESPONSE_HEADER_NAME: "etag",
  get: (uri: string): string | null => localStorage.getItem(`etag-${uri}`),
  set: (uri: string, etag: string): void =>
    localStorage.setItem(`etag-${uri}`, etag),
  clear: (uri: string): void => localStorage.removeItem(`etag-${uri}`),
  getCachedData: (uri: string): object | null => {
    const data = localStorage.getItem(`data-${uri}`);
    return data ? JSON.parse(data) : null;
  },
  setCachedData: (uri: string, data: object): void => {
    localStorage.setItem(`data-${uri}`, JSON.stringify(data));
  },
};
