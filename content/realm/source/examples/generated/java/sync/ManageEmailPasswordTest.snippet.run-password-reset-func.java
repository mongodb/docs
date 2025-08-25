String newPassword = "newFakePassword";
String[] args = {"security answer 1", "security answer 2"};

app.getEmailPassword().callResetPasswordFunctionAsync(email, newPassword, args, it -> {
    if (it.isSuccess()) {
        Log.i("EXAMPLE", "Successfully reset the password for" + email);
    } else {
        Log.e("EXAMPLE", "Failed to reset the password for" + email + ": " + it.getError().getErrorMessage());
    }
});
