import Answer from './Answer'

export default function Question(props) {
  const answerElements = props.answers.map((answer, answerIndex) => (
    <Answer
      key={answerIndex}
      value={answer.answer}
      changeSelected={() => props.changeSelected(answerIndex)}
      isSelected={answer.isSelected}
      checkingAnswers={props.checkingAnswers}
    />
  ))
  return (
    <div className="question--element">
      <h3>{props.question}</h3>
      <div className="answers--container">{answerElements}</div>
    </div>
  )
}
