import { StructuredData } from './structured-data';

export class VideoObjectSd extends StructuredData {
  embedUrl?: string;
  name?: string;
  uploadDate?: string;
  thumbnailUrl?: string;
  description?: string;

  constructor({
    embedUrl,
    name,
    uploadDate,
    thumbnailUrl,
    description,
  }: {
    embedUrl?: string;
    name?: string;
    uploadDate?: string;
    thumbnailUrl?: string;
    description?: string;
  }) {
    super('VideoObject');

    this.embedUrl = embedUrl;
    this.name = name;
    this.uploadDate = uploadDate;
    this.thumbnailUrl = thumbnailUrl;

    if (description) {
      this.description = description;
    }
  }

  isValid() {
    const hasAllReqFields = [this.embedUrl, this.name, this.uploadDate, this.thumbnailUrl].every((val) => !!val);
    return hasAllReqFields && super.isValid();
  }
}
