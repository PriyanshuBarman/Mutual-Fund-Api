// utils/isPermanentFailure.js
export function isPermanentFailure(error) {
  // Only retry database/network errors - blacklist everything else
  const temporaryErrors = ["database insertion failed", "database", "connection", "timeout", "network", "prisma"];

  const isTemporary = temporaryErrors.some((tempError) => error.toLowerCase().includes(tempError.toLowerCase()));

  return !isTemporary; // Blacklist everything except temporary errors
}
