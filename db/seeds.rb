# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Seed for titles
title_manager = Title.create!(name: "manager")
title_editor = Title.create!(name: "editor")
title_reader = Title.create!(name: "reader")


# Seed for groups
group_admin = Group.create!(name: "admin")


# Seed for users
user_admin = User.create!(name:  "Admin User",
             email: "example@railstutorial.org",
             password:              "foobar",
             password_confirmation: "foobar",
             activated: true,
             activated_at: Time.zone.now,
             admin: true)

user_admin.roles.create!(group_id: group_admin.id,
                         title_id: title_manager.id)

20.times do |n|
  password = "password"
  User.create!(name:  Faker::Name.name,
               email: "example-#{n+1}@railstutorial.org",
               password:              password,
               password_confirmation: password,
               activated: true,
               activated_at: Time.zone.now)
end


# Seed for media
Medium.create!(title:  "Peguin Cafe",
               source: "d46lnimzyt",
               description: "text text text text text text")

20.times do |n|
  Medium.create!(title: Faker::Name.title,
                 source: "oekwduqbgq",
                 description: Faker::Lorem.sentence(10))
end


# TODO: Add slugify helper
# Seed for tags
Tag.create!(slug: "fujirock",
            label: "Fujirock",
            description: Faker::Lorem.sentence(10))

20.times do |n|
  Tag.create!(slug: Faker::Internet.slug,
              label: Faker::Name.title,
              description: Faker::Lorem.sentence(10))  
end


# Seed for tagging
Medium.all.each do |medium|
  medium.tag(Tag.offset(rand(Tag.count)).take)
end


# Seed for tickets
Medium.all.each_with_index do |medium, index|
  user = User.first

  case index % 3
  when 0
    medium.tickets.create!
  when 1
    medium.tickets.create!(user: user,
                         checked_in: true,
                         checked_in_at: 1.hours.ago)
  when 2
    medium.tickets.create!(user: user,
                         checked_in: true,
                         checked_in_at: 1.hours.ago,
                         activated: true,
                         activated_at: Time.zone.now)
  end
end


# Seed for comments
media = Medium.order(:created_at).take(6)
users = User.all.take(10)
users.each do |user|
  media.each { |medium|
    medium.comments.create!(body: Faker::Lorem.sentence(4),
                            user: user)
  }
end