// eslint-disable-next-line import/prefer-default-export
export const logoutFetch = async (): Promise<{ message: string }> => {
  const res = await fetch('/api/auth/logout');
  const data: { message: string } = (await res.json()) as { message: string };
  return data;
};
