const params = new URLSearchParams(window.location.search);
const token = params.get("token");
const tokenId = params.get("tokenId");
if (!token || !tokenId) {
  throw new Error(
    "You can only call resetPassword() if the user followed a confirmation email link"
  );
}
