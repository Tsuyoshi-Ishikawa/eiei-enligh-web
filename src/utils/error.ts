export const handleError = (err: any, callback: (message: string) => void) => {
  if (err instanceof Error) {
    callback(err.message);
  }
};