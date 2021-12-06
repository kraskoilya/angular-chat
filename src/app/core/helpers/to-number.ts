export function toNumber(data: string | number): number {
  return Number.parseFloat(data.toString().replace(/\s/g, '')) || 0;
}
