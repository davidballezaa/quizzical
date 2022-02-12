export default function Answer(props) {
  return (
    <span onClick={props.changeSelected} className="answer--element">
      {props.value}
    </span>
  )
}
