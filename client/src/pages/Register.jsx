if (!username.trim()) {
  setError("Username is required");
  return;
}

if (!email.includes("@")) {
  setError("Enter a valid email");
  return;
}

if (password.length < 6) {
  setError("Password must be at least 6 characters");
  return;
}

if (password !== confirmPassword) {
  setError("Passwords do not match");
  return;
}