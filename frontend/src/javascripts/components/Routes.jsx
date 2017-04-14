// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './templates/shared/app';
import GuestOnly from './templates/shared/guestOnly';
import UserOnly from './templates/shared/userOnly';

// Templates
import Home from './templates/home';
import Login from './templates/login';
import Signup from './templates/signup';
import PasswordResetEmail from './templates/passwordReset/email';
import PasswordResetPassword from './templates/passwordReset/password';
import NewEmailPassword from './templates/newEmail/password';
import Setting from './templates/setting';
import SettingHome from './templates/setting/home';
import SettingDisplayName from './templates/setting/displayName';
import SettingDescription from './templates/setting/description';
import SettingEmail from './templates/setting/email';
import SettingPassword from './templates/setting/password';
import SettingAvatar from './templates/setting/avatar';
import SettingCover from './templates/setting/cover';
import Account from './templates/account';
import User from './templates/user';
import Search from './templates/search';
import Tag from './templates/tag';
import Medium from './templates/medium';

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="password_resets/new" component={PasswordResetEmail} />
    <Route path="password_resets/:token/edit" component={PasswordResetPassword} />
    <Route path="new_emails/:token/edit" component={NewEmailPassword} />
    <Route component={GuestOnly}>
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
    </Route>
    <Route component={UserOnly}>
      <Route path="users/:user_name" component={User} />
      <Route path="account" component={Account} />
      <Route path="setting" component={Setting}>
        <IndexRoute component={SettingHome} />
        <Route path="display_name" component={SettingDisplayName} />
        <Route path="description" component={SettingDescription} />
        <Route path="email" component={SettingEmail} />
        <Route path="password" component={SettingPassword} />
        <Route path="avatar" component={SettingAvatar} />
        <Route path="cover" component={SettingCover} />
      </Route>
    </Route>
    <Route path="search" component={Search} />
    <Route path="tags/:slug" component={Tag} />
    <Route path="media/:token" component={Medium} />
  </Route>
);

export default Routes;
