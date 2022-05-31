module.exports = ({ env }) => ({
    "vercel-deploy": {
      enabled: true,
      config: {
        deployHook:
          "https://api.vercel.com/v1/integrations/deploy/prj_5bmLOg423GsJWuL45feIrJC2m0zQ/cWyEa91mie",
        apiToken: "TXRukNTl7niPQdGe0PKCL0uG",
        appFilter: "team-hotel-trivia-go-cms",
      },
    },
  });