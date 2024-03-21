import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import alertsSlice from './alerts/alertsSlice';
import corporate_sponsorsSlice from './corporate_sponsors/corporate_sponsorsSlice';
import educational_contentsSlice from './educational_contents/educational_contentsSlice';
import regionsSlice from './regions/regionsSlice';
import restoration_projectsSlice from './restoration_projects/restoration_projectsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import organizationsSlice from './organizations/organizationsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    alerts: alertsSlice,
    corporate_sponsors: corporate_sponsorsSlice,
    educational_contents: educational_contentsSlice,
    regions: regionsSlice,
    restoration_projects: restoration_projectsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    organizations: organizationsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
