export function apiHeaders(extra?: Record<string, string>): Record<string, string> {
  return { 'x-api-key': process.env.NEXT_PUBLIC_API_TOKEN || '', ...extra };
}
