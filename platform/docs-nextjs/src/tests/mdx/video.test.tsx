import React from 'react';
import { render } from '@testing-library/react';
import { Video } from '@/mdx-components/Video/Video';

const REACT_PLAYER_PREVIEW_QUERY = 'div.react-player__preview';
const SD_SCRIPT_QUERY = 'script[type="application/ld+json"]';

// Mock react-player modules (mirrors existing unit video tests)
jest.mock('react-player/youtube', () => {
  const MockReactPlayer = function MockReactPlayer({
    light,
    className,
    style,
  }: {
    light?: string | boolean;
    className?: string;
    style?: React.CSSProperties;
  }) {
    if (light) {
      return (
        <div className={className} style={style}>
          <div className="react-player__preview">YouTube Player Preview</div>
        </div>
      );
    }
    return (
      <div className={className} style={style}>
        <div className="react-player">YouTube Player</div>
      </div>
    );
  };

  MockReactPlayer.canPlay = (url: string) => {
    // Only treat real video URLs as playable
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      return true;
    }
    // e.g. https://www.youtube.com/ (no video id) => false
    return false;
  };

  return MockReactPlayer;
});

jest.mock('react-player/wistia', () => {
  const MockReactPlayer = function MockReactPlayer({
    light,
    className,
    style,
  }: {
    light?: string | boolean;
    className?: string;
    style?: React.CSSProperties;
  }) {
    if (light) {
      return (
        <div className={className} style={style}>
          <div className="react-player__preview">Wistia Player Preview</div>
        </div>
      );
    }
    return (
      <div className={className} style={style}>
        <div className="react-player">Wistia Player</div>
      </div>
    );
  };

  MockReactPlayer.canPlay = (url: string) => {
    return url.includes('wistia');
  };

  return MockReactPlayer;
});

// Mock fetch for YouTube URL validation (oEmbed)
beforeEach(() => {
  global.fetch = jest.fn((url: string) => {
    if (typeof url === 'string' && url.includes('youtube.com/oembed')) {
      return Promise.resolve({
        ok: true,
        status: 200,
      } as Response);
    }
    return Promise.resolve({
      ok: false,
      status: 404,
    } as Response);
  }) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Video test', () => {
  it('renders a YouTube video from url prop', () => {
    const tree = render(<Video url="https://www.youtube.com/watch?v=ZvwUzcMvKiI" />);

    expect(tree.asFragment()).toMatchSnapshot();

    const preview = tree.container.querySelector(REACT_PLAYER_PREVIEW_QUERY);
    expect(preview).toBeInTheDocument();
  });

  it('renders a Wistia video from url prop', () => {
    const tree = render(<Video url="https://ti-mongodb.wistia.com/medias/lf215kzteo" />);

    expect(tree.asFragment()).toMatchSnapshot();

    const preview = tree.container.querySelector(REACT_PLAYER_PREVIEW_QUERY);
    expect(preview).toBeInTheDocument();
  });

  it('renders null and warns for unsupported providers', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Video url="https://vimeo.com/537141379" />);

    expect(container.firstChild).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });

  it('renders null and warns for invalid YouTube URLs', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Video url="https://www.youtube.com/" />);

    expect(container.firstChild).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid URL: https://www.youtube.com/'));

    consoleWarnSpy.mockRestore();
  });
});
