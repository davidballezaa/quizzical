export default function Answer(props) {
  let styles = {}
  if (props.isSelected) {
    styles = { border: 'none', background: '#D6DBF5' }
  }

  if (props.checkingAnswers) {
    if (props.isSelected) {
      if (!props.correct) {
        styles = { border: 'none', background: '#F8BCBC', opacity: '0.5' }
      }
    }
    if (props.correct) {
      styles = { border: 'none', background: '#94D7A2' }
    }
  }
  return (
    <span
      onClick={props.changeSelected}
      className="answer--element"
      style={styles}
    >
      {props.value}
    </span>
  )
}
