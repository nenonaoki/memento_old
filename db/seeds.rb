# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Administrators
Administrator.create!(name:                  "admin",
                      email:                 "admin@memento.com",
                      password:              "foobar",
                      password_confirmation: "foobar")

# Users
User.create!(name:                  "testuser",
             display_name:          "testuser",
             email:                 "example@railstutorial.org",
             password:              "foobar",
             password_confirmation: "foobar",
             activated: true,
             activated_at: Time.zone.now,
             avatar:                "12e342f1bb22f7b9fa6b91259af151ea.png",
             cover:                 "64f987e01be7ded02478e4b12336d239.png")

49.times do |n|
  # name  = FFaker::Name.name
  name = FFaker::InternetSE.user_name_variant_short + "#{n+1}"
  while name.size > 15 do
    name = FFaker::InternetSE.user_name_variant_short + "#{n+1}"
  end
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  User.create!(name:                  name,
               display_name:          name,
               email:                 email,
               password:              password,
               password_confirmation: password,
               activated:             true,
               activated_at:          Time.zone.now)
end

# Media
18.times do |n|
  title = FFaker::Movie.title
  description = FFaker::Lorem.paragraphs
  Medium.create(title: title,
                description: description)
end

# Tags
20.times do |n|
  label = FFaker::Lorem.word
  slug = FFaker::InternetSE.slug(label, '_')
  description = FFaker::Lorem.paragraphs
  tag = Tag.create(label: label, slug: slug,
                description: description)

  count = (n >= Medium.count ? n % Medium.count : n) + 1
  Medium.find(count).tags << tag
end

# Tickets
users = User.order(:created_at).take(10)
users.each { |user|
  Medium.offset(rand(Medium.count)).each { |medium|
    ticket = medium.tickets.create
    ticket.check_in(user)
  }
}

# Comments
users = User.order(:created_at).take(6)
50.times do |n|
  content = FFaker::Lorem.sentence
  count = (n >= Medium.count ? n % Medium.count : n) + 1
  users.each { |user|
    user.comments.create!(content: content, medium_id: Medium.find(count).id)
  }
end
