function Input(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <label>
            Todo &nbsp;
            <input type="text" required={true} value={props.input} onChange={props.handleChange}/>
          </label>
          <input type="submit" value="CREATE"/>
      </form>
    )
}

export default Input;