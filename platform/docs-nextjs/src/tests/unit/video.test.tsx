import { render } from '@testing-library/react';
import Video from '@/components/video';
import type { VideoNode } from '@/types/ast';

// data for this component
import mockData from '@/tests/data/video.test.json';

// Mock react-player modules
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
    // Only return true for valid YouTube URLs (must have watch or youtu.be with video ID)
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      return true;
    }
    // Invalid YouTube URLs like https://www.youtube.com/ should return false
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

const REACT_PLAYER_QUERY = 'div.react-player__preview';
const SD_SCRIPT_QUERY = 'script[type="application/ld+json"]';

// Mock fetch for YouTube URL validation
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

it('YouTube video renders correctly', () => {
  const nodeData = mockData.validYouTubeURL as VideoNode;
  const tree = render(<Video argument={nodeData.argument} options={nodeData.options} />);
  expect(tree.asFragment()).toMatchSnapshot();
});

it('Vimeo video renders null', () => {
  const nodeData = mockData.validVimeoURL as VideoNode;
  const tree = render(<Video argument={nodeData.argument} options={nodeData.options} />);
  expect(tree.asFragment()).toMatchSnapshot();
});

it('Wistia video renders correctly', () => {
  const nodeData = mockData.validWistiaURL as VideoNode;
  const tree = render(<Video argument={nodeData.argument} options={nodeData.options} />);
  expect(tree.asFragment()).toMatchSnapshot();
});

it('DailyMotion video renders null', () => {
  const nodeData = mockData.validDailyMotionURL as VideoNode;
  const tree = render(<Video argument={nodeData.argument} options={nodeData.options} />);
  expect(tree.asFragment()).toMatchSnapshot();
});

describe('Console warning messages', () => {
  const consoleOutput: string[] = [];

  const mockedWarn = (output: string) => consoleOutput.push(output);
  beforeEach(() => {
    console.warn = mockedWarn;
  });

  it('has to show in console warning messages', () => {
    const nodeData1 = mockData.invalidVideoURL1 as VideoNode;
    const nodeData2 = mockData.invalidVideoURL2 as VideoNode;
    render(<Video argument={nodeData1.argument} options={nodeData1.options} />);
    render(<Video argument={nodeData2.argument} options={nodeData2.options} />);
    expect(consoleOutput).toEqual([
      'Media Not Found: A video player could not be found for the following https://docs.mongodb.com/realm/',
      'Invalid URL: https://www.youtube.com/ has been passed into the Video component',
    ]);
  });
});

describe('Structured data', () => {
  it('is defined when all fields required by Google are present', () => {
    const nodeData = mockData.validYouTubeURL as VideoNode;
    const mockOptions = {
      title: 'Test Video',
      'upload-date': '2023-11-08T05:00:28-08:00',
      'thumbnail-url': 'https://i.ytimg.com/vi/o2ss2LJNZVE/maxresdefault.jpg',
      description: '',
    };

    const { container } = render(<Video argument={nodeData.argument} options={mockOptions} />);
    const videoPlayer = container.querySelector(REACT_PLAYER_QUERY);
    const sdScript = container.querySelector(SD_SCRIPT_QUERY);

    expect(videoPlayer).toBeInTheDocument();
    expect(sdScript).toBeInTheDocument();
    expect(sdScript?.textContent).toEqual(
      '{"@context":"https://schema.org","@type":"VideoObject","embedUrl":"https://www.youtube.com/watch?v=YBOiX8DwinE&ab_channel=MongoDB","name":"Test Video","uploadDate":"2023-11-08T05:00:28-08:00","thumbnailUrl":"https://i.ytimg.com/vi/o2ss2LJNZVE/maxresdefault.jpg"}',
    );
  });

  it('is defined with optional fields', () => {
    const nodeData = mockData.validYouTubeURL as VideoNode;
    const mockOptions = {
      title: 'Test Video',
      'upload-date': '2023-11-08T05:00:28-08:00',
      'thumbnail-url': 'https://i.ytimg.com/vi/o2ss2LJNZVE/maxresdefault.jpg',
      description: 'Optional description field',
    };

    const { container } = render(<Video argument={nodeData.argument} options={mockOptions} />);
    const videoPlayer = container.querySelector(REACT_PLAYER_QUERY);
    const sdScript = container.querySelector(SD_SCRIPT_QUERY);

    expect(videoPlayer).toBeInTheDocument();
    expect(sdScript).toBeInTheDocument();
    expect(sdScript?.textContent).toEqual(
      '{"@context":"https://schema.org","@type":"VideoObject","embedUrl":"https://www.youtube.com/watch?v=YBOiX8DwinE&ab_channel=MongoDB","name":"Test Video","uploadDate":"2023-11-08T05:00:28-08:00","thumbnailUrl":"https://i.ytimg.com/vi/o2ss2LJNZVE/maxresdefault.jpg","description":"Optional description field"}',
    );
  });

  it('is not defined when missing one or more field(s) required by Google', () => {
    const nodeData = mockData.validYouTubeURL as unknown as VideoNode;
    const { container } = render(<Video argument={nodeData.argument} options={nodeData.options} />);
    const videoPlayer = container.querySelector(REACT_PLAYER_QUERY);
    const sdScript = container.querySelector(SD_SCRIPT_QUERY);
    expect(videoPlayer).toBeInTheDocument();
    expect(sdScript).not.toBeInTheDocument();
  });
});
