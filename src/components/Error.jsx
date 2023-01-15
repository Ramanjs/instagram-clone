const ErrorMessage = (props) => {
  return (
    <div className="w-full my-2 py-2 text-red-600">
      {props.message}
    </div>
  )
}

export default ErrorMessage
