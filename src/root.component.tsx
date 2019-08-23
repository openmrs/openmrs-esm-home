import React from "react";

export default class Root extends React.Component {
  state = {
    catastrophicError: false
  };
  render() {
    return this.state.catastrophicError
      ? this.errorHasOccurred()
      : this.loadHomepage();
  }
  componentDidCatch() {
    this.setState({ catastrophicError: true });
  }
  errorHasOccurred = () => {
    // TO-DO have a good UX for catastrophic errors
    return null;
  };
  loadHomepage = () => {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  };
}
