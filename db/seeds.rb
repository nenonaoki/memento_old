# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Seed for users
User.create!(name:  "Example User",
             email: "example@railstutorial.org",
             password:              "foobar",
             password_confirmation: "foobar",
             activated: true,
             activated_at: Time.zone.now,
             admin: true)

100.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password,
               activated: true,
               activated_at: Time.zone.now)
end


# Seed for media
Medium.create!(title:  "Peguin Cafe",
               source: "d46lnimzyt",
               description: "text text text text text text")

Medium.create!(title:  "Henning Schmiedt",
               source: "oekwduqbgq",
               description: "text text text text text text")

Medium.create!(title:  "Lenny Delivers Video",
               source: "ijujquyu9f",
               description: "text text text text text text")

20.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  Medium.create!(title: Faker::Name.title,
                 source: "oekwduqbgq",
                 description: Faker::Lorem.sentence(10))
end


# TODO: Add slugify helper
# Seed for tags
Medium.all.each do |medium|
  rand(1..3).times do
    label = Faker::Lorem.sentence(1)
    slug = Faker::Internet.slug
    unless Tag.exists?(slug: slug)
      medium.tags.create!(slug: slug,
                          label: label,
                          description: Faker::Lorem.sentence(10))
    end
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