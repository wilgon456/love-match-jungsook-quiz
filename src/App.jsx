import { useMemo, useState } from "react";
import { dimensions, questions, scaleLabels } from "./quizData";
import { calculateResult, getDimensionSummary } from "./scoring";

const scoreOptions = [1, 2, 3, 4, 5];

const dimensionAccent = {
  authenticity: "var(--accent-1)",
  directness: "var(--accent-2)",
  initiative: "var(--accent-3)",
  practicalCare: "var(--accent-4)",
  calmTension: "var(--accent-5)"
};

export default function App() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const result = useMemo(() => {
    if (!showResult || answeredCount !== questions.length) {
      return null;
    }

    return calculateResult(answers);
  }, [answers, answeredCount, showResult]);

  function handleSelect(questionId, value) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
  }

  function handleSubmit() {
    if (answeredCount !== questions.length) {
      return;
    }

    setShowResult(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <main className="app-frame">
        <section className="hero-card">
          <p className="eyebrow">ENTERTAINMENT QUIZ</p>
          <h1>30기 정숙 스타일 적합도 퀴즈</h1>
          <p className="hero-copy">
            방송 속 30기 정숙의 말투, 관계 텐션, 표현 방식을 바탕으로
            당신이 얼마나 잘 맞는지 확인하는 테스트입니다.
          </p>

          <div className="hero-badges">
            <span>질문 15개</span>
            <span>약 3분</span>
            <span>결과 총점 + 5개 축 분석</span>
          </div>

          <div className="notice-card">
            이 테스트는 실제 인물과의 궁합이 아니라, 공개 방송에서 드러난
            스타일 적합도를 엔터테인먼트형으로 해석한 결과입니다.
          </div>
        </section>

        {showResult && result ? (
          <ResultView result={result} onReset={handleReset} />
        ) : (
          <>
            <section className="progress-card">
              <div className="progress-topline">
                <span>진행률</span>
                <strong>
                  {answeredCount}/{questions.length}
                </strong>
              </div>
              <div className="progress-track" aria-hidden="true">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="progress-copy">
                모든 문항에 답하면 적합도와 축별 해석을 바로 볼 수 있습니다.
              </p>
            </section>

            <section className="question-list">
              {questions.map((question, index) => (
                <article className="question-card" key={question.id}>
                  <div className="question-head">
                    <p className="question-index">
                      Q{index + 1}. {dimensions[question.dimension].label}
                    </p>
                    <h2>{question.prompt}</h2>
                  </div>

                  <div className="scale-grid" role="radiogroup">
                    {scoreOptions.map((score) => {
                      const selected = answers[question.id] === score;

                      return (
                        <button
                          key={score}
                          type="button"
                          className={`scale-option ${selected ? "selected" : ""}`}
                          onClick={() => handleSelect(question.id, score)}
                          aria-pressed={selected}
                        >
                          <span className="score-value">{score}</span>
                          <span className="score-label">{scaleLabels[score]}</span>
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))}
            </section>

            <section className="submit-card">
              <button
                type="button"
                className="primary-button"
                onClick={handleSubmit}
                disabled={answeredCount !== questions.length}
              >
                결과 보기
              </button>
              <p className="submit-copy">
                {answeredCount === questions.length
                  ? "준비 완료. 결과를 확인해보세요."
                  : `${questions.length - answeredCount}개 문항이 남아 있습니다.`}
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function ResultView({ result, onReset }) {
  const rankedDimensions = Object.entries(result.dimensionScores).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <section className="result-stack">
      <article className="result-card spotlight">
        <p className="eyebrow">YOUR RESULT</p>
        <div className="score-row">
          <div>
            <p className="score-label-large">최종 적합도</p>
            <h2>{result.total}점</h2>
          </div>
          <div className="score-tier">{result.tier}</div>
        </div>
        <p className="result-summary">{result.summary}</p>

        <div className="top-match-card">
          <p className="mini-label">가장 강하게 나온 축</p>
          <strong>{dimensions[rankedDimensions[0][0]].label}</strong>
          <span>{rankedDimensions[0][1]}점</span>
        </div>
      </article>

      <article className="result-card">
        <div className="section-head">
          <h3>축별 해석</h3>
          <p>총점보다 각 축 조합을 함께 보는 편이 더 정확합니다.</p>
        </div>

        <div className="dimension-list">
          {Object.entries(result.dimensionScores).map(([key, score]) => {
            const info = dimensions[key];

            return (
              <div className="dimension-item" key={key}>
                <div className="dimension-topline">
                  <div className="dimension-name-wrap">
                    <span
                      className="dimension-dot"
                      style={{ background: dimensionAccent[key] }}
                    />
                    <strong>{info.label}</strong>
                  </div>
                  <span className="dimension-score">{score}점</span>
                </div>
                <div className="dimension-bar" aria-hidden="true">
                  <div
                    className="dimension-bar-fill"
                    style={{
                      width: `${score}%`,
                      background: dimensionAccent[key]
                    }}
                  />
                </div>
                <p className="dimension-copy">
                  {getDimensionSummary(score, info.summary)}
                </p>
              </div>
            );
          })}
        </div>
      </article>

      <article className="result-card">
        <div className="section-head">
          <h3>결과 해석 안내</h3>
          <p>
            이 결과는 공개 방송에서 드러난 30기 정숙의 스타일을 기준으로
            계산한 엔터테인먼트형 적합도입니다.
          </p>
        </div>

        <div className="guidance-grid">
          <div className="guidance-box">
            <p className="mini-label">의미하는 것</p>
            <span>대화 방식, 진정성, 관계 텐션의 스타일 적합도</span>
          </div>
          <div className="guidance-box">
            <p className="mini-label">의미하지 않는 것</p>
            <span>실제 궁합, 실제 성격 진단, 실제 연애 성사 가능성</span>
          </div>
        </div>

        <button type="button" className="secondary-button" onClick={onReset}>
          다시 풀기
        </button>
      </article>
    </section>
  );
}
