Follow the steps mentioned in the backend canister first:

- https://github.com/jintukumardas/evenity-management-canister/blob/main/README.md

Make sure canister id is exported as mentioned in the previous steps, dfx is installed and backend canister is running.

- Copy the declarations folder from evenity-management-canister/src/declarations to evenity/src
- Export CANISTER ID if not already : export CANISTER_ID_EVENTS=<CANISTER ID> [IMPORTANT]
- Run npm i --force (force is needed) [IMPORTANT]
- Run npm run frontend (App should be running in 3000 port) [Now use can use the app]

Thank you :)