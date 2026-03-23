import { dimensions, questions } from "./quizData";

function adjustScore(question, value) {
  return question.reverse ? 6 - value : value;
}

function normalizeDimension(sum) {
  return Math.round(((sum - 3) / 12) * 100);
}

export function calculateResult(answers) {
  const grouped = Object.keys(dimensions).reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});

  for (const question of questions) {
    const value = answers[question.id];

    if (!value) {
      continue;
    }

    grouped[question.dimension].push(adjustScore(question, value));
  }

  const dimensionScores = {};

  for (const [key, values] of Object.entries(grouped)) {
    const sum = values.reduce((total, current) => total + current, 0);
    dimensionScores[key] = normalizeDimension(sum);
  }

  const total = Math.round(
    Object.entries(dimensions).reduce((sum, [key, config]) => {
      return sum + dimensionScores[key] * config.weight;
    }, 0)
  );

  return {
    total,
    dimensionScores,
    tier: getTier(total),
    summary: getTotalSummary(total)
  };
}

export function getDimensionSummary(score, summary) {
  if (score >= 80) {
    return summary.high;
  }

  if (score >= 50) {
    return summary.mid;
  }

  return summary.low;
}

function getTier(score) {
  if (score >= 85) {
    return "매우 잘 맞음";
  }

  if (score >= 70) {
    return "잘 맞는 편";
  }

  if (score >= 55) {
    return "맞는 부분과 다른 부분이 공존";
  }

  if (score >= 40) {
    return "조금 다름";
  }

  return "스타일 차이 큼";
}

function getTotalSummary(score) {
  if (score >= 85) {
    return "방송 속 30기 정숙 스타일과 상당히 잘 맞는 편입니다. 자연스러움, 솔직함, 관계 텐션에서 높은 적합도가 보입니다.";
  }

  if (score >= 70) {
    return "전반적으로 30기 정숙 스타일과 잘 맞는 편입니다. 특히 대화 방식이나 관계 접근법에서 안정적인 호환성이 보입니다.";
  }

  if (score >= 55) {
    return "맞는 포인트도 분명하지만 몇몇 관계 텐션에서는 차이가 있을 수 있습니다. 축별 결과를 함께 보면 더 잘 이해할 수 있습니다.";
  }

  if (score >= 40) {
    return "30기 정숙 스타일과는 관계 템포나 표현 방식에서 차이가 있을 수 있습니다. 좋고 나쁨의 문제가 아니라 선호하는 대화 방식이 다를 수 있다는 뜻입니다.";
  }

  return "방송 속 30기 정숙 스타일과는 매력 포인트가 꽤 다를 수 있습니다. 특히 진정성, 솔직함, 관계 주도성 축에서 차이가 클 가능성이 있습니다.";
}
