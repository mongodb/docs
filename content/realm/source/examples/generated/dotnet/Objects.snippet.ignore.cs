// Rather than store an Image in Realm,
// store the path to the Image...
public string ThumbnailPath { get; set; }

// ...and the Image itself can be
// in-memory when the app is running:
[Ignored]
public Image? Thumbnail { get; set; }
