'use client';
import React, { useEffect, useMemo, useState } from 'react';
import ReactPlayerYT from 'react-player/youtube';
import ReactPlayerWistia from 'react-player/wistia';
import styled from '@emotion/styled';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import { STRUCTURED_DATA_CLASSNAME } from '@/utils/structured-data/structured-data';
import { VideoObjectSd } from '@/utils/structured-data/video-object-sd';
import VideoPlayButton from './VideoPlayButton';

// Imported both players to keep bundle size low and rendering the one associated to the URL being passed in
const REACT_PLAYERS = {
  yt: {
    player: ReactPlayerYT,
    config: {
      youtube: {
        playerVars: {
          autohide: 1,
          modestbranding: 1,
          rel: 0,
        },
      },
    },
    name: 'youtube' as const,
  },
  wistia: {
    player: ReactPlayerWistia,
    config: {},
    name: 'wistia' as const,
  },
};

const ReactPlayerWrapper = styled('div')`
  position: relative;
  padding-top: 56.25%;
  margin: ${theme.size.medium} 0px;
  border-radius: 16px;
  overflow: hidden;
`;

const videoStyling = ({ name }: { name: string }) => css`
  position: absolute;
  top: 0;
  left: 0;

  > div {
    /* Redefines stacking context, allowing play button animation to stick on top */
    position: sticky;
  }

  ${name === 'wistia' &&
  `video {
    background: ${palette.white} !important;
  }`}
`;

const getSupportedMedia = (url: string) => {
  let supportedType: 'yt' | 'wistia' | null = null;

  if (url.includes('youtube') || url.includes('youtu.be')) {
    supportedType = 'yt';
  }

  if (url.includes('wistia')) {
    supportedType = 'wistia';
  }

  return supportedType ? REACT_PLAYERS[supportedType] : null;
};

export type VideoProps = {
  url: string;
};

export const Video = ({ url }: VideoProps) => {
  // use placeholder image for video thumbnail if invalid URL provided
  const [previewImage, setPreviewImage] = useState<string | boolean>('assets/meta_generic.png');
  // build JSON-LD structured data (VideoObject)
  const videoObjectSd = useMemo(() => {
    const sd = new VideoObjectSd({ embedUrl: url });
    return sd.isValid() ? sd.toString() : undefined;
  }, [url]);

  // handles URL validity checking for well-formed YT links
  const checkUrlValidity = async (url: string) => {
    if (url.includes('youtube') || url.includes('youtu.be')) {
      const testUrlValidity = `https://www.youtube.com/oembed?url=${url}&format=json`;
      const res = await fetch(testUrlValidity);
      if (res?.ok) {
        setPreviewImage(true);
      }
    }
  };

  useEffect(() => {
    void checkUrlValidity(url);
  }, [url]);

  const ReactSupportedMedia = getSupportedMedia(url);

  if (!ReactSupportedMedia) {
    console.warn(`Media Not Found: A video player could not be found for the following ${url}`);
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ReactPlayer = ReactSupportedMedia.player as any;
  const playable = ReactPlayer.canPlay?.(url);

  // handles remaining cases for invalid video URLs
  if (!playable) {
    console.warn(`Invalid URL: ${url} has been passed into the Video component`);
    return null;
  }

  return (
    <>
      {videoObjectSd && (
        <script
          className={STRUCTURED_DATA_CLASSNAME}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: videoObjectSd }}
        />
      )}
      <ReactPlayerWrapper>
        <ReactPlayer
          className={videoStyling(ReactSupportedMedia)}
          config={ReactSupportedMedia.config}
          controls
          url={url}
          width="100%"
          height="100%"
          playing
          playIcon={<VideoPlayButton />}
          light={previewImage}
        />
      </ReactPlayerWrapper>
    </>
  );
};
