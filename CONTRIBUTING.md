# Contributing

Thanks for checking out the project! If you want to contribute, here's how.

## Quick Start

1. Fork the repo
2. Clone your fork: `git clone https://github.com/your-username/electronic_form.git`
3. Create a branch: `git checkout -b my-feature`
4. Make your changes
5. Test locally: `npm run dev`
6. Commit: `git commit -m "Add cool feature"`
7. Push: `git push origin my-feature`
8. Open a Pull Request

## What to Contribute

**Bug Fixes**  
Found something broken? Please fix it! Include:
- What was broken
- How you fixed it
- Steps to test

**New Features**  
Have an idea? Open an issue first so we can discuss it. Then:
- Keep it focused (one feature per PR)
- Add comments for complex logic
- Update docs if needed

**Documentation**  
Typos, clarifications, examples - all welcome.

**Tests**  
The test coverage could definitely be better. Sample tests are in `src/tests/`.

## Code Style

Just keep it clean and consistent with existing code:
- Use 2 spaces for indentation
- Meaningful variable names
- Comments for non-obvious stuff
- Keep functions small and focused

```javascript
// Good
const getUserOrders = async (userId) => {
  const user = await findUser(userId);
  return user.orders;
};

// Could be better
const x = async (id) => {
  let u = await findUser(id);
  return u.orders;
};
```

## Commit Messages

Keep them short and descriptive:

```bash
# Good
git commit -m "Fix login redirect bug"
git commit -m "Add email validation to forms"
git commit -m "Update API documentation"

# Too vague
git commit -m "Fix bug"
git commit -m "Update stuff"
```

If you need more detail, use the body:
```bash
git commit -m "Fix form validation"  -m "Date fields weren't handling ISO format correctly. Updated regex pattern to match YYYY-MM-DD."
```

## Pull Requests

Before submitting:
- [ ] Code works locally
- [ ] No console errors
- [ ] Existing tests still pass
- [ ] Added tests for new features (if applicable)
- [ ] Updated docs if needed

In your PR description:
- Explain what you changed and why
- Link to any related issues
- Include screenshots for UI changes

## Questions?

Not sure about something? Just ask! Open an issue or comment on an existing one. No dumb questions here.

## Development Notes

**Database**: Currently uses in-memory storage. If you're adding DB features, keep it compatible with both in-memory and real databases.

**Cloud Storage Service**: The cloud storage integration is simulated (`src/services/cloudStorageService.js`). If you're working on this, maintain the same interface so it's easy to swap in real API calls later.

**Frontend**: Vanilla JS by design (no frameworks). Keeps it simple and shows fundamentals.

---

That's it! Looking forward to your contributions.
