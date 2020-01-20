import React from 'react';
import YouTube, {Options} from 'react-youtube';


interface Istate {
    videoID: string;
}

class YouTubeLocal extends React.Component<any, Istate> {

    _onReady(event: any) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
      
    render() {
        const opts: Options = {
            height: '206',
            width: '256',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
          };
        return (
            <YouTube
            videoId={this.props.videoID}
            opts={opts}
            onReady={this._onReady}
            />
        )
    }
}

export default YouTubeLocal;