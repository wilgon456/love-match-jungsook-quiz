export const scaleLabels = {
  1: "전혀 아니다",
  2: "별로 아니다",
  3: "보통이다",
  4: "어느 정도 그렇다",
  5: "매우 그렇다"
};

export const quizConfigs = {
  jungsook: {
    characterId: "jungsook",
    title: "30기 정숙 스타일 적합도 퀴즈",
    description:
      "방송 속 30기 정숙의 말투, 관계 텐션, 표현 방식을 바탕으로 당신이 얼마나 잘 맞는지 확인하는 테스트입니다.",
    badges: ["질문 15개", "약 3분", "결과 총점 + 5개 축 분석"],
    note:
      "이 테스트는 실제 인물과의 궁합이 아니라, 공개 방송에서 드러난 스타일 적합도를 엔터테인먼트형으로 해석한 결과입니다.",
    dimensions: {
      authenticity: {
        label: "진정성",
        weight: 0.3,
        summary: {
          high: "꾸밈없는 태도와 자연스러운 관계를 선호합니다.",
          mid: "자연스러움을 중요하게 여기지만 상황에 따라 이미지 관리도 고려합니다.",
          low: "관계에서 인상 관리와 분위기 조절을 더 중시하는 편입니다."
        }
      },
      directness: {
        label: "솔직함",
        weight: 0.2,
        summary: {
          high: "불편함이나 감정을 비교적 분명하게 표현하는 편입니다.",
          mid: "필요할 때는 솔직하지만 관계 분위기도 함께 고려합니다.",
          low: "직설적 표현보다는 완곡한 소통을 선호합니다."
        }
      },
      initiative: {
        label: "주도성",
        weight: 0.2,
        summary: {
          high: "마음이 가면 스스로 움직일 수 있는 타입입니다.",
          mid: "상황을 보며 움직이지만 필요할 때는 주도권을 잡을 수 있습니다.",
          low: "관계에서 먼저 움직이기보다 흐름을 보는 편입니다."
        }
      },
      practicalCare: {
        label: "배려형 실용성",
        weight: 0.15,
        summary: {
          high: "상대를 편하게 해주면서도 상황 정리에 강한 편입니다.",
          mid: "배려와 현실 감각이 균형 잡힌 편입니다.",
          low: "상황 수습이나 감정 완충보다 자신의 반응이 먼저 나올 수 있습니다."
        }
      },
      calmTension: {
        label: "담백한 텐션",
        weight: 0.15,
        summary: {
          high: "과한 연출보다 편안하고 안정적인 대화 텐션을 선호합니다.",
          mid: "분위기와 편안함 사이의 균형을 보는 편입니다.",
          low: "정적인 텐션보다 활기 있고 표현적인 흐름을 선호합니다."
        }
      }
    },
    questions: [
      {
        id: "Q1",
        dimension: "authenticity",
        reverse: false,
        prompt: "나는 처음 만난 자리에서도 억지로 포장하기보다 자연스럽게 행동하는 편이다."
      },
      {
        id: "Q2",
        dimension: "authenticity",
        reverse: false,
        prompt: "상대가 남의 시선이나 이미지 관리에 지나치게 집착하면 매력이 떨어진다."
      },
      {
        id: "Q3",
        dimension: "directness",
        reverse: false,
        prompt: "관계에서 불편한 점이 생기면 적당한 시점에 솔직하게 말하는 편이다."
      },
      {
        id: "Q4",
        dimension: "directness",
        reverse: true,
        prompt: "나는 상대 기분이 상할까 봐 웬만한 불편함은 그냥 넘기는 편이다."
      },
      {
        id: "Q5",
        dimension: "initiative",
        reverse: false,
        prompt: "마음에 드는 사람이 있으면 상황만 기다리기보다 내가 먼저 기회를 만드는 편이다."
      },
      {
        id: "Q6",
        dimension: "initiative",
        reverse: true,
        prompt: "나는 연애에서 리드하기보다 상대가 방향을 정해주길 바라는 편이다."
      },
      {
        id: "Q7",
        dimension: "practicalCare",
        reverse: false,
        prompt: "상대가 불안해 보이면 조언보다 먼저 '지금도 충분히 괜찮다'는 신호를 주는 편이다."
      },
      {
        id: "Q8",
        dimension: "practicalCare",
        reverse: false,
        prompt: "데이트 중 예상치 못한 문제가 생기면 감정보다 해결부터 먼저 생각하는 편이다."
      },
      {
        id: "Q9",
        dimension: "calmTension",
        reverse: false,
        prompt: "나는 분위기만 멋있게 만드는 사람보다 실제로 편안한 사람에게 더 끌린다."
      },
      {
        id: "Q10",
        dimension: "calmTension",
        reverse: true,
        prompt: "어색한 침묵이 오면 무조건 말을 계속 채워야 한다고 느낀다."
      },
      {
        id: "Q11",
        dimension: "authenticity",
        reverse: false,
        prompt: "누군가가 자신을 꾸미기보다 있는 그대로 보여줄 때 더 신뢰가 간다."
      },
      {
        id: "Q12",
        dimension: "directness",
        reverse: true,
        prompt: "관계를 위해서라면 듣기 좋은 말로 돌려 말하는 편이 낫다고 생각한다."
      },
      {
        id: "Q13",
        dimension: "initiative",
        reverse: false,
        prompt: "나는 누군가와 가까워질 때 애매한 상태를 오래 끌기보다 분명하게 만드는 편이다."
      },
      {
        id: "Q14",
        dimension: "practicalCare",
        reverse: false,
        prompt: "상대가 실수했을 때 민망하지 않게 상황을 자연스럽게 정리해줄 수 있다."
      },
      {
        id: "Q15",
        dimension: "calmTension",
        reverse: false,
        prompt: "나와 잘 맞는 사람은 텐션이 과하게 높기보다 차분하고 담백한 편이다."
      }
    ]
  }
};
