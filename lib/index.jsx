import * as React from "react";

const dynamicStyle = document.createElement("style");
dynamicStyle.type = "text/css";
let keyFrames = `
  @-webkit-keyframes dynamicMarqueeAnimation {
    100% {
      -webkit-transform: translateX(DYNAMIC_VALUE);
      transform: translateX(DYNAMIC_VALUE);
    }
  }
  @-moz-keyframes dynamicMarqueeAnimation {
    100% {
      -webkit-transform: translateX(DYNAMIC_VALUE);
      transform: translateX(DYNAMIC_VALUE);
    }
  }
  @keyframes dynamicMarqueeAnimation {
    100% {
      -webkit-transform: translateX(DYNAMIC_VALUE);
      transform: translateX(DYNAMIC_VALUE);
    }
  }
`;

class Marquee extends React.Component {
  constructor(props) {
    super(props);
    this.textElem = React.createRef();
    this.textWrapper = React.createRef();
    this.state = {
      marqueeOn: true
    };

    document.querySelector("head").append(dynamicStyle);
  }

  marqueeRun = () => {
    const { speed } = this.props;
    const textElemWidth = this.textElem.current.clientWidth;
    const width = textElemWidth + 40;
    dynamicStyle.innerHTML = keyFrames.replace(/DYNAMIC_VALUE/g, `-${width}px`);
    this.textWrapper.current.style.animation = `dynamicMarqueeAnimation ${(width *
      20) /
      speed}ms linear infinite`;

    this.textWrapper.current.addEventListener("mouseenter", function() {
      this.style.animationPlayState = "paused";
    });

    this.textWrapper.current.addEventListener("mouseleave", function() {
      this.style.animationPlayState = "running";
    });
  };

  componentDidMount() {
    this.marqueeRun();
  }

  render() {
    const { children } = this.props;
    return (
      <div style={{ overflow: "hidden" }}>
        <div
          className="text-wrapper"
          style={{ whiteSpace: "nowrap", willChange: "transform" }}
          ref={this.textWrapper}
        >
          <div
            className="text-elem"
            style={{
              minWidth: "100%",
              display: "inline-block",
              marginRight: 40,
              boxSizing: "border-box"
            }}
            ref={this.textElem}
          >
            {children}
          </div>
          <div
            className="text-elem"
            style={{
              minWidth: "100%",
              display: "inline-block",
              marginRight: 40,
              boxSizing: "border-box"
            }}
            ref={this.textElem}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Marquee;