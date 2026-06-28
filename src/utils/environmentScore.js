export function calculateEnvironmentScore(totalWaste, verified) {
  let score = 50;

  score += verified * 12;

  const unverifiedWaste = Math.max(totalWaste - verified, 0);
  score -= unverifiedWaste * 0.5;

  return Math.max(0, Math.min(100, Math.round(score)));
}