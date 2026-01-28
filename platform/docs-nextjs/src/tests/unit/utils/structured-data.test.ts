import { constructHowToSd } from '@/utils/structured-data/how-to-sd';
import type { StepNode } from '@/types/ast';
import stepsData from '@/tests/data/how-to-structured-data.json';
import { SoftwareSourceCodeSd } from '@/utils/structured-data/software-source-code-sd';
import { VideoObjectSd } from '@/utils/structured-data/video-object-sd';

describe('Structured Data', () => {
  describe('HowTo Structured Data', () => {
    it('converts steps into expected structured data format', () => {
      const howToSd = constructHowToSd({ steps: stepsData as StepNode[] });
      expect(howToSd).toMatchSnapshot();
    });
  });

  describe('SoftwareSourceCode', () => {
    it('returns valid structured data with programmingLanguage', () => {
      const code = 'print("hello world")';
      const lang = 'python';
      const softwareSourceCodeSd = new SoftwareSourceCodeSd({ code, lang });
      expect(softwareSourceCodeSd.isValid()).toBeTruthy();
      expect(softwareSourceCodeSd).toMatchSnapshot();
    });

    it('returns valid structured data without programmingLangauge', () => {
      const code = 'print("hello world")';
      const softwareSourceCodeSd = new SoftwareSourceCodeSd({ code });
      expect(softwareSourceCodeSd.isValid()).toBeTruthy();
      expect(softwareSourceCodeSd).toMatchSnapshot();
    });

    it('sanitizes and escapes unsafe HTML examples', () => {
      const code =
        '<!-- Load Google One Tap --> <script src="https://accounts.google.com/gsi/clien"></script> <!-- Log in with Realm and Google Authentication --> <script async defer> const app = new Realm.App({ id: "<your_realm_app_id>", }); // Callback used in `data-callback` to handle Google\'s response and log user into App Services function handleCredentialsResponse(response) { const credentials = Realm.Credentials.google({ idToken: response.credential }); app .logIn(credentials) .then((user) => alert(`Logged in with id: user.id`)); } </script>';
      const softwareSourceCodeSd = new SoftwareSourceCodeSd({ code });
      expect(softwareSourceCodeSd.isValid()).toBeTruthy();
      expect(softwareSourceCodeSd).toMatchSnapshot();
    });
  });

  describe('VideoObject', () => {
    const embedUrl = 'https://www.youtube.com/embed/XrJG994YxD8';
    const name = 'Mastering Indexing for Perfect Query Matching';
    const uploadDate = '2023-11-08T05:00:28-08:00';
    const thumbnailUrl = 'https://i.ytimg.com/vi/XrJG994YxD8/maxresdefault.jpg';
    const description = 'Learn more about indexes in Atlas Search';

    it('returns valid structured data with description', () => {
      const videoObjectSd = new VideoObjectSd({
        embedUrl,
        name,
        uploadDate,
        thumbnailUrl,
        description,
      });
      expect(videoObjectSd.isValid()).toBeTruthy();
      expect(videoObjectSd).toMatchSnapshot();
    });

    it('returns valid structured data without description', () => {
      const videoObjectSd = new VideoObjectSd({
        embedUrl,
        name,
        uploadDate,
        thumbnailUrl,
      });
      expect(videoObjectSd.isValid()).toBeTruthy();
      expect(videoObjectSd).toMatchSnapshot();
    });

    it('returns invalid structured data with missing name field', () => {
      const videoObjectSd = new VideoObjectSd({
        embedUrl,
        uploadDate,
        thumbnailUrl,
        description,
      });
      expect(videoObjectSd.isValid()).toBeFalsy();
    });
  });
});
