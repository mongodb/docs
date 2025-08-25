app.getEmailPassword().sendResetPasswordEmailAsync(email, it -> {
    if (it.isSuccess()) {
        Log.i("EXAMPLE", "Successfully sent the user a reset password link to " + email);
    } else {
        Log.e("EXAMPLE", "Failed to send the user a reset password link to " + email + ": " + it.getError().getErrorMessage());
    }
});
