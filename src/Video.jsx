// https://cloudinary.zendesk.com/agent/tickets/101702
import React, { Component } from "react";
import PropTypes from "prop-types";


class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoPlayer: null,
      loaded: false,
      playing: false,
      duration: ""
    };

    this.setVideoRef = (element) => {
      this.videoElement = element;
    };
  }

  componentDidMount() {
    this.handleVideoPlayerInitialization();
  }

  handleVideoPlayerInitialization() {
    // debugger;
    console.log("handleinit")
    const cld = window.cloudinary.Cloudinary.new({
      cloud_name: "picturecloud7",
      secure: true
    });

      if (!window.document.body.contains(this.videoElement)) {
        return;
      }
      const cldVideo = cld.videoPlayer(this.videoElement.id, {
        autoplay: false,
        muted: true,
        controls: true,
        transformation: [
          { width: 500, crop: "scale" ,gravity:"face"},
        ]
      });

      cldVideo.source(this.props.publicId)
  }

  handlePlay() {
    this.setState({ playing: true });

    if (this.props.onHandleVideoPlay) {
      this.props.onHandleVideoPlay();
    }
  }

  handleMetadataLoad() {
    const secInMin = 60;
    const doubleDigitNumber = 10;
    const minutes = parseInt(this.state.videoPlayer.duration() / secInMin, 10);
    const sec = parseInt(this.state.videoPlayer.duration() % secInMin,10);
    const preparedSecs = sec >= doubleDigitNumber ? sec : `0${sec}`;
    this.setState({
      duration: `${minutes}:${preparedSecs}`
    });
  }

  render() {
    const { publicId } = this.props;
    debugger;
    console.log("public id",publicId)

    const videoObj = (
      <div>
        <video
          ref={this.setVideoRef}
          id="react-video-player"
          preload="metadata"
          controls
          data-type="video"
          className="cld-video-player cld-video-player-skin-dark"
        />
      </div>
    );

    return (
      <div>
        {videoObj}
    </div>
    );
  }
}

Video.propTypes = {
  src: PropTypes.string.isRequired,
  publicId: PropTypes.string.isRequired,
  isRightRail: PropTypes.bool,
  onHandleVideoPlay: PropTypes.func,
  enableLazyLoad: PropTypes.bool
};

Video.defaultProps = {
  src: "",
  publicId: "",
  enableLazyLoad: true
};

export default Video;