.. important:: Do Not Store Facebook Profile Picture URLs
   
   Facebook profile picture URLs include the user's access token to grant
   permission to the image. To ensure security, do not store a URL that includes
   a user's access token. Instead, access the URL directly from the user's
   metadata fields when you need to fetch the image.
