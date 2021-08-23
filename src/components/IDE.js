import React from "react";
import { connect } from "react-redux";
import { fetchExercise } from "../store/exercise";
import { testSolution } from "../store/solution";
// import { updateExercise } from '../store/exercise.js';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import { Controlled } from "react-codemirror2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class IDE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.result = this.result.bind(this);
  }

  result() {
    toast(this.props.solution.message, {
      position: 'top-center',
      style: {
        color: this.props.solution.success ? 'green' : 'red'
      }
    });
  }

  handleChange(userInput) {
    this.setState({ input: userInput });
  }

  async handleSubmit() {
    await this.props.testSolution("6123caa2a0b84caf217f3dc3", this.state.input);
    this.result()
  }

  async componentDidMount() {
    await this.props.fetchExercise("6123caa2a0b84caf217f3dc3");
    this.setState({ input: this.props.exercise.exerciseBody });
  }

  render() {
    return (
      <div className="App">
        <>
          {this.props.exercise ? this.props.exercise.problemDescription : null}
        </>
        <div className="editor-container">
          {/* This is the IDE component from codemirror */}
          <Controlled
            // this is the onChange equivilent of the imported component
            // callback sets the input to the state as code
            onBeforeChange={(editor, data, value) => {
              this.handleChange(value);
            }}
            value={this.state.input}
            className="code-mirror-wrapper"
            options={{
              lineWrapping: true,
              lint: true,
              mode: "javascript",
              lineNumbers: true,
              theme: "material",
              autoCloseBrackets: true,
            }}
          />

          <div>
          <button type="submit" onClick={this.handleSubmit}>
            Run
          </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    exercise: state.exercise,
    solution: state.solution,
  };
};

const mapDispatch = (dispatch) => {
  return {
    testSolution: (id, solution) => dispatch(testSolution(id, solution)),
    fetchExercise: (id) => dispatch(fetchExercise(id)),
  };
};

export default connect(mapState, mapDispatch)(IDE);
