FROM ruby:2.3.0

# http://qiita.com/nacika_ins/items/cf8ceb20711bd077f770
# ARG environment=production

# Specify newer version (ver.7) of Node https://github.com/nodesource/distributions
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -

# see update.sh for why all "apt-get install"s have to stay as one long line
RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN npm install -g node-pre-gyp

# Install Yarn https://yarnpkg.com/en/docs/install#linux-tab
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

# see http://guides.rubyonrails.org/command_line.html#rails-dbconsole
RUN apt-get update && apt-get install -y mysql-client postgresql-client sqlite3 --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV RAILS_VERSION 4.2.6

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ADD Gemfile /usr/src/app/Gemfile
ADD Gemfile.lock /usr/src/app/Gemfile.lock
RUN bundle install
ADD . /usr/src/app
RUN bundle install

# RUN bundle exec rake db:create RAILS_ENV=production
# RUN bundle exec rake db:migrate:reset RAILS_ENV=production
# RUN bundle exec rake db:seed RAILS_ENV=production
RUN bundle exec rake assets:precompile RAILS_ENV=production # Memory is issue
ENV SECRET_KEY_BASE $(rake secret)
ENV RAILS_SERVE_STATIC_FILES true
EXPOSE 3000
CMD bundle exec rails s -p 3000 -b '0.0.0.0' -e production;
