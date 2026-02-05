export default () => ({
  port: parseInt(process.env.BACKEND_PORT || '') || 3000,
  better_auth: {
    secret: process.env.BETTER_AUTH_SECRET,
    url: process.env.BETTER_AUTH_URL,
  },
});
