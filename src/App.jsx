import React from 'react'
import Question from './components/Question'
import { decode } from 'html-entities'

function App() {
  const [onQuiz, setOnQuiz] = React.useState(false)
  const [checkingAnswers, setCheckingAnswers] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    if (!checkingAnswers) {
      fetch(
        'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
      )
        .then(res => res.json())
        .then(data =>
          setQuestions(
            data.results.map(question => {
              const answers = [
                {
                  answer: decode(question.correct_answer),
                  correct: true
                },
                ...question.incorrect_answers.map(answer => ({
                  answer: decode(answer)
                }))
              ]

              return {
                question: decode(question.question),
                answers: shuffleArray(answers)
              }
            })
          )
        )
    }
  }, [checkingAnswers])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
    }
    return array
  }

  function changeSelected(questionIndex, answerIndex) {
    if (!checkingAnswers) {
      setQuestions(prevQuestions =>
        prevQuestions.map((question, index) =>
          questionIndex !== index
            ? question
            : {
                ...question,
                answers: question.answers.map((answer, index) => ({
                  ...answer,
                  isSelected: answerIndex === index
                }))
              }
        )
      )
    }
  }

  function handleCheck() {
    setCheckingAnswers(prev => {
      if (!prev) {
        //if user is not checking answers
        return true
      }
      // if user pressed play again
      setQuestions([])
      return false
    })
  }

  function countCorrect() {
    let count = 0
    questions.forEach(question => {
      question.answers.forEach(answer => {
        if (answer.isSelected && answer.correct) {
          count++
        }
      })
    })
    return count
  }

  console.log(questions)

  const questionElements = questions.map((question, questionIndex) => (
    <Question
      key={questionIndex}
      question={question.question}
      answers={question.answers}
      changeSelected={answerIndex => changeSelected(questionIndex, answerIndex)}
      checkingAnswers={checkingAnswers}
    />
  ))

  return (
    <main className="app--container">
      {!onQuiz ? (
        <div className="quiz--intro">
          <h1 className="intro--heading">Quizzical</h1>
          <button
            className="button intro--button"
            onClick={() => setOnQuiz(prev => !prev)}
          >
            Start the quiz
          </button>
        </div>
      ) : (
        <div>
          {questions.length === 5 ? (
            <div className="quiz--container">
              <div className="quiz--questions">{questionElements}</div>

              <div
                className={`quiz--footer ${
                  checkingAnswers ? 'quiz--footer-checking' : ''
                }`}
              >
                {checkingAnswers && (
                  <p>You got {countCorrect()}/5 correct answers</p>
                )}
                <button className="button quiz--submit" onClick={handleCheck}>
                  {checkingAnswers ? 'Play Again' : 'Check Answers'}
                </button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </main>
  )
}

export default App
