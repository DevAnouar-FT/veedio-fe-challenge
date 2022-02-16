export const getDateFromSevenDaysAgo = (): Date =>
  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

export const getTimeFromIsoRepresentation = (
  isoRepresentation: string
): number => new Date(isoRepresentation).getTime();
