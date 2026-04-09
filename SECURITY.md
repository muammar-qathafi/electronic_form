# Security Notes

This is a portfolio project, so keep that in mind. Some things are intentionally simplified.

## Found a Security Issue?

Email me or open an issue. Don't post vulnerabilities publicly - give me a chance to fix it first.

## Things to Know

**This is a demo project**, so:

- Uses in-memory storage (obviously not for production)
- JWT in localStorage (works for demo, but vulnerable to XSS)  
- No rate limiting (add this for real deployment)
- File upload is simulated (real version needs validation + virus scanning)

## If You Fork This

For actual production use:

```bash
npm audit      # Check dependencies
```

Replace in-memory storage with PostgreSQL/MongoDB. Add proper environment variables. Use HTTPS.

The auth system (JWT + bcrypt) is production-ready though.

## Best Practices I Followed

- Passwords hashed with bcrypt
- JWT with expiration
- Input validation
- No credentials in code
- .env.example instead of .env

## Dependencies

Run 
pm audit occasionally. I'm using stable versions but security updates happen.

---

This is meant as a talking point for interviews, not a production-ready secure system. Use common sense if deploying it.
