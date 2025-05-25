class UserService {
  // Transform this:
  fetchUser() {
    const user = await fetch('/api/user');
    return user;
  }

  // Into this:
  async fetchUser() {
    const user = await fetch('/api/user');
    return user;
  }
}
