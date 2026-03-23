import { useMemo, useState } from "react";
import { characterOrder, characterProfiles } from "./characters";
import { quizConfigs, scaleLabels } from "./quizzes";
import { calculateResult, getDimensionSummary } from "./scoring";

const scoreOptions = [1, 2, 3, 4, 5];

const dimensionAccents = [
  "var(--accent-1)",
  "var(--accent-2)",
  "var(--accent-3)",
  "var(--accent-4)",
  "var(--accent-5)"
];

export default function App() {
  const [selectedPersonId, setSelectedPersonId] = useState("jungsook");
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const selectedPerson = characterProfiles[selectedPersonId];
  const selectedQuiz = quizConfigs[selectedPersonId] ?? null;
  const isQuizAvailable = Boolean(selectedQuiz);

  const answeredCount = Object.keys(answers).length;
  const totalQuestionCount = selectedQuiz?.questions.length ?? 0;
  const progress = totalQuestionCount
    ? Math.round((answeredCount / totalQuestionCount) * 100)
    : 0;
  const result = useMemo(() => {
    if (!isQuizAvailable || !showResult || answeredCount !== totalQuestionCount) {
      return null;
    }

    return calculateResult(selectedQuiz, answers);
  }, [answers, answeredCount, isQuizAvailable, selectedQuiz, showResult, totalQuestionCount]);

  function handleSelect(questionId, value) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
  }

  function handleSubmit() {
    if (answeredCount !== totalQuestionCount) {
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

  function handlePersonChange(personId) {
    setSelectedPersonId(personId);
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
          <p className="eyebrow">나는 솔로 이상형 퀴즈</p>
          <h1>
            {selectedPerson.generation} {selectedPerson.name} 스타일 적합도 퀴즈
          </h1>
          <p className="hero-copy">
            나는 솔로 30기 방송 속 인물들의 캐릭터를 바탕으로 당신이 각자의 캐릭터와 얼마나 잘 맞는이 확인하는 이상형 테스트입니다.
          </p>

          <div className="hero-badges">
            {isQuizAvailable ? (
              selectedQuiz.badges.map((badge) => <span key={badge}>{badge}</span>)
            ) : (
              <>
                <span>페르소나 요약</span>
                <span>이미지 슬롯 분리</span>
                <span>퀴즈 준비 중</span>
              </>
            )}
          </div>

          <div className="notice-card">{isQuizAvailable ? selectedQuiz.note : selectedPerson.sourceNote}</div>
        </section>

        <section className="profile-grid">
          <article className="profile-card merged-profile-card">
            <div className="people-selector" aria-label="인물 선택">
              {characterOrder.map((personId) => {
                const person = characterProfiles[personId];
                const selected = personId === selectedPersonId;

                return (
                  <button
                    key={person.id}
                    type="button"
                    className={`person-chip ${selected ? "selected" : ""} ${person.quizAvailable ? "available" : "pending"}`}
                    onClick={() => handlePersonChange(person.id)}
                    aria-pressed={selected}
                  >
                    <span>{person.name}</span>
                    {!person.quizAvailable && <small>준비중</small>}
                  </button>
                );
              })}
            </div>

            <div className="merged-profile-content">
              <div className="merged-image-pane">
                <div className="section-head">
                  <h3>인물 이미지</h3>
                  <p>인물별 대표 이미지를 별도로 연결하는 자리입니다.</p>
                </div>

                {selectedPerson.image.src ? (
                  <img
                    className="character-image"
                    src={selectedPerson.image.src}
                    alt={selectedPerson.image.alt}
                  />
                ) : (
                  <div
                    className="image-placeholder"
                    aria-label={selectedPerson.image.alt}
                  >
                    <strong>{selectedPerson.image.placeholder}</strong>
                    <span>{selectedPerson.generation}</span>
                  </div>
                )}

                <p className="profile-copy">{selectedPerson.image.note}</p>
              </div>

              <div className="merged-persona-pane">
                <div className="section-head">
                  <div>
                    <h3>페르소나 요약</h3>
                    <p>{selectedPerson.subtitle}</p>
                  </div>
                </div>

                <div className="meta-chips">
                  {selectedPerson.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <ul className="persona-list">
                  {selectedPerson.persona.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="profile-copy">{selectedPerson.sourceNote}</p>
              </div>
            </div>
          </article>
        </section>

        {!isQuizAvailable ? (
          <ComingSoonView
            selectedPerson={selectedPerson}
            onSelectJungsook={() => handlePersonChange("jungsook")}
          />
        ) : showResult && result ? (
          <ResultView
            result={result}
            dimensions={selectedQuiz.dimensions}
            selectedPerson={selectedPerson}
            onReset={handleReset}
          />
        ) : (
          <>
            <section className="progress-card">
              <div className="progress-topline">
                <span>진행률</span>
                <strong>
                  {answeredCount}/{totalQuestionCount}
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
              {selectedQuiz.questions.map((question, index) => (
                <article className="question-card" key={question.id}>
                  <div className="question-head">
                    <p className="question-index">
                      Q{index + 1}. {selectedQuiz.dimensions[question.dimension].label}
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
                disabled={answeredCount !== totalQuestionCount}
              >
                결과 보기
              </button>
              <p className="submit-copy">
                {answeredCount === totalQuestionCount
                  ? "준비 완료. 결과를 확인해보세요."
                  : `${totalQuestionCount - answeredCount}개 문항이 남아 있습니다.`}
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function ComingSoonView({ selectedPerson, onSelectJungsook }) {
  return (
    <section className="result-stack">
      <article className="result-card">
        <div className="section-head">
          <h3>{selectedPerson.generation} {selectedPerson.name} 퀴즈는 준비 중입니다</h3>
          <p>선택 UI는 먼저 열어두었고, 실제 문항과 점수 로직은 순차적으로 추가할 예정입니다.</p>
        </div>

        <div className="guidance-grid">
          <div className="guidance-box">
            <p className="mini-label">지금 체험 가능</p>
            <span>30기 정숙 스타일 적합도 퀴즈</span>
          </div>
          <div className="guidance-box">
            <p className="mini-label">추가 예정</p>
            <span>영자, 옥순, 현숙, 영숙, 광수, 영수, 영철, 상철</span>
          </div>
        </div>

        <button type="button" className="primary-button" onClick={onSelectJungsook}>
          정숙 퀴즈 체험하기
        </button>
      </article>
    </section>
  );
}

function ResultView({ result, dimensions, selectedPerson, onReset }) {
  const rankedDimensions = Object.entries(result.dimensionScores).sort(
    (a, b) => b[1] - a[1]
  );
  const dimensionKeys = Object.keys(dimensions);
  const accentMap = Object.fromEntries(
    dimensionKeys.map((key, index) => [
      key,
      dimensionAccents[index % dimensionAccents.length]
    ])
  );

  return (
    <section className="result-stack">
      <article className="result-card spotlight">
        <p className="eyebrow">
          당신과 {selectedPerson.generation} {selectedPerson.name}와의 적합도
        </p>
        <div className="score-row">
          <div className="score-inline">
            <h2>{result.total}점</h2>
            <div className="score-tier">{result.tier}</div>
          </div>
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
                      style={{ background: accentMap[key] }}
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
                      background: accentMap[key]
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
        <div className="result-actions">
          <button type="button" className="secondary-button" onClick={onReset}>
            다시 풀기
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() => handleShare(selectedPerson, result)}
          >
            공유하기
          </button>
        </div>
      </article>
    </section>
  );
}

async function handleShare(selectedPerson, result) {
  const shareTitle = `나는 솔로 이상형 퀴즈 - ${selectedPerson.name} 결과`;
  const shareText = `나는 ${selectedPerson.generation} ${selectedPerson.name} 스타일과 ${result.total}점, ${result.tier} 결과가 나왔어요.`;
  const shareUrl = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl
      });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    window.alert("링크가 복사되었습니다.");
  } catch (error) {
    window.alert("공유를 완료하지 못했습니다.");
  }
}
